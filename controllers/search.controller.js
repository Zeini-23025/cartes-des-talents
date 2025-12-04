const User = require("../Models/User");
const { Op } = require("sequelize");

exports.search = async (req, res) => {
  const { skill, language, passion } = req.query;

  try {
    const results = await User.findAll({
      where: {
        [Op.or]: [
          skill ? { skills: { [Op.contains]: [skill] }} : null,
          language ? { languages: { [Op.contains]: [language] }} : null,
          passion ? { passions: { [Op.contains]: [passion] }} : null
        ].filter(Boolean)
      }
    });

    res.json(results);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
