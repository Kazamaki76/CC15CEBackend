const express = require("express");
const authenticateMiddleware = require("../middleware/authenticate")

const { addPayment ,getPayment} = require("../controllers/order-controller");

const router = express.Router();
const upload = require("../middleware/upload");

router.post("/payment",authenticateMiddleware, upload.single("image"), addPayment);
router.get("/paymentslip" ,getPayment)

module.exports = router
