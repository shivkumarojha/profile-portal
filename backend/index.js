// For Config
import "dotenv/config"

// Essentials import
import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import authRouter from "./routes/authRoutes.js"
import profileRouter from "./routes/profileRoutes.js"

const app = express()

// for cors
app.use(cors())
// for extracting body
app.use(express.json())

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
