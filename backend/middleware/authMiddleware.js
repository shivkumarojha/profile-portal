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
    console.log("Before verification")
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    console.log("after verification")
    console.log(decoded)
    req.userId = decoded.user

    next()
  } catch (err) {
    return res.status(401).json({
      message: "You are not authorized.....",
    })
  }
}

export default authMiddleware
