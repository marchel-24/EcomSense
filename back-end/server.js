const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");

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

const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

const favoriteRoutes = require("./routes/favoriteRoutes");
app.use("/api", favoriteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
