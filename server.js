require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTE TEST
app.get("/", (req, res) => {
  res.send("IFCM Backend API fonctionne 🚀");
});

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));

// ⚡ ATTENDRE MONGODB AVANT LANCEMENT
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