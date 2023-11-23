const express = require("express");
const {
  createProduct,
  getAllProduct,
  editProduct,
} = require("../controllers/product-controller");
const router = express.Router();
const upload = require("../middleware/upload");
const authenticate = require("../middleware/authenticate");

router.post("/createproduct", upload.single("image"), createProduct);
router.put("/editproduct/:id", editProduct);
router.get("/", getAllProduct);

module.exports = router;
