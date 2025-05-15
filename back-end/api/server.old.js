const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();
const db = require("../db");

const allowedOrigins = [
  "http://localhost:3000",
  "https://ecomsense.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

// Routes
const authRoutes = require("../routes/authRoutes");
app.use("/api", authRoutes);

const favoriteRoutes = require("../routes/favoriteRoutes");
app.use("/api", favoriteRoutes);

// Debug endpoint
app.get("/api/debug", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json({ status: "✅ DB OK", time: result.rows[0].now });
  } catch (e) {
    res.status(500).json({ status: "❌ DB ERROR", message: e.message });
  }
});

// Export as serverless function
module.exports = app;
module.exports.handler = serverless(app);
