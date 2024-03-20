const express=require('express')

const router=express.Router()

// will make one route to fetch the msg and one for sending the messages
const authMiddleware=require('../middlewares/authMiddleware.js')
const { sendMessage, getAllMessages } = require('../controllers/message/messageController.js')

router.route('/').post(authMiddleware,sendMessage)
router.route('/:chatId').get(authMiddleware,getAllMessages)



module.exports=router