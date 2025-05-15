const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db")

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // alamat frontend kamu
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

const favoriteRoutes = require("./routes/favoriteRoutes");
app.use("/api", favoriteRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
