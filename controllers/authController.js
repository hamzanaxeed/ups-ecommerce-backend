const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findByIdentifier, createUser, setRefreshToken, getUserById } = require("../models/userModel");

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_EXP = process.env.ACCESS_TOKEN_EXPIRY || "60m";
const REFRESH_EXP = process.env.REFRESH_TOKEN_EXPIRY || "7d";

function createAccessToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXP });
}
function createRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXP });
}

async function registerUser(req, res) {
  try {
    const { email, username, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const existing = await findByIdentifier(email);
    if (existing) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = await createUser({ email, username, password_hash });
    return res.status(201).json({ message: "User created", user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Registration failed" });
  }
}

async function loginUser(req, res) {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) return res.status(400).json({ message: "Missing fields" });

    const user = await findByIdentifier(identifier);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const payload = { userId: user.id, email: user.email, role: user.role || "user" };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken({ userId: user.id });

    await setRefreshToken(user.id, refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken, user: { id: user.id, email: user.email, username: user.username } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Login failed" });
  }
}

async function refreshToken(req, res) {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ accessToken: "" });

    let payload;
    try { payload = jwt.verify(token, REFRESH_SECRET); }
    catch (e) { return res.status(403).json({ accessToken: "" }); }

    const user = await getUserById(payload.userId);
    if (!user || user.refresh_token !== token) return res.status(403).json({ accessToken: "" });

    const newAccessToken = createAccessToken({ userId: user.id, email: user.email, role: user.role });
    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ accessToken: "" });
  }
}

async function logout(req, res) {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      let payload = null;
      try { payload = jwt.verify(token, REFRESH_SECRET); } catch (e) {}
      if (payload) await setRefreshToken(payload.userId, null);
    }
    res.clearCookie("refreshToken");
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false });
  }
}

module.exports = { registerUser, loginUser, refreshToken, logout };
