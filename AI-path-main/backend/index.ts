import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";
import User from "./models/User.ts";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: "uploads/" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
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

// Middleware for auth extraction
const authMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: "No token provided" });
    const token = auth.split(" ")[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    (req as any).userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

app.post("/api/check-in", authMiddleware, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    
    // Check if already checked in today (simplified logic)
    if (user.hasCheckedIn) {
      return res.json({ success: true, user });
    }

    let newXp = user.xp + 500;
    let newLevel = user.level;
    let nextXp = user.nextLevelXp;
    
    if (newXp >= nextXp) {
      newLevel += 1;
      newXp = newXp - nextXp;
      nextXp = Math.floor(nextXp * 1.2);
    }

    user.xp = newXp;
    user.level = newLevel;
    user.nextLevelXp = nextXp;
    user.streak += 1;
    user.hasCheckedIn = true;
    user.lastCheckInDate = new Date();
    await user.save();

    return res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/update-profile", authMiddleware, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const { name, education, skills, targetRole } = req.body;
    const user = await User.findByIdAndUpdate(userId, { name, education, skills, targetRole }, { new: true }).select("-password");
    return res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

import fs from "fs";
app.post("/api/analyze-skill", authMiddleware, upload.single("resume"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // Upload to Cloudinary
    let fileUrl = "";
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "resumes",
        resource_type: "auto"
      });
      fileUrl = result.secure_url;
    } catch (uploadErr) {
      console.error("Cloudinary Upload Error:", uploadErr);
      // Fallback: If cloudinary fails, we might still have the local file
    }

    let resumeContent: any = "";
    const isImage = file.mimetype.startsWith("image/");

    if (isImage && fileUrl) {
      resumeContent = [
        { type: "text", text: "Analyze this resume image and generate a JSON response representing the candidate's readiness for their target role. The target role is typically derived from the resume, default to 'Data Analyst' if unclear. Ensure your response is VALID JSON only with the following structure: { \"score\": Number (0-100), \"role\": String, \"weakAreas\": [String], \"missingSkills\": [String], \"strengths\": [String] }." },
        { type: "image_url", image_url: { url: fileUrl } }
      ];
    } else {
      let resumeText = "User is a fresh computer science graduate with some Python, Pandas, and SQL skills, looking to become a Data Analyst.";
      try {
        const fileContent = fs.readFileSync(file.path, 'utf8');
        if (fileContent.trim() !== "" && fileContent.length > 10) {
          resumeText = fileContent.substring(0, 4000);
        }
      } catch (e) {
        console.log("Could not read file text, using default/metadata.");
      }
      resumeContent = `Resume Content:\n${resumeText}\n\nAnalyze this resume and generate a JSON response representing the candidate's readiness for their target role. Ensure your response is VALID JSON only with the following structure: { \"score\": Number (0-100), \"role\": String, \"weakAreas\": [String], \"missingSkills\": [String], \"strengths\": [String] }.`;
    }

    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("OpenRouter API Key is missing");
    }

    const openrouterData = {
      model: "google/gemini-flash-1.5",
      messages: [
        {
          role: "system",
          content: "You are an expert career and skill gap analyzer. Always return VALID JSON."
        },
        {
          role: "user",
          content: resumeContent
        }
      ],
      response_format: { type: "json_object" }
    };

    let analysisResult;
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        openrouterData,
        {
          headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5000",
            "X-Title": "AI Career Path"
          }
        }
      );

      const messageContent = response.data.choices[0].message.content;
      const jsonStr = messageContent.replace(/```json\n?|\n?```/g, "").trim();
      analysisResult = JSON.parse(jsonStr);
    } catch (apiError: any) {
      console.error("OpenRouter API Error:", apiError?.response?.data || apiError.message);
      analysisResult = {
        score: 65,
        role: "Data Analyst",
        weakAreas: ["Advanced SQL", "Tableau Dashboarding"],
        missingSkills: ["Machine Learning", "Cloud Services"],
        strengths: ["Python", "Pandas", "Communication"]
      };
    }

    return res.json({ success: true, analysis: analysisResult });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error during analysis" });
  }
});

app.post("/api/generate-path", authMiddleware, async (req, res) => {
  try {
    const { role, weakAreas, missingSkills, strengths } = req.body;
    
    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(400).json({ error: "OpenRouter API Key is missing" });
    }

    const openrouterData = {
      model: "google/gemini-flash-1.5",
      messages: [
        {
          role: "system",
          content: "You are an expert curriculum designer. Given the user's role, weak areas, missing skills, and strengths, generate a structured learning path with 3-5 modules. Return ONLY a VALID JSON array of objects with this structure: [{ \"title\": \"Module Title\", \"description\": \"Short desc\", \"duration\": \"1 Week\" }]. Ensure the response is parseable as JSON."
        },
        {
          role: "user",
          content: `Role: ${role}\nWeak Areas: ${weakAreas}\nMissing Skills: ${missingSkills}\nStrengths: ${strengths}`
        }
      ],
      response_format: { type: "json_object" }
    };

    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", openrouterData, {
      headers: { 
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5000",
        "X-Title": "AI Career Path"
      },
      timeout: 30000
    });

    const messageContent = response.data.choices[0].message.content;
    const jsonStr = messageContent.replace(/```json\n?|\n?```/g, "").trim();
    
    let pathResult;
    try {
      const parsed = JSON.parse(jsonStr);
      pathResult = Array.isArray(parsed) ? parsed : (parsed.modules || parsed.path || parsed.curriculum || Object.values(parsed)[0]);
      if (!Array.isArray(pathResult)) throw new Error("Parsed result is not an array");
    } catch (e) {
      console.error("JSON Parsing Error:", e, "Content:", messageContent);
      pathResult = [
        { title: "Foundational Concepts", description: `Focusing on ${weakAreas?.[0] || 'basics'}`, duration: "1 Week" },
        { title: "Core Skills", description: `Mastering ${missingSkills?.[0] || 'core tools'}`, duration: "2 Weeks" },
        { title: "Advanced Application", description: "Building a project using new skills", duration: "1 Week" }
      ];
    }

    return res.json({ success: true, path: pathResult });
  } catch (err: any) {
    console.error("Generate Path Error:", err?.response?.data || err.message);
    return res.status(500).json({ error: err?.response?.data?.error?.message || "Server error generating path" });
  }
});

app.post("/api/chat", authMiddleware, async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(400).json({ error: "OpenRouter API Key is missing" });
    }

    const openrouterData = {
      model: "google/gemini-flash-1.5",
      messages: [
        {
          role: "system",
          content: "You are a helpful, expert AI career counselor and coding mentor for students. Keep your answers concise, encouraging, and highly relevant to learning to code and building a tech career. Limit your responses to a few paragraphs at most."
        },
        ...messages.map((m: any) => ({ role: m.role, content: m.content }))
      ]
    };

    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", openrouterData, {
      headers: { 
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5000",
        "X-Title": "AI Career Path"
      },
      timeout: 30000
    });

    return res.json({ success: true, message: response.data.choices[0].message.content });
  } catch (err: any) {
    console.error("Chatbot Error:", err?.response?.data || err.message);
    return res.status(500).json({ error: err?.response?.data?.error?.message || "Server error with chatbot" });
  }
});
