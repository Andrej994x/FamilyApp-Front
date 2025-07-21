"use client";
import { useState, useMemo } from "react";
import {
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  FileText,
  ShoppingCart,
  CheckSquare,
  Lock,
  Users,
} from "lucide-react";
import EditItemModal from "../components/lists/EditItemModal";
import DeleteItemConfirmationModal from "../components/lists/DeleteItemConfirmationModal";
import DeleteListConfirmationModal from "../components/lists/DeleteListConfirmationModal";
import ListOptionsMenu from "../components/lists/ListOptionsMenu";
import EditListModal from "../components/lists/EditListModal";
import CreateListModal from "../components/lists/CreateListModal";
import TaskDetailsModal from "../components/lists/TaskDetailsModal";

const Lists = () => {
  const [lists, setLists] = useState([
    {
      id: "list-1",
      name: "test 2",
      type: "private",
      icon: "document",
      completed: true,
      isSelected: false,
      items: [],
    },
    {
      id: "list-2",
      name: "odmor 2025",
      type: "shared",
      icon: "document",
      completed: true,
      isSelected: false,
      items: [],
    },
    {
      id: "list-3",
      name: "To Do",
      type: "shared",
      icon: "checklist",
      completed: true,
      isSelected: true,
      isDefault: true,
      items: [
        {
          id: "item-1",
          text: "test 6",
          note: "This is a test note.",
          description: "A longer description for test 6.",
          category: "Uncategorized",
          dueDate: "07/25/2025 10:00",
          repeat: "Never",
          reminder: "None",
          assignees: ["An", "Te"],
          relatedList: "To Do",
          completed: false,
        },
        {
          id: "item-2",
          text: "test 5",
          note: "",
          description: "",
          category: "Uncategorized",
          dueDate: "",
          repeat: "",
          reminder: "None",
          assignees: [],
          relatedList: "To Do",
          completed: true,
        },
        {
          id: "item-3",
          text: "test",
          note: "",
          description: "",
          category: "Uncategorized",
          dueDate: "",
          repeat: "",
          reminder: "None",
          assignees: [],
          relatedList: "To Do",
          completed: false,
        },
      ],
    },
    {
      id: "list-4",
      name: "Shopping",
      type: "shared",
      icon: "shopping",
      completed: true,
      isSelected: false,
      isDefault: true,
      items: [],
    },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModal] = useState(false);
  const [isDeleteListConfirmModalOpen, setIsDeleteListConfirmModalOpen] =
    useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);
  const [listToDelete, setListToDelete] = useState(null);
  const [isListOptionsMenuOpen, setIsListOptionsMenuOpen] = useState(false);
  const [isEditListModalOpen, setIsEditListModalOpen] = useState(false);
  const [listToEdit, setListToEdit] = useState(null);
  const [selectedSortOption, setSelectedSortOption] = useState("By Default");
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [isTaskDetailsModalOpen, setIsTaskDetailsModalOpen] = useState(false);
  const [selectedTaskItem, setSelectedTaskItem] = useState(null);

  const selectedList = useMemo(
    () => lists.find((list) => list.isSelected),
    [lists]
  );

  const getIconComponent = (iconType) => {
    switch (iconType) {
      case "document":
        return <FileText size={20} className="text-blue-600" />;
      case "checklist":
        return <CheckSquare size={20} className="text-green-600" />;
      case "shopping":
        return <ShoppingCart size={20} className="text-blue-600" />;
      default:
        return <FileText size={20} className="text-blue-600" />;
    }
  };

  const handleListSelect = (id) => {
    setLists((prevLists) =>
      prevLists.map((list) => ({
        ...list,
        isSelected: list.id === id,
      }))
    );
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItemText.trim() && selectedList) {
      const newItem = {
        id: `item-${Date.now()}`,
        text: newItemText.trim(),
        note: "",
        description: "",
        category: "Uncategorized",
        dueDate: "",
        repeat: "Never",
        reminder: "None",
        assignees: [],
        relatedList: selectedList.name,
        completed: false,
      };

      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === selectedList.id
            ? {
                ...list,
                items: [...list.items, newItem],
              }
            : list
        )
      );
      setNewItemText("");
    }
  };

  const handleToggleItemComplete = (itemId) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === selectedList.id
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            }
          : list
      )
    );

    // Update the selected task item if it's the same one
    if (selectedTaskItem && selectedTaskItem.id === itemId) {
      setSelectedTaskItem((prev) => ({ ...prev, completed: !prev.completed }));
    }
  };

  const handleEditItem = (item) => {
    setItemToEdit(item);
    setIsEditModalOpen(true);
  };

  const handleDeleteItem = (itemId) => {
    setItemToDeleteId(itemId);
    setIsDeleteConfirmModal(true);
  };

  const handleSaveEditedItem = (updatedItem) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === selectedList.id
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
              ),
            }
          : list
      )
    );
    setIsEditModalOpen(false);
    setItemToEdit(null);
  };

  const handleConfirmDeleteItem = () => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === selectedList.id
          ? {
              ...list,
              items: list.items.filter((item) => item.id !== itemToDeleteId),
            }
          : list
      )
    );
    setIsDeleteConfirmModal(false);
    setItemToDeleteId(null);
  };

  const handleCloseDeleteConfirmModal = () => {
    setIsDeleteConfirmModal(false);
    setItemToDeleteId(null);
  };

  const handleEditList = (list) => {
    setListToEdit(list);
    setIsEditListModalOpen(true);
  };

  const handleSaveEditedList = (updatedList) => {
    setLists((prevLists) =>
      prevLists.map((list) => (list.id === updatedList.id ? updatedList : list))
    );
    setIsEditListModalOpen(false);
    setListToEdit(null);
  };

  const handleSortOptionSelect = (option) => {
    setSelectedSortOption(option);
    console.log("Sorting list by:", option);
  };

  const handleDeleteList = (listToDelete) => {
    if (listToDelete.isDefault) {
      return;
    }
    setListToDelete(listToDelete);
    setIsDeleteListConfirmModalOpen(true);
  };

  const handleConfirmDeleteList = () => {
    if (listToDelete) {
      const isCurrentlySelected = listToDelete.isSelected;

      setLists((prevLists) => {
        const filteredLists = prevLists.filter(
          (list) => list.id !== listToDelete.id
        );

        if (isCurrentlySelected && filteredLists.length > 0) {
          return filteredLists.map((list, index) => ({
            ...list,
            isSelected: index === 0,
          }));
        }

        return filteredLists;
      });
    }

    setIsDeleteListConfirmModalOpen(false);
    setListToDelete(null);
  };

  const handleCloseDeleteListConfirmModal = () => {
    setIsDeleteListConfirmModalOpen(false);
    setListToDelete(null);
  };

  const handleCreateNewList = (newListData) => {
    const newId = `list-${lists.length + 1}`;
    const newIcon =
      newListData.type === "Shopping"
        ? "shopping"
        : newListData.type === "To Do"
        ? "checklist"
        : "document";
    const newType = newListData.sharedWith === "Only me" ? "private" : "shared";

    setLists((prevLists) => [
      ...prevLists,
      {
        id: newId,
        name: newListData.name,
        type: newType,
        icon: newIcon,
        completed: false,
        isSelected: false,
        items: [],
        color: newListData.color,
      },
    ]);
    setIsCreateListModalOpen(false);
  };

  const handleItemClick = (item) => {
    setSelectedTaskItem(item);
    setIsTaskDetailsModalOpen(true);
  };

  return (
    <div className="flex h-full bg-white">
      {/* Left Sidebar - Adjusted width */}
      <div className="w-[420px] bg-white border-r border-gray-300">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold text-gray-900">Lists</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <p className="text-sm text-gray-500">{lists.length} Lists</p>
        </div>
        <div className="p-4">
          <div className="space-y-2">
            {lists.map((list) => (
              <div
                key={list.id}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer border-2 h-[70px] ${
                  list.isSelected
                    ? "bg-blue-50 border-blue-300"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handleListSelect(list.id)}
              >
                <div className="flex items-center flex-1 min-w-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    {getIconComponent(list.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate text-base leading-tight">
                      {list.name}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      {list.type === "private" ? (
                        <div className="flex items-center truncate">
                          <Lock size={10} className="mr-1 flex-shrink-0" />
                          <span className="truncate">private</span>
                        </div>
                      ) : (
                        <div className="flex items-center min-w-0">
                          <Users size={10} className="mr-1 flex-shrink-0" />
                          <span className="truncate">
                            {list.isDefault ? "Default List" : "Shared"} 👥
                            Shared with all mem...
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {list.completed && (
                  <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Floating Button for Create New List */}
        <button
          onClick={() => setIsCreateListModalOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 flex items-center justify-center z-10 cursor-pointer"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Main Content - Made narrower */}
      <div
        className={`flex-1 flex flex-col ${
          isListOptionsMenuOpen ? "overflow-hidden" : ""
        }`}
      >
        {/* Header */}
        <div className="bg-blue-500 text-white p-4 flex items-center justify-between relative">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center mr-3">
              {selectedList && getIconComponent(selectedList.icon)}
            </div>
            <h3 className="text-lg font-medium">{selectedList?.name}</h3>
            {selectedList?.icon === "checklist" && (
              <CheckSquare size={20} className="ml-2 text-green-300" />
            )}
          </div>
          <button
            onClick={() => {
              setIsListOptionsMenuOpen(true);
            }}
            className="text-white hover:text-blue-200"
          >
            <MoreHorizontal size={20} />
          </button>

          {/* List Options Menu */}
          {selectedList && (
            <ListOptionsMenu
              isOpen={isListOptionsMenuOpen}
              onClose={() => setIsListOptionsMenuOpen(false)}
              onEditList={() => handleEditList(selectedList)}
              onSortOptionSelect={handleSortOptionSelect}
              selectedSortOption={selectedSortOption}
              selectedList={selectedList}
              onDeleteList={handleDeleteList}
            />
          )}
        </div>

        {/* Input Field for Adding Items - Styled like items below */}
        <div className="p-4">
          <form onSubmit={handleAddItem}>
            <div className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="I want to..."
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  className="w-full bg-transparent text-gray-700 focus:outline-none pl-8"
                />
                <Plus
                  size={16}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          </form>
        </div>

        {/* List Items */}
        <div className="flex-1 overflow-y-auto p-4 pt-0">
          {selectedList?.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-24 h-24 bg-orange-100 rounded-lg mx-auto mb-6 flex items-center justify-center">
                  <div className="w-12 h-12 bg-orange-200 rounded flex items-center justify-center">
                    <span className="text-2xl">🔍</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  It's a blank page
                </h3>
                <p className="text-gray-500">
                  Tap on field above to start listing anything that comes to
                  mind
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {selectedList?.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex items-center flex-1">
                    <div
                      className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleItemComplete(item.id);
                      }}
                    >
                      {item.completed && (
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      )}
                    </div>
                    <span
                      className={`font-medium ${
                        item.completed
                          ? "line-through text-gray-500"
                          : "text-gray-900"
                      }`}
                    >
                      {item.text}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditItem(item);
                      }}
                      className="p-1 rounded-full hover:bg-gray-200 text-gray-600 cursor-pointer"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteItem(item.id);
                      }}
                      className="p-1 rounded-full hover:bg-red-100 text-gray-600 hover:text-red-600 cursor-pointer"
                      style={{ color: "#fd7777" }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit List Modal */}
      {listToEdit && (
        <EditListModal
          isOpen={isEditListModalOpen}
          onClose={() => setIsEditListModalOpen(false)}
          list={listToEdit}
          onSave={handleSaveEditedList}
        />
      )}

      {/* Edit Item Modal */}
      {itemToEdit && (
        <EditItemModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          item={itemToEdit}
          onSave={handleSaveEditedItem}
          onDeleteTrigger={handleDeleteItem}
          allLists={lists.map((list) => ({ name: list.name, icon: list.icon }))}
        />
      )}

      {/* Delete Item Confirmation Modal */}
      <DeleteItemConfirmationModal
        isOpen={isDeleteConfirmModalOpen}
        onClose={handleCloseDeleteConfirmModal}
        onConfirm={handleConfirmDeleteItem}
      />

      {/* Delete List Confirmation Modal */}
      <DeleteListConfirmationModal
        isOpen={isDeleteListConfirmModalOpen}
        onClose={handleCloseDeleteListConfirmModal}
        onConfirm={handleConfirmDeleteList}
        listName={listToDelete?.name}
      />

      {/* Combined Create List Modal */}
      <CreateListModal
        isOpen={isCreateListModalOpen}
        onClose={() => setIsCreateListModalOpen(false)}
        onSave={handleCreateNewList}
      />

      {/* Task Details Modal */}
     <TaskDetailsModal
  isOpen={isTaskDetailsModalOpen}
  onClose={() => setIsTaskDetailsModalOpen(false)}
  item={selectedTaskItem}
  onToggleComplete={handleToggleItemComplete}
  selectedList={selectedList}
  onEdit={handleEditItem}             // отвора EditItemModal
  onDelete={handleDeleteItem}         // отвора DeleteItemConfirmationModal
/>

    </div>
  );
};

export default Lists;
