const prisma = require("../model/prisma");
const { upload } = require("../utils/cloudinary-service");

exports.addPayment = async (req, res, next) => {
  try {
    let path = null;
    console.log(res.file, "hello");
    if (req.file) {
      path = await upload(req.file.path);
    }

    await prisma.order.create({
      data: {
        paymentImage: path,
        userId: req.user.id,
      },
    });

    res.status(201).json({ message: "Cart Add" });
  } catch (err) {
    next(err);
  }
};

exports.getPayment = async (req, res, next) => {
  try {
    const payment = await prisma.order.findMany({
      include: {
        payment: true,
      },
    });
    res.status(200).json({ message: "paymentconfirm", payment });
  } catch (err) {
    next(err);
  }
};
