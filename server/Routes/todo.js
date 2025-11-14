import express from "express";
import Todo from "../models/Todo.js";
import authorize from "../middlewares/auth.js";

const router = express.Router();

// GET all todos (protected)
router.get("/", authorize, async (req, res) => {
  const todos = await Todo.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(todos);
});

// CREATE todo
router.post("/", authorize, async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    userId: req.user._id,
  });
  res.json(todo);
});

// UPDATE todo
router.put("/:id", authorize, async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true }
  );
  res.json(todo);
});

// DELETE todo
router.delete("/:id", authorize, async (req, res) => {
  await Todo.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  });
  res.json({ message: "Todo deleted" });
});

export default router;
