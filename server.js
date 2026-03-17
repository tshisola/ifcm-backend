require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// ✅ ROUTE ACCUEIL
app.get("/", (req, res) => {
  res.send("IFCM Backend API fonctionne 🚀");
});

// 🔐 AUTH ROUTES
app.use("/api/auth", require("./routes/authRoutes"));

app.listen(5000, () => {
  console.log("Serveur lancé sur port 5000");
});