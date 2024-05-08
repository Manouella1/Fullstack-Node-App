const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// vanligt get ****
exports.getAdmin = async (req, res) => {
  try {
    const admin = await adminModel.find();
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: "Det gick inte att hämta admin!" });
  }
};

// Registrering
exports.registerAdmin = async (req, res) => {
  try {
    const { adminName, adminPassword } = req.body;
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const newAdmin = new adminModel({
      adminName,
      adminPassword: hashedPassword,
    });
    await newAdmin.save();
    res.status(201).json({ message: "En ny användare har lagts till!" });
  } catch (error) {
    res.status(500).json({ error: "Registreringen blev fel!" });
  }
};

// Logga in
exports.loginAdmin = async (req, res) => {
  try {
    const { adminName, adminPassword } = req.body;
    const admin = await adminModel.findOne({ adminName });
    if (!admin) {
      return res
        .status(401)
        .json({ error: "Det gick inte att logga in med din användare!" });
    }
    const passwordMatch = await bcrypt.compare(
      adminPassword,
      admin.adminPassword
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Ditt lösenord är inte korrekt!" });
    }
    const token = jwt.sign({ adminId: admin._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
      message: "Du är inloggad!",
    });
  } catch (error) {
    res.status(500).json({ error: "Inloggningen gick fel!" });
  }
};

// IF user är admin då skickar jag nytt message, i frontend: if message= admin = då visas annan komponent
