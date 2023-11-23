const prisma = require("../model/prisma");

exports.addPayment = async(req, res, next) => {
    try {
      const { paymentImage} = req.body;
  
      
      await prisma.order.create({
        data: {
          paymentImage: paymentImage
        },
      });
  
      res.status(201).json({ message: "Cart Add" });
    } catch (error) {
      next(error);
    }
  };