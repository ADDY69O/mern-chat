const express = require('express');
const {accessChat, fetchChat, createGroupChat, rename, removeGroup, addGroup} = require('../controllers/chatControllers');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').post(protect , accessChat).get(protect,fetchChat);
router.route('/group').post (protect,createGroupChat);
router.route('/rename').put(protect,rename);
router.route('/groupremove').put(protect,removeGroup);
router.route('/groupadd').put(protect,addGroup);


module.exports = router;