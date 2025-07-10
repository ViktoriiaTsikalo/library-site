import express from 'express';
import {
  getLinksByCategory,
  createLink,
  deleteLink,
} from '../controllers/linksController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

// GET /api/links
router.get('/', ctrlWrapper(getLinksByCategory));

// POST /api/links
router.post('/', authMiddleware, ctrlWrapper(createLink));

// DELETE /api/links/:id
router.delete('/:id', authMiddleware, ctrlWrapper(deleteLink));

export default router;
