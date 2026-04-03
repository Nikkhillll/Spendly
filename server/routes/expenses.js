const express = require("express");
const Expense = require("../models/Expense");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// All routes below this line are protected — need a valid JWT
router.use(protect);

// ── GET /api/expenses — get all expenses for logged-in user ───────────────────
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId })
                                  .sort({ date: -1 }); // newest first
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ── POST /api/expenses — add a new expense ────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { title, amount, category, date, notes } = req.body;

    if (!title || !amount || !date) {
      return res.status(400).json({ message: "Title, amount and date are required" });
    }

    const expense = await Expense.create({
      userId: req.userId, // comes from the JWT via authMiddleware
      title,
      amount,
      category,
      date,
      notes,
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ── DELETE /api/expenses/:id — delete an expense ──────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Make sure the expense belongs to the logged-in user
    if (expense.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this expense" });
    }

    await expense.deleteOne();
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;