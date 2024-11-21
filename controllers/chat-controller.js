import { userModel } from "../models/user-models.js";
import { chatModel } from "../models/chat-model.js";

// GET Endpoint - Get or retrieve a chat between a client and a therapist
export const getChat = async (req, res, next) => {
    try {
        const { senderId } = req.params;
        const recipientId = req.auth.id; 

        // Verify if the therapist exists
        const senderExists = await userModel.findById(senderId);
        if (!senderExists) {
            return res.status(404).json({ message: "Recipient not found" });
        }

        // Verify if the user exists
        const recipientExists = await userModel.findById(recipientId);
        if (!recipientExists) {
            return res.status(404).json({ message: "Sender not found" });
        }


        // Find an existing chat between the client and therapist
        const chat = await chatModel.findOne({
            participants: { $all: [senderId, recipientId] },
        });

        // If no chat is found, return a message indicating so
        if (!chat) {
            return res.status(404).json({ message: "No chats with this user" });
        }

        // Return the existing chat
        res.status(200).json(chat);
    } catch (error) {
        next(error);
    }
};


export const createMessageInChat = async (req, res, next) => {
    try {
        const { recipientId } = req.params;
        const senderId = req.auth.id;
        const { content } = req.body;

        // Verify if the therapist exists
        const recipientExists = await userModel.findById(recipientId);
        if (!recipientExists) {
            return res.status(404).json({ message: "Recipient not found" });
        }

        // Verify if the user exists
        const senderExists = await userModel.findById(senderId);
        if (!senderExists) {
            return res.status(404).json({ message: "Sender not found" });
        }

        // Check if a chat already exists between the client and therapist
        let chat = await chatModel.findOne({
            participants: { $all: [recipientId, senderId] },
        });

        // If no chat exists, create a new one
        if (!chat) {
            chat = await chatModel.create({
                participants: [recipientId, senderId],
                messages: [],
            });
        }

        // Create a new message object
        const newMessage = {
            sender: senderId,
            content: content
        };

        // Add the new message to the chat and save
        chat.messages.push(newMessage);
        await chat.save();

        // Return only the newly created message in the response
        res.status(201).json({
            message: "Message sent",
            newMessage,
        });
    } catch (error) {
        next(error);
    }
};


export const getAllUserChats = async (req, res, next) => {
    try {
        const userId = req.auth.id; // The logged-in user's ID

        // Fetch all chat sessions where the user is a participant
        const chats = await chatModel.find({
            participants: userId,
        })
            .populate('participants', 'userName') // Populate participant details (e.g., name, email)
            .sort({ updatedAt: -1 }); // Sort by the most recently updated chats

        if (!chats.length) {
            return res.status(404).json({ message: "No chat sessions found" });
        }

        // Organize chats by each unique participant (excluding the current user)
        const organizedChats = chats.map((chat) => {
            const otherParticipant = chat.participants.find(
                (participant) => participant._id.toString() !== userId
            );

            return {
                chatId: chat._id,
                withUser: otherParticipant, 
                lastMessage: chat.messages[chat.messages.length - 1], 
                messageCount: chat.messages.length, 
                messages: chat.messages, 
            };
        });

        // Send the response with all organized chats
        res.status(200).json(organizedChats);
    } catch (error) {
        next(error);
    }
};

