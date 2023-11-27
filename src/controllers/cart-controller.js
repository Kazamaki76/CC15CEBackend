const prisma = require("../model/prisma");

exports.addCart = async (req, res, next) => {
  try {
    const { id, quantity, authUser } = req.body;
    
    
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
   
    res.status(200).json({ cart });
  } catch (error) {
    next(error);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const { cartid } = req.params;
    
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

exports.deleteAllCart = async (req, res, next) => {
  try {
    const userId = +req.user.id 
    await prisma.cartItem.deleteMany({
      where: {
        userId
      },
    });

    res.status(200).json({ message: "all Cart item deleted" });
  } catch (error) {
    next(error);
  }
};
