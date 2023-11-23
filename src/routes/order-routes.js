const express = require("express");

const { addPayment } = require("../controllers/order-controller");

const router = express.Router();
const upload = require("../middleware/upload");

router.post("/payment", upload.single("image"), addPayment);

module.exports = router
