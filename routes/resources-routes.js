import { Router } from "express";
import { getAllVideos, getSingleVideo, postVideo } from "../controllers/video-resources-controller.js";
import { isAuthenticated, isTherapist } from "../middleware/auth.js";
import { resourceUpload } from "../middleware/files.js";
import { getAllArticles, getSingleArticle, postArticle } from "../controllers/article-resource-controller.js";
import { getAllBooks, getSingleBook, postBook } from "../controllers/ebook-controller.js";


export const resourceRouter = Router();

resourceRouter.post('/resources/video',isAuthenticated, isTherapist, resourceUpload.single('video'),postVideo)

resourceRouter.get('/resources/videos',isAuthenticated, getAllVideos)

resourceRouter.get('/resources/video/:id',isAuthenticated, getSingleVideo)



resourceRouter.post('/resources/article',isAuthenticated, isTherapist, resourceUpload.single('media'),postArticle)

resourceRouter.get('/resources/articles', isAuthenticated, getAllArticles)

resourceRouter.get('/resources/article/:id', isAuthenticated, getSingleArticle)



resourceRouter.post('/resources/book',isAuthenticated, isTherapist, resourceUpload.single('file'),postBook)

resourceRouter.get('/resources/books', isAuthenticated, getAllBooks)

resourceRouter.get('/resources/book/:id', isAuthenticated, getSingleBook)


