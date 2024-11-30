const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const morgan = require("morgan");
const { createServer } = require("http");
const { Server } = require("socket.io");
const prisma = require("./db/prisma");
const {sendemail}= require("./middlewares/helper.js");
const conversationRouter = require("./routes/conversations");
const adminRouter = require("./routes/admin");

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3002"],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.use("/api/conversations", conversationRouter);

app.use("/api/admin", adminRouter);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinConversation", (conversationId) => {
    socket.join(conversationId);
    console.log(`A user joined conversation: ${conversationId}`);
  });

  socket.on("sendMessage", (message) => {
    let messageSocket = message;

    const sendMessage = async () => {
      try {
        const message = await prisma.message.create({
          data: {
            content: messageSocket.content,
            createdAt: messageSocket.createdAt,
            senderType: messageSocket.senderType,
            conversation: {
              connect: {
                id: messageSocket.conversationId, 
              },
            },
          },
        });
        console.log('Message created successfully:', message);
        if((messageSocket.senderType) !== "ADMIN"){
            sendemail()
        }

      } catch (error) {
        console.error('Error creating message:', error);
        throw error;
      }
    };
    sendMessage(message);
    io.to(message.conversationId).emit("newMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const port = process.env.PORT || 4000;
server.listen(4000, () => {
  console.log(`app listening on port ${port}`);
});
