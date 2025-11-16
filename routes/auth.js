const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { findByIdentifier, createUser, setRefreshToken, getUserById } = require("../models/userModel");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// JWT middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden" });
    req.user = user;
    next();
  });
}

// 1️⃣ Signup
router.post("/signup", async (req, res) => {
  try {
    const { email, username, password, role } = req.body;
    if (!email || !password || !username)
      return res.status(400).json({ error: "Email, username, and password required" });

    // Check if user exists
    const existing = await findByIdentifier(email);
    if (existing) return res.status(400).json({ error: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const user = await createUser({ email, username, password_hash, role });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
});

// 2️⃣ Login
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password)
      return res.status(400).json({ error: "Email/username and password required" });

    const user = await findByIdentifier(identifier);
    console.log('HI')
    console.log(user);
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign({ UserId: user.user_Id, email: user.email, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "8h" });
    res.json({ token, user: { user_id: user.user_Id, email: user.email, username: user.username, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

// 3️⃣ Password Reset / Update
router.post("/reset-password", authenticateToken, async (req, res) => {
  try {
    // You need to implement updateUserPassword in your userModel
    const { newPassword } = req.body;
    const { email } = req.user;
    
    const result = await updateUserPassword(email, newPassword);
    res.json({ message: "Password update endpoint (implement logic)" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Password update failed" });
  }
});

// 4️⃣ Activate / Deactivate User (Admin only)
router.patch("/status/:userId", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;
    if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });
    // Example: const result = await setUserActiveStatus(userId, isActive);
    res.json({ message: "User status update endpoint (implement logic)" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user status" });
  }
});

module.exports = router;
