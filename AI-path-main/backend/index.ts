import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Example route for AI path generation
app.post("/api/generate-path", (req, res) => {
    const { goal, currentSkills } = req.body;
    
    // Simulate some AI processing or database logic here
    const simulatedPath = {
        title: `Path to become a ${goal}`,
        description: `Customized learning path from your current skills: ${currentSkills.join(', ')}`,
        steps: [
            { id: 1, title: 'Learn the Basics', completed: false },
            { id: 2, title: 'Build Projects', completed: false },
            { id: 3, title: 'Apply for Jobs', completed: false }
        ]
    };
    
    res.json(simulatedPath);
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
if (MONGO_URI) {
    mongoose.connect(MONGO_URI)
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.log(err));
} else {
    console.log("MongoDB URI not provided. Running without database connection.");
}

const JWT_SECRET = process.env.JWT_SECRET || "";

function generateToken(userId: any) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
}

// Auth routes: signup
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hash });
    await user.save();
    const token = generateToken(user._id);
    return res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Auth routes: login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });
    const token = generateToken(user._id);
    return res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Protected route example: get current user
app.get("/api/me", async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: "No token provided" });
    const parts = auth.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ error: "Invalid token format" });
    const token = parts[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid token" });
  }
});