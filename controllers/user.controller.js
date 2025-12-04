const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashed });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).json({ msg: "Utilisateur introuvable" });

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(401).json({ msg: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.json({ token, user });
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.getMyProfile = async (req, res) => {
  try {
    // Récupération du token dans les headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token manquant" });

    // Décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Trouver l'utilisateur
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] }
    });

    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



