const express = require('express');
const router = express.Router();
const User = require("../Models/User");
const { Op } = require("sequelize");

// Route GET /api/search
router.get('/', async (req, res) => {
  const { skill, language, passion, project, name } = req.query;

  try {
    // Construction dynamique des conditions
    let conditions = [];

    if (skill) {
      conditions.push({ skills: { [Op.contains]: [skill] } });
    }

    if (language) {
      conditions.push({ languages: { [Op.contains]: [language] } });
    }

    if (passion) {
      conditions.push({ passions: { [Op.contains]: [passion] } });
    }

    if (project) {
      conditions.push({ projects: { [Op.contains]: [project] } });
    }

    if (name) {
      conditions.push({
        [Op.or]: [
          { firstname: { [Op.iLike]: `%${name}%` } },
          { lastname: { [Op.iLike]: `%${name}%` } }
        ]
      });
    }

    // Si aucun filtre n'est envoyé → retourner tous les utilisateurs
    if (conditions.length === 0) {
      const allUsers = await User.findAll();
      return res.json(allUsers);
    }

    // Requête finale avec OR entre les conditions
    const results = await User.findAll({
      where: {
        [Op.or]: conditions
      }
    });

    return res.json(results);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;