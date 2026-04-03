const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load .env variables
dotenv.config();

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: "http://localhost:5174" })); // allow React app to talk to us
app.use(express.json());                             // parse JSON request bodies

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/auth",     require("./routes/auth"));
app.use("/api/expenses", require("./routes/expenses"));

// ── Test route ────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "Spendly API is running ✅" });
});

// ── Connect to MongoDB then start server ──────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });