const express = require("express");
const authController = require("../controllers/auth-controller");
const authenticateMiddleware = require("../middleware/authenticate");
const {
  addCart,
  getCart,
  deleteCart,
  deleteAllCart,
} = require("../controllers/cart-controller");
const router = express.Router();

router.post("/addCart", authenticateMiddleware, addCart);
router.get("/getCart", authenticateMiddleware, getCart);
router.delete("/deleteCart/:cartid", authenticateMiddleware, deleteCart);
router.delete("/deleteAllCart" ,authenticateMiddleware ,deleteAllCart);

module.exports = router;
