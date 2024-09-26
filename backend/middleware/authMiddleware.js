import express from "express"
import jwt from "jsonwebtoken"
async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Provide valid auth header...",
    })
  }

  const token = authHeader.split(" ")[1]
  console.log(token)
  try {
    console.log(process.env.JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    req.userId = decoded.user

    next()
  } catch (err) {
    return res.status(411).json({
      message: "You are not authorized.....",
    })
  }
}

export default authMiddleware
