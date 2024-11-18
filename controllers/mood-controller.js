import { moodModel } from "../models/mood-model.js";
import { startOfWeek, endOfWeek } from "date-fns";
import { userModel } from "../models/user-models.js";
import { chatModel } from "../models/chat-model.js";

export const postMood = async (req, res, next) => {
    try {
        const { emoji, entry, sharedWithId, chatId } = req.body;
        const postedBy = req.auth.id;

         // Check if sharedWithId (therapist) exists
         if (sharedWithId) {
            const sharedWithExists = await userModel.findById(sharedWithId);
            if (!sharedWithExists) {
                return res.status(404).json({ message: "Therapist not found" });
            }
        }

        // Check if chatId exists
        if (chatId) {
            const chatExists = await chatModel.findById(chatId);
            if (!chatExists) {
                return res.status(404).json({ message: "Chat not found" });
            }
        }

        
        // Create mood log
        const mood = await moodModel.create({
            emoji,
            entry,
            postedBy,
            sharedWithId: sharedWithId || null,
            chatId: chatId || null
        });

        // If shared, add the mood log to the chat
        if (sharedWithId && chatId) {
            await chatModel.findByIdAndUpdate(chatId);
        }

        res.status(201).json({ message: 'Mood Posted' });
    } catch (error) {
        next(error);
    }
};


export const getWeeklyMoodLogs = async (req, res, next) => {
    try {
        const { clientId } = req.params;

         // Check if clientId exists
         const clientExists = await userModel.findById(clientId);
         if (!clientExists) {
             return res.status(404).json({ message: "Client not found" });
         }

        // Get the start and end dates for the current week
        const startDate = startOfWeek(new Date());
        const endDate = endOfWeek(new Date());

        // Fetch mood logs for the given client within the current week
        const weeklyMoodLogs = await moodModel.find({ postedBy: clientId, createdAt: { $gte: startDate, $lte: endDate }}).select('emoji');

        // If no mood logs found, send an empty array
        if (weeklyMoodLogs.length === 0) {
            return res.status(200).json({ message: 'No mood logs found for this week' });
        }

        res.status(200).json({ weeklyMoodLogs });
    } catch (error) {
        next(error);
    }
};





export const getUserWeeklyMoodLogs = async (req, res, next) => {
    try {
        const userId = req.auth.id; // Get the logged-in user's ID

        // Check if the user exists in the database
        const userExists = await userModel.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        // Get the start and end dates for the current week
        const startDate = startOfWeek(new Date());
        const endDate = endOfWeek(new Date());

        // Fetch mood logs for the logged-in user within the current week
        const userMoodLogs = await moodModel.find({
            postedBy: userId, // Filter by the logged-in user's ID
            createdAt: { $gte: startDate, $lte: endDate }
        }).select('emoji entry createdAt');

        // If no mood logs found, send an empty array
        if (userMoodLogs.length === 0) {
            return res.status(200).json({ message: 'No mood logs found for this week', userMoodLogs: [] });
        }

        res.status(200).json({ userMoodLogs });
    } catch (error) {
        next(error);
    }
};
