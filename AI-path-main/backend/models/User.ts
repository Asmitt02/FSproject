import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Gamification fields
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    nextLevelXp: { type: Number, default: 1000 },
    streak: { type: Number, default: 0 },
    hasCheckedIn: { type: Boolean, default: false },
    lastCheckInDate: { type: Date, default: null },
    // Profile fields
    education: { type: String, default: "" },
    skills: { type: [String], default: [] },
    targetRole: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
