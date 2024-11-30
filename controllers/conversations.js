const prisma = require("../db/prisma");


const getAllMessages = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: parseInt(conversationId),
      }
    });
    res.status(200).send(messages);
  } catch (error) {
    console.error('Error in getAllMessages:', error);
    res.json(error)
  }
};

const getConversation = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.upsert({
      where: { email: email },
      update: {},
      create: {
        email: email,
        profilePicture:"https://i.pinimg.com/550x/0e/51/7e/0e517eb57cb5a992ef3230b0e0d792af.jpg",
      },
    });

    // Try to find an existing conversation or create a new one
    const conversation = await prisma.conversation.upsert({
      where: {
        userId_adminId: {
          userId: user.id,
          adminId: 1,
        },
      },
      update: {},
      create: {
        userId: user.id,
        adminId: 1,
      },
      include: {
        messages: true,
        admin: true,
        user: true,
      },
    });

    res.json(conversation); 
  } catch (error) {
    console.error('Error in getOrCreateConversationAndUser:', error);
    res.json(error)
};
}
const getAllConversation = async (req, res) => {

  try {
    const conversations = await prisma.conversation.findMany({
      include: {
        messages: true,
        admin: true,
        user: true, 
      },
    });
    res.json(conversations);
  } catch (error) { 
    console.error('Error in getAllConversation:', error);
    res.json(error)
}}
module.exports = { 
  getAllConversation,
  getConversation,
  getAllMessages
};
