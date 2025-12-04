const router = require("express").Router();
const ctrl = require("../controllers/user.controller");

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
// router.get("/:id", ctrl.getUserProfile);
router.get("/me", ctrl.getMyProfile);


module.exports = router;
