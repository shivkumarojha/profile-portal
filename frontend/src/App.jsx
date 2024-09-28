import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import EditProfile from "./components/EditProfile.jsx"
import Signin from "./components/Signin.jsx"
import Signup from "./components/Signup.jsx"
import ProfilePage from "./components/Profile.jsx"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
