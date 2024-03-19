const express=require('express')
const router=express.Router()
const {registerUser,loginUser,allUsers} =require('../controllers/user/userController.js')
const authmiddleware = require('../middlewares/authMiddleware.js')
//
router.post('/login',loginUser)
router.route('/').post(registerUser).get(authmiddleware,allUsers)


module.exports=router