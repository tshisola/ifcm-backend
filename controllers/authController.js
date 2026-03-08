const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

  const {name,email,password} = req.body;

  const hashedPassword = await bcrypt.hash(password,10);

  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  await user.save();

  res.json(user);
};

exports.login = async (req,res)=>{

 const {email,password} = req.body;

 const user = await User.findOne({email});

 if(!user){
   return res.status(400).json("Utilisateur non trouvé");
 }

 const valid = await bcrypt.compare(password,user.password);

 if(!valid){
   return res.status(400).json("Mot de passe incorrect");
 }

 const token = jwt.sign({id:user._id},"SECRET");

 res.json({token,user});

};