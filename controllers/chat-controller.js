import { userModel } from "../models/user-models.js";
import { chatModel } from "../models/chat-model.js";

// GET Endpoint - Get or retrieve a chat between a client and a therapist
export const getChat = async (req, res, next) => {
    try {
        const { therapistId } = req.params;
        const clientId = req.auth.id; // Assume the logged-in user is the client

         // Verify both users exist
         const therapistExists = await userModel.findById(therapistId);
         const clientExists = await userModel.findById(clientId);
 
         if (!therapistExists || !clientExists) {
             return res.status(404).json({ message: "User not found" });
         }

        // Find an existing chat between the client and therapist
        const chat = await chatModel.findOne({
            participants: { $all: [therapistId, clientId] }, 
        });

        // If no chat is found, return a message indicating so
        if (!chat) {
            return res.status(404).json({ message: "No messages found from this user" });
        }

        // Return the existing chat
        res.status(200).json(chat);
    } catch (error) {
        next(error);
    }
};


export const createMessageInChat = async (req, res, next) => {
    try {
        const { therapistId } = req.params;
        const userId = req.auth.id; 
        const { content } = req.body; 

        // Verify both users exist
        const therapistExists = await userModel.findById(therapistId);
        const userExists = await userModel.findById(userId);

        if (!therapistExists || !userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if a chat already exists between the client and therapist
        let chat = await chatModel.findOne({
            participants: { $all: [therapistId, userId] },
        });

        // If no chat exists, create a new one
        if (!chat) {
            chat = await chatModel.create({
                participants: [therapistId, userId],
                messages: [],
            });
        }

        // Create a new message object
        const newMessage = {
            sender: userId,
            content: content,
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
