const express = require("express");
const { createProduct , getAllProduct} = require("../controllers/product-controller");
const { Model } = require("sequelize");
const router = express.Router();
const upload = require("../middleware/upload");
const authenticate = require("../middleware/authenticate");

router.post("/createproduct", upload.single("image"), createProduct);
router.get('/', getAllProduct)


module.exports = router;
