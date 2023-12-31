const express = require("express");

const paymentCtrl = require("../controllers/payment-controller");

const router = express.Router();

router.post("/update-payment", paymentCtrl.postPayment);
// router.get("/paymentslip" ,getPayment)
router.patch("/updatestatus/:paymentId", paymentCtrl.updateStatus);

module.exports = router;
