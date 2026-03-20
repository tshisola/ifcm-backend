require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// 🔥 SERVIR LES FICHIERS UPLOAD
app.use("/uploads", express.static("uploads"));

// ✅ ROUTE TEST
app.get("/", (req, res) => {
  res.send("IFCM Backend API fonctionne 🚀");
});

// ✅ ROUTES AUTH
app.use("/api/auth", require("./routes/authRoutes"));

// ✅ ROUTES POSTS
app.use("/api/posts", require("./routes/postRoutes"));

// ✅ DÉMARRAGE SERVEUR APRÈS DB
const startServer = async () => {
  try {
    await connectDB();

    app.listen(5000, () => {
      console.log("Serveur lancé sur port 5000");
    });

  } catch (error) {
    console.error("Erreur démarrage serveur :", error);
  }
};

startServer();