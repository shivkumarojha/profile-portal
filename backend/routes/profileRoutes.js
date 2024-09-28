import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import multer from "multer"
import path from "path"
import { User } from "../models/userModel.js"
import fs from "fs"
const router = express.Router()

// multer storage configuration
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + req.userId + path.extname(file.originalname)
    )
  },
})

// storage initialization with storage
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB file limit
})

// Route to handle profile update
router.post("/edit-profile", authMiddleware, (req, res) => {
  const email = req.userId

  console.log(req.body.fullName, req.body.bio)
  const uploadDirectory = "./uploads/"

  // Check and delete the old file before uploading a new one
  const deleteOldProfilePic = (email) => {
    const prefix = `profile-pic-${email}`
    const extensions = [".jpeg", ".jpg", ".png", ".gif"]

    // Looping for each extension
    extensions.forEach((ext) => {
      const filePath = path.join(uploadDirectory, `${prefix}${ext}`)
      if (fs.existsSync(filePath)) {
        // If the file exists, delete it
        fs.unlinkSync(filePath)
        console.log(`Deleted old profile picture: ${filePath}`)
      }
    })
  }

  deleteOldProfilePic(email)
  // Handle file and text fields
  upload.single("profile-pic")(req, res, async (error) => {
    if (error) {
      return res.status(401).json({
        message: "Something went wrong while uploading file",
      })
    }

    const { fullName, bio } = req.body
    const filePath = req.file ? req.file.path : null

    // First, delete the old profile picture if it exists

    try {
      // Update user profile in MongoDB
      const user = await User.findOneAndUpdate(
        { email: req.userId },
        {
          fullName: fullName || "", // Update fullName
          bio: bio || "", // Update bio
          profilePic: filePath, // Store the image file path
        },
        { new: true }
      )

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        })
      }
      return res.status(200).json({
        message: "Profile updated successfully",
        user,
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({
        message: "An error occurred while updating the profile",
      })
    }
  })
})

router.get("/student-profiles", authMiddleware, async (req, res) => {
  const admin = req.userId
  console.log(admin)
  const verifiedAdmin = await User.findOne({
    email: admin,
  })
  console.log(verifiedAdmin)
  if (verifiedAdmin.userType === "admin") {
    const students = await User.find({
      userType: "student",
    })
    console.log(students)
    return res.status(200).json({
      message: "Student records fetched successfully",
      students: students,
    })
  }
  return res.status(404).json({
    message: "Not a verified admin, Some error occured...",
  })
})
export default router
