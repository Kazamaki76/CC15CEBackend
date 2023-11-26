// model Payment {
//     id         Int   @id @default(autoincrement())
//     totalPrice Int   @default(0)
//     orderId    Int
//     order      Order @relation(fields: [orderId], references: [id])
//   }
const prisma = require("../model/prisma");
const postPayment = async (req, res, next) => {
  try {
    const body = req.body;
    const totalPrice = req.body.totalPrice;
    const orderId = req.body.orderId;

    // console.log(body);

    // await prism
    const newPayment = await prisma.payment.create({
      data: {
        totalPrice: +totalPrice,
        orderId: +orderId,
      },
    });

    res.status(200).json({ message: "create" + orderId, newPayment });
  } catch (error) {
    next(error);
  }
};

exports.postPayment = postPayment;
