import { userModel } from "../models/user-models";
import { chatModel } from "../models/chat-model";

export const getOrCreateChat = async (req, res, next) => {
    try {
        const { therapistId } = req.params;
        const clientId = req.auth.id; // Assume client is the logged-in user

        // Verify both users exist
        const therapistExists = await userModel.findById(therapistId);
        if (!therapistExists) {
            return res.status(404).json({ message: "Therapist not found" });
        }

        const clientExists = await userModel.findById(clientId);
        if (!clientExists) {
            return res.status(404).json({ message: "Client not found" });
        }

        // Check if a chat already exists between the two users
        let chat = await chatModel.findOne({
            participants: { $all: [therapistId, clientId] },
        });

        // If no chat exists, create a new one
        if (!chat) {
            chat = await chatModel.create({
                participants: [therapistId, clientId],
                messages: [],
            });
        }

        res.status(200).json({ chat });
    } catch (error) {
        next(error);
    }
};