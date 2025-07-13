import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  type: String, // "question" or "answer"
  content: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Chat", chatSchema);
