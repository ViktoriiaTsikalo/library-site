import express from 'express';
import {
  getAllNews,
  createNews,
  deleteNews,
  uploadNewsVideo,
} from '../controllers/newsController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/upload.js';
import { uploadVideo } from '../middlewares/uploadVideo.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getAllNews));

router.post(
  '/',
  authMiddleware,
  upload.array('images', 5),
  ctrlWrapper(createNews)
);

router.delete('/:id', authMiddleware, ctrlWrapper(deleteNews));

router.post(
  '/upload-video',
  authMiddleware,
  uploadVideo.single('video'),
  ctrlWrapper(uploadNewsVideo)
);

export default router;
