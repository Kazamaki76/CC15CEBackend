const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../validator/auth-validator");
const prisma = require("../models/prisma");
const createError = require("../utils/create-error");

require("dotenv").config();

exports.register = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    value.password = await bcrypt.hash(value.password, 12);
    const user = await prisma.user.create({
      data: value,
    });
    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "awegaewr4h",
      { expiresIn: process.env.JWT_EXPIRE }
    );
    delete user.password;
    res.status(201).json({ accessToken, user });
  } catch (err) {
    next(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { value, error } = loginSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    // Selectt * from user where email = email
    const user = await prisma.user.findFirst({
      where: { email: value.email },
    });

    if (!user) {
      // res.status(400).json({message : 'invalid credential'})  this is manual
      return next(createError("invalid credential", 400)); //this is better
    }
    // เมื่อ find username จะ มาดูตรงpassword
    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      return next(createError("invalid credential", 400));
    }
    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "zlksdrjghaowerig",
      { expiresIn: process.env.JWT_EXPIRE }
    );
    res.status(201).json({ accessToken, user });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  res.status(200).json({ user: req.user });
};
