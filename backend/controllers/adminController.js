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
    console.log(adminName, adminPassword);
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

// radera konto
// DELETE en admin med verifiering
exports.deleteAdmin = async (req, res) => {
  const adminId = req.params.adminId; // Ändra från req.body till req.params
  const { adminName, adminPassword } = req.body; // Fortsätt ta emot dessa från request body
  console.log("nu försöker vi radera", adminId, adminName, adminPassword);

  try {
    const admin = await adminModel.findById(adminId);
    if (!admin) {
      return res.status(404).json({ error: "Admin hittades inte!" });
    }

    if (admin.adminName !== adminName) {
      return res.status(401).json({ error: "Användarnamnet matchar inte!" });
    }

    const passwordMatch = await bcrypt.compare(
      adminPassword,
      admin.adminPassword
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Lösenordet är inte korrekt!" });
    }

    await adminModel.deleteOne({ _id: adminId });
    res.status(200).json({ message: "Admin raderad framgångsrikt!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Kunde inte radera admin: " + error.message });
  }
};

// IF user är admin då skickar jag nytt message, i frontend: if message= admin = då visas annan komponent
