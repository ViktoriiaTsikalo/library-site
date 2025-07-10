import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import catalogController from '../controllers/catalogController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(catalogController.getCatalog));
router.post('/', authMiddleware, ctrlWrapper(catalogController.createBook));
router.delete('/:id', authMiddleware, ctrlWrapper(catalogController.deleteBook));

export default router;