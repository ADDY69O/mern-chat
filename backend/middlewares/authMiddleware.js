const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // heres get the token after removing bearer
      token = req.headers.authorization.split(" ")[1];
      // console.log(token);
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decode);
      req.user = await User.findById(decode.id).select("-password");

      next();
    } catch (err) {
      res.status(400).json({ error: "Not Autherized, token failed" });
    }
  }
});

module.exports = protect;
