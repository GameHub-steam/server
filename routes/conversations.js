const express = require("express");
const router = express.Router();
const {getConversation,getAllConversation,getAllMessages} = require("../controllers/conversations.js");
const helper = require("../middlewares/helper.js");

router.post ('/startchat',getConversation)
router.get ('/getAll',getAllConversation)
router.get('/:conversationId/AllMessages',getAllMessages)



module.exports = router;