const express=require('express')
const authmiddleware=require('../middlewares/authMiddleware.js');
const { accessChats,fetchingChats ,createGroup, addToTheGroup, removeFromGroup, renameGroup} = require('../controllers/chats/chatController.js');


const router=express.Router()

router.route('/').post(authmiddleware,accessChats);
router.route('/').get(authmiddleware,fetchingChats)
router.route('/group').post(authmiddleware,createGroup)
router.route('/rename').put(authmiddleware,renameGroup)
router.route('/remove').put(authmiddleware,removeFromGroup)
router.route('/add').put(authmiddleware,addToTheGroup)


module.exports=router 