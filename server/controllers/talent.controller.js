const User = require("../Models/User");

exports.generateTalentMap = async (req, res) => {
  try {
    // Récupérer tous les utilisateurs
    const users = await User.findAll();

    // Objet compteur pour les compétences
    let skillCounter = {};

    // Pour chaque utilisateur
    users.forEach(user => {
      if (!user.skills) return; // passer si pas de skills

      user.skills.forEach(skill => {
        if (!skill) return;

        const normalized = skill.trim().toLowerCase();

        skillCounter[normalized] = (skillCounter[normalized] || 0) + 1;
      });
    });

    // Transformer en tableau exploitable
    const skillList = Object.entries(skillCounter).map(([talent, count]) => ({
      talent,
      count
    }));

    return res.json(skillList);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
