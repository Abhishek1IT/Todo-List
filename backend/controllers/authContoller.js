const user = require("../models/authModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

 const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  })
 };

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await user.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already userExists" });
  }

  const User = await user.create({ name, email, password });
  return res.status(201).json({ message: "user save"});
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const User = await user.findOne({ email });
  if (User && await bcrypt.compare(password, User.password)) {
    res.json({
      _id: User._id,
      email: User.email,
      token: generateToken(User._id),
    });
  }
  else{
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
