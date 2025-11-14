import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed,
    });

    res.json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN (LOCALHOST VERSION — works with ProtectedRoute)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

   return res.json({
  message: "Logged in successfully",
  token,
  userId: user._id
   });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// AUTH CHECK (for ProtectedRoute)
router.get("/me", (req, res) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ userId: decoded.userId });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

// SIGNOUT
router.post("/signout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    path: "/"
  });

  return res.json({ message: "Signed out successfully" });
});

export default router;
