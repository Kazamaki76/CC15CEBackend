const express = require("express");
const authController = require("../controllers/auth-controller");
const authenticateMiddleware = require("../middleware/authenticate");
const {
  addCart,
  getCart,
  deleteCart,
} = require("../controllers/cart-controller");
const router = express.Router();

router.post("/addCart", authenticateMiddleware, addCart);
router.get("/getCart", authenticateMiddleware, getCart);
router.delete("/deleteCart/:cartid", authenticateMiddleware, deleteCart);

module.exports = router;
