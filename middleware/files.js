import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

export const userProfileUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/FelJoy/profile/*'
    }),
    preservePath: true
});

export const resourceUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/FelJoy/resources/*'
    }),
    preservePath: true
});

export const certificateUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/FelJoy/certificates/*'
    }),
    preservePath: true
});