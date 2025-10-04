const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// 🟢 Signup Route
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    res.status(200).json({ message: "User signed up successfully", user: data.user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
