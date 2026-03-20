const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔐 REGISTER
exports.register = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    // vérifier si utilisateur existe
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ID IFCM
    const ifcmId = "IFCM-" + Date.now();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      ifcmId
    });

    await user.save();

    // 🔥 SUPPRIMER PASSWORD DANS LA RÉPONSE
    const { password: _, ...userData } = user._doc;

    res.json({
      message: "Utilisateur créé",
      user: userData
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// 🔐 LOGIN
exports.login = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign(
      { id: user._id },
      "SECRET_KEY_IFCM",
      { expiresIn: "7d" }
    );

    // 🔥 SUPPRIMER PASSWORD DANS LOGIN AUSSI
    const { password: _, ...userData } = user._doc;

    res.json({
      message: "Connexion réussie",
      token,
      user: userData
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};