const createError = require("../utils/create-error");
const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma")
require("dotenv").config()


module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startWith === "Bearer") {
      return next(createError("unauthenticated", 401));
    }
    const token = authorization.split(" ")[1];
    //Verify Token
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "erthaerhaer"
      );
      
      const user = await prisma.user.findUnique({
        where: {
            id:payload.userId
        }
      });
      if(!user) {
        return next(createError("unauthenticated",401));
      }
      delete user.password;
      req.user = user;
      next();
      // user.isAdmin
  } catch (err) {
    if(err.name === "TokenExpiredError" || err.name === "JsonWebToken") {
        err.statusCode = 401;
    }
    next(err);
  }
};
