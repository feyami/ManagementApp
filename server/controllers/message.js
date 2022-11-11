
import Chat from '../models/chatModel.js'
import User from '../models/userModel.js'
import Message from '../models/messageModel.js'
//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
export const allMessages = async (req, res) => {
    try {
      const messages = await Message.find({ chat: req.params.chatId })
        .populate("sender", "photo fullName google.emails[0].value")
        .populate("chat");
      res.json(messages);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  };
  
  //@description     Create New Message
  //@route           POST /api/Message/
  //@access          Protected
  export const sendMessage = async (req, res) => {
    console.log("req.bodydddddd: ", req.body);
    const { content, selectedChat, sender } = req.body;
  
    if (!content || !selectedChat) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
  
    var newMessage = {
      sender: sender,
      content: content,
      chat: selectedChat._id,
    };
  
    try {
      var message = await Message.create(newMessage);
  
      message = await message.populate("sender", "photo fullName google.emails[0].value").execPopulate();
      message = await message.populate("chat").execPopulate();
      message = await User.populate(message, {
        path: "chat.users",
        select: "photo fullName google.emails[0].value",
      });
  
      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
  
      res.json(message);
    } catch (error) {
      res.status(400);
    }
  };