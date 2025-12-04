const express = require('express');
const router = express.Router();
const Talent = require('../Models/Talent');
const User = require('../Models/User');
const ctrl = require("../controllers/talent.controller");

// 🔹 1) Route du nuage de compétences
router.get("/map", ctrl.generateTalentMap);

// 🔹 2) GET tous les talents
router.get('/', async (req, res) => {
  const talents = await Talent.findAll({ include: User });
  res.json(talents);
});

// 🔹 3) POST talent
router.post('/', async (req, res) => {
  const talent = await Talent.create(req.body);
  res.status(201).json(talent);
});

// 🔹 4) Patch valider talent
router.patch('/:id/verify', async (req, res) => {
  const talent = await Talent.findByPk(req.params.id);
  if (!talent) return res.status(404).json({ message: 'Talent not found' });
  talent.verified = true;
  await talent.save();
  res.json(talent);
});

module.exports = router;
