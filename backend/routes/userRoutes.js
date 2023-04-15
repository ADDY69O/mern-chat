const express = require("express");
const {Router}=require('express');
const protect = require("../middlewares/authMiddleware")
const { registerUser,authUser,allUsers } = require("../controllers/userControllers");

const router = express.Router();

router.route('/').post(registerUser).get(protect,allUsers);
router.route('/login').post(authUser)

router.route('/allUser').get(protect,allUsers);

module.exports= router;
