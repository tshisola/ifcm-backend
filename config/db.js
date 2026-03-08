const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ifcm");
    console.log("MongoDB connecté");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;