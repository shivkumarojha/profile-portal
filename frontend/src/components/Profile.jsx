import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../../config"
import axios from "axios"

export default function ProfilePage() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [profilePic, setProfilePic] = useState("")

  useEffect(() => {
    axios
      .post(`${BACKEND_URL}/auth/me`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.verified === true) {
          setFullName(response.data.user.fullName)
          setEmail(response.data.user.email)
          setBio(response.data.user.bio)
          setProfilePic(
            `http://localhost:3000/${response.data.user.profilePic}`
          )
          navigate("/")
        } else {
          navigate("/signin")
        }
      })
      .catch((error) => {
        console.log(error)
        navigate("/signin")
      })
  }, [navigate])

  const handleEditClick = () => {
    navigate("/edit-profile")
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
            src={profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h3 className="text-xl font-semibold">{fullName}</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-sm text-gray-900">{email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <p className="mt-1 text-sm text-gray-900">{bio}</p>
            <button
              onClick={() => {
                localStorage.clear("token")
                navigate("/signin")
              }}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
