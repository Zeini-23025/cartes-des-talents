const { Op } = require("sequelize");
const User = require("../Models/User");

exports.findCollaborators = async (req, res) => {
  try {
    const { skill, language, passion, project } = req.query;

    const where = {};

    if (skill) {
      where.skills = { [Op.contains]: [skill] };
    }

    if (language) {
      where.languages = { [Op.contains]: [language] };
    }

    if (passion) {
      where.passions = { [Op.contains]: [passion] };
    }

    if (project) {
      where.projects = { [Op.contains]: [project] };
    }

    const users = await User.findAll({
      where,
      attributes: { exclude: ["password"] }
    });

    res.json(users);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
