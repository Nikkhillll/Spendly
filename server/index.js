const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load .env variables
dotenv.config();

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    "http://localhost:5174",
    "https://your-vercel-app.vercel.app"
  ]
})); // allow React app to talk to us
app.use(express.json());                             // parse JSON request bodies

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/auth",     require("./routes/auth"));
app.use("/api/expenses", require("./routes/expenses"));

// ── Test route ────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "Spendly API is running ✅" });
});

// ── Connect to MongoDB then start server ──────────────────────────────────────
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });