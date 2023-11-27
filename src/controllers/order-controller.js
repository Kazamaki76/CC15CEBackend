const prisma = require("../model/prisma");
const { upload } = require("../utils/cloudinary-service");

exports.addPayment = async (req, res, next) => {
  try {
    let path = null;
   
    if (req.file) {
      path = await upload(req.file.path);
    }

    
    await prisma.order.create({
      data: {
        paymentImage: path,
        userId: +req.body.userId,
      },
    });

    // Find last order of userId
   
    const order =  await prisma.order.findFirst( {
      where: {
        userId: parseInt(req.body.userId) ,
      },
      orderBy: {
        id: "desc",
      },
    });
    

    res.status(200).json({ message: "Cart Add", orderId: order.id });
  } catch (err) {
    next(err);
  }
};

exports.getPayment = async (req, res, next) => {
  try {
    const payment = await prisma.order.findMany({
      include: {
        payment: true,
        user: true,
      },
    });
    res.status(200).json({ message: "paymentconfirm", payment });
  } catch (err) {
    next(err);
  }
};
