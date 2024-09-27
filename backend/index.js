// For Config
import "dotenv/config"
import path from "path"
// Essentials import
import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import authRouter from "./routes/authRoutes.js"
import profileRouter from "./routes/profileRoutes.js"
import { fileURLToPath } from "url"

// Create __filename and __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()

// for cors
app.use(cors())
// for extracting body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// serving upload directory
// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "./uploads")))

// For form url encoded data
// Router for handling authentication related operations
app.use("/api/v1/user/auth", authRouter)

// Profile router
app.use("/api/v1/user/profile", profileRouter)

// Mongoose db connect
mongoose
  .connect("mongodb://localhost:27017/profile")
  .then(() => {
    console.log("Database connected")
  })
  .catch((error) =>
    console.log("Some error occured while conneting to database", error)
  )

// Start the server
app.listen(process.env.PORT, () => {
  console.log("Server is listening at port: ", process.env.PORT)
})
