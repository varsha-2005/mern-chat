const Message = require("../models/messageModel");
const User = require('../models/userModel');

const getMessages = async (req, res) => {
    
    try {
        const {sender,receiver}=req.query;
        const messages = await Message.find({
            $or:[
                {sender,receiver},
                {sender:receiver,receiver:sender},
            ]
        })
        .sort({timestamp:1});
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching messages");
    }
}

const sendMessage = async(req,res)=>{
    try{
        const {sender,receiver,message}=req.body;
        const newMessage = new Message({
            sender,receiver,message
        })
        await newMessage.save();
        res.json(newMessage);
    }catch (error) {
        console.error(error);
        res.status(500).send("Error sending message");
      }
}

module.exports = {getMessages,sendMessage}