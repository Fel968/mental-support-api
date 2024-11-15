import { Router } from "express";
import { getAllVideos, getSingleVideo, postVideo } from "../controllers/video-resources-controller.js";
import { isAuthenticated, isTherapist } from "../middleware/auth.js";
import { resourceUpload } from "../middleware/files.js";
import { getAllArticles, getSingleArticle, postArticle } from "../controllers/article-resource-controller.js";

export const resourceRouter = Router();

resourceRouter.post('/resources/video',isAuthenticated, isTherapist, resourceUpload.single('video'),postVideo)

resourceRouter.get('/resources/videos',isAuthenticated, getAllVideos)

resourceRouter.get('/resources/video/:id',isAuthenticated, getSingleVideo)

resourceRouter.post('/resources/article',isAuthenticated, isTherapist, resourceUpload.single('media'),postArticle)

resourceRouter.get('/resources/articles', isAuthenticated, getAllArticles)

resourceRouter.get('/resources/article/:id', isAuthenticated, getSingleArticle)


