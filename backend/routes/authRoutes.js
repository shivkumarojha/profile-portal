import express from "express"
import { User } from "../models/userModel.js"
import { z } from "zod"
const router = express.Router()
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import authMiddleware from "../middleware/authMiddleware.js"

// user zod schema for validation
const userSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  password: z.string(),
  userType: z.enum(["student", "admin"]),
})

// me route to check if the user is authorized
router.post("/me", authMiddleware, async (req, res) => {
  if (req.userId) {
    const user = await User.findOne({
      email: req.userId,
    })
    return res.status(200).json({
      message: "Authorized",
      verified: true,
      user: user,
    })
  }
  return res.status(401).json({
    message: "Not authorized",
    verified: false,
  })
})

// Signin Route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({
    email: email,
  })
  if (!user) {
    return res.status(404).json({
      message: "User does not exist",
    })
  }

  //   Check for password match
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return res.status(411).json({
      message: "Password didn't matched",
    })
  }

  // generate jwt and login the user
  const token = await jwt.sign(
    {
      user: email,
    },
    process.env.JWT_SECRET
  )

  return res.status(200).json({
    message: "Logged in",
    token: token,
  })
})

// Sign up  Route
router.post("/signup", async (req, res) => {
  const parsedData = userSchema.safeParse(req.body)
  if (!parsedData.success) {
    return res.json({
      message: "Some error occured while parsing user data",
      error: parsedData.error,
    })
  }
  const { email, fullName, password, userType } = parsedData.data

  // Check if the user already existed in the database
  const existingUser = await User.findOne({
    email: parsedData.data.email,
  })
  if (existingUser) {
    return res.json({
      message: "User email already exist, try another email...",
    })
  }
  //   Hash the user password
  const hashedPassword = await bcrypt.hash(password, 10)

  //   Save the user in the database
  const user = await User.create({
    email: parsedData.data.email,
    fullName: parsedData.data.fullName,
    userType: parsedData.data.userType,
    password: hashedPassword,
  })
  if (!user) {
    return res.status(411).json({
      message: "Something went wrong while creating the user",
    })
  }
  return res.status(200).json({
    message: "User created successfully..",
    email: user.email,
  })
})

export default router
