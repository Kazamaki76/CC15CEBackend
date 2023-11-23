const prisma = require("../model/prisma");

exports.addCart = async (req, res, next) => {
  try {
    const { id, quantity, authUser } = req.body;

    console.log(req.body);
    await prisma.cartItem.create({
      data: {
        productId: +id,
        quantity: +quantity,
        userId: authUser,
      },
    });

    res.status(201).json({ message: "Cart Add" });
  } catch (error) {
    next(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await prisma.cartItem.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        product: true,
      },
    });
    console.log(cart);
    res.status(200).json({ cart });
  } catch (error) {
    next(error);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const { cartid } = req.params;
    console.log(cartid);
    await prisma.cartItem.delete({
      where: {
        id: +cartid,
      },
    });

    res.status(200).json({ message: "Cart item deleted" });
  } catch (error) {
    next(error);
  }
};
