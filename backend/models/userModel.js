import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["student", "admin"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const userInfoSchema = mongoose.Schema({
  profilePic: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500,
    default: "",
  },
})
const UserInfo = mongoose.model("UserInfo", userInfoSchema)
const User = mongoose.model("User", userSchema)

export { User, UserInfo }
