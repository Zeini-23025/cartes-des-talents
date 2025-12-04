const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/collaborator.controller");

router.get("/", ctrl.findCollaborators);

module.exports = router;
