import React from "react"
import { useNavigate } from "react-router-dom"

export default function ProfilePage() {
  const navigate = useNavigate()

  // This would typically come from your app's state management (e.g., Redux)
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "I am a software developer with a passion for React and web technologies.",
    profilePicture: "/placeholder.svg?height=128&width=128",
  }

  const handleEditClick = () => {
    navigate("/profile/edit")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Profile</h2>
          <button
            onClick={handleEditClick}
            className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Edit Profile
          </button>
        </div>
        <div className="flex flex-col items-center mb-6">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h3 className="text-xl font-semibold">{user.name}</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-sm text-gray-900">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <p className="mt-1 text-sm text-gray-900">{user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
