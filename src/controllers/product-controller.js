const fs = require("fs/promises");
const createError = require("../utils/create-error");
const { createProductSchema } = require("../validator/auth-validator");

const { upload } = require("../utils/cloudinary-service");
const prisma = require("../model/prisma");
const { image } = require("../config/cloudinary");

exports.createProduct = async (req, res, next) => {
  const { name, description, price, image } = req.body;
  console.log(req.body);
  try {
    const data = {};
    if (req.file) {
      data.image = await upload(req.file.path);
    }
    console.log(req.file);

    const { value, error } = createProductSchema.validate(req.body);

    data.name = value.name;
    data.description = value.description;
    data.price = value.price;
    console.log(value);

    const creatProduct = await prisma.product.create({
      data: data,
    });
    res.status(201).json({ message: "Product created" });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlink(req.file.path);
    }
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { value, error } = checkPostIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }

    const existPost = await prisma.post.findFirst({
      where: {
        id: value.postId,
      },
    });

    if (!existPost) {
      return next(createError("You Shall not delete", 400));
    }
    await prisma.post.delete({
      where: {
        id: existPost.id,
      },
    });
    res.status(200).json({ message: "deleted" });
  } catch (err) {
    next(err);
  }
};

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({});
    console.log(products);
    res.json({ products });
  } catch (err) {
    next(err);
  }
};
