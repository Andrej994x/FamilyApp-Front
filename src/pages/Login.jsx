"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Heart, MessageCircle } from "lucide-react"

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("you@example.com")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin()
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex">
      {/* Login Form - Left Side */}
      <div className="w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded mr-2 flex items-center justify-center">
                <span className="text-white font-bold text-sm">FW</span>
              </div>
              <span className="text-xl font-semibold">FamilyWall</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">Good afternoon 👋</h1>
            <p className="text-xl text-gray-700">Happy to see you again</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="keepSignedIn"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="keepSignedIn" className="ml-2 block text-sm text-gray-700">
                Keep me signed-in
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              Log in
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <a href="#" className="text-blue-500 hover:underline font-medium">
              Sign up
            </a>
          </div>
        </div>
      </div>

      {/* Background Image - Right Side */}
      <div
        className="w-1/2 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url(/placeholder.svg?height=800&width=600)" }}
      >
        {/* Notification Popup Overlay */}
        <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm border border-gray-300">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-full mr-2 flex items-center justify-center">
                <span className="text-white text-xs font-bold">M</span>
              </div>
              <span className="font-medium text-sm">Mom shared 3 photos</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <img src="/placeholder.svg?height=60&width=60" alt="Photo 1" className="aspect-square rounded" />
              <img src="/placeholder.svg?height=60&width=60" alt="Photo 2" className="aspect-square rounded" />
              <img src="/placeholder.svg?height=60&width=60" alt="Photo 3" className="aspect-square rounded" />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <Heart size={16} className="mr-1 text-red-500" />
                <span>❤️</span>
              </div>
              <div className="flex items-center">
                <MessageCircle size={16} className="mr-1" />
                <span>4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
