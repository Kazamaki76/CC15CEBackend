const express = require("express");
const authController = require("../controllers/auth-controller");
const authenticateMiddleware = require("../middleware/authenticate");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.use(authenticateMiddleware);
router.get("/me", authController.getMe);

module.exports = router;
