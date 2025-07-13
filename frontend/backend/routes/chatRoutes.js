import express from "express";
import Chat from "../models/Chat.js";

const router = express.Router();

// Get all chats
router.get("/", async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: 1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: "Error fetching chats" });
  }
});

// Add new chat
router.post("/", async (req, res) => {
  const { type, content } = req.body;
  try {
    const newChat = new Chat({ type, content });
    await newChat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(500).json({ message: "Error saving chat" });
  }

});


router.delete("/:id", async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);
    res.json({ message: "Chat deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete all chats
router.delete("/", async (req, res) => {
  try {
    await Chat.deleteMany();
    res.json({ message: "All chats deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
