const express = require('express');
const router = express.Router();
const Projet = require('../Models/Projet');

// GET tous les projets
router.get('/', async (req, res) => {
  const projets = await Projet.findAll();
  res.json(projets);
});

// POST projet
router.post('/', async (req, res) => {
  const projet = await Projet.create(req.body);
  res.status(201).json(projet);
});

module.exports = router;
