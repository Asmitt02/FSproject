import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
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
}
else {
    console.log("MongoDB URI not provided. Running without database connection.");
}
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map