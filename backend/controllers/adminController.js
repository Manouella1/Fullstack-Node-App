const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerAdmin = async (req, res) => {
  try {
    const { adminName, adminPassword } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new UserModel({
      adminName,
      adminPassword: hashedPassword,
    });
    await newAdmin.save();
    res.status(201).json({ message: "En ny användare har lagts till!" });
  } catch (error) {
    res.status(500).json({ error: "Registreringen blev fel!" });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { adminName, adminPassword } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Det gick inte att logga in med din användare!" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Ditt lösenord är inte korrekt!" });
    }
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "2h",
    });

    // IF user är admin då skickar jag nytt message, i frontend: if message= admin = då visas annan komponent
    res.status(200).json({
      token,
      message: "Du är inloggad!",
    });
  } catch (error) {
    res.status(500).json({ error: "Inloggningen gick fel!" });
  }
};
