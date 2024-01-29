// fileRouter.js
import express from 'express';
import { imageUploadController } from '../controller/fileUploadController.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/imageUpload", upload.single('file'), imageUploadController);

export default router;
