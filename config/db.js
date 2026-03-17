const mongoose = require("mongoose");

const connectDB = async () => {
  try {

    console.log("Connexion MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connecté");

  } catch (error) {

    console.error("Erreur MongoDB :", error.message);
  }
};

module.exports = connectDB;