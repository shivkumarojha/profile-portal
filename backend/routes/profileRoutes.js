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
}).single("profile-pic")

router.post("/edit-profile-pic", authMiddleware, async (req, res) => {
  const email = req.userId
  const uploadDirectory = "./uploads/"
  // Check and delete the old file before uploading a new one
  const deleteOldProfilePic = (email) => {
    const prefix = `profile-pic-${email}`
    const extensions = [".jpeg", ".jpg", ".png", ".gif"]

    // Looping for each extention
    extensions.forEach((ext) => {
      const filePath = path.join(uploadDirectory, `${prefix}${ext}`)
      if (fs.existsSync(filePath)) {
        // If the file exists, delete it
        fs.unlinkSync(filePath)
        console.log(`Deleted old profile picture: ${filePath}`)
      }
    })
  }

  // First, delete the old profile picture if it exists
  deleteOldProfilePic(email)

  upload(req, res, (error) => {
    if (error) {
      return res.status(401).json({
        message: "something went wrong while uploading file",
      })
    }
    const bio = req.body.bio || ""
    const fullName = req.body.fullName || ""

    return res.status(200).json({
      message: "File uploaded successfully",
      image: req.file,
    })
  })
})

export default router
