const express = require("express");
const cors = require("cors");
const app = express();

// ✅ Tambahkan header CORS manual di sini (poin 4)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // alamat frontend kamu
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

// ✅ Middleware CORS resmi juga bisa tetap aktif
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// ✅ Middleware body parser
app.use(express.json());

// ✅ Route kamu
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
