import express from 'express';
import {
  getAllNews,
  createNews,
  deleteNews,
  uploadNewsVideo,
} from '../controllers/newsController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import { uploadUniversal } from '../middlewares/upload.js'; // ✅ твій єдиний middleware
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

// Отримати всі новини
router.get('/', ctrlWrapper(getAllNews));

// Створити новину з фото
router.post(
  '/',
  authMiddleware,
  uploadUniversal.array('images', 5), // можна змінити 5 на іншу кількість
  ctrlWrapper(createNews)
);

// Видалити новину
router.delete('/:id', authMiddleware, ctrlWrapper(deleteNews));

// Завантажити відео окремо
router.post(
  '/upload-video',
  authMiddleware,
  uploadUniversal.single('video'), // теж через universal
  ctrlWrapper(uploadNewsVideo)
);

export default router;
