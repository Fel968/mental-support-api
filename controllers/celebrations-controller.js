import { celebrationModel } from "../models/celebrations-model.js";

export const postAchievement = async (req, res, next) => {
    try {
        const { content } = req.body;
        const userId = req.auth.id; 

        // Create and save the achievement
        const newAchievement = new celebrationModel({ postedBy: userId, content });
        await newAchievement.save();

        res.status(201).json({message: "Achievement posted successfully" });
    } catch (error) {
        next(error);
    }
};


export const getAchievements = async (req, res, next) => {
    try {
        // Retrieve all achievements with user details populated
        const achievements = await celebrationModel.find()
            .populate("postedBy", "userName").populate('likedBy', 'userName profilePicture')
            .sort({ createdAt: -1 }); 

        res.status(200).json(achievements);
    } catch (error) {
        next(error);
    }
};


export const likeAchievement = async (req, res, next) => {
    try {
        const { achievementId } = req.params;
        const userId = req.auth.id;

        // Find the achievement
        const achievement = await celebrationModel.findById(achievementId);

        if (!achievement) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user already liked the achievement
        if (achievement.likedBy.includes(userId)) {
            return res.status(400).json({ message: "You've liked this post already" });
        }

        // Update the likes count and add user to likedBy
        achievement.likes += 1;
        achievement.likedBy.push(userId);

        await achievement.save();

        res.status(200).json({ message: "You've liked this post" });
    } catch (error) {
        next(error);
    }
};

