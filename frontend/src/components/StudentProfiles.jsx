import { BACKEND_URL } from "../../config"
import axios from "axios"
import { useEffect, useState } from "react"
import Avatar from "react-avatar"
import { useNavigate } from "react-router-dom"
export default function StudentProfiles() {
  // State to hold student data
  const [students, setStudents] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // Fetching student data
    axios
      .get(`${BACKEND_URL}/profile/student-profiles`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setStudents(response.data.students)
      })
      .catch((error) => {
        console.error("Error fetching student profiles:", error)
      })
  }, [])

  return (
    <div className="container mx-auto p-6 bg-slate-200 h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Student Profiles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {students.map((student, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
          >
            {student.profilePic ? (
              <img
                src={"http://localhost:3000/" + student.profilePic}
                alt={`${student.fullName}'s profile`}
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
            ) : (
              <Avatar
                color={Avatar.getRandomColor("sitebase", [
                  "red",
                  "green",
                  "blue",
                ])}
                name={student.fullName}
                size="128"
                round={true}
                textSizeRatio={2}
              />
            )}

            <h2 className="text-xl font-semibold mb-2">{student.fullName}</h2>
            <p className="text-gray-600 mb-4">{student.email}</p>
            <p className="text-gray-700">{student.bio}</p>
          </div>
        ))}
        <button
          onClick={() => {
            navigate("/")
          }}
          className="mt-3 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          Show My Profile
        </button>
      </div>
    </div>
  )
}
