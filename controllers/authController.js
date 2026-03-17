const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔐 REGISTER
exports.register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // vérifier si utilisateur existe
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json("Email déjà utilisé");

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // créer ID IFCM unique
    const ifcmId = "IFCM-" + Date.now();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      ifcmId
    });

    await user.save();

    res.json({
      message: "Utilisateur créé",
      user
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

// 🔐 LOGIN
exports.login = async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json("Utilisateur non trouvé");
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(400).json("Mot de passe incorrect");
  }

  const token = jwt.sign(
    { id: user._id },
    "SECRET_KEY_IFCM",
    { expiresIn: "7d" }
  );

  res.json({
    message: "Connexion réussie",
    token,
    user
  });
};