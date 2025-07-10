import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import eventsController from '../controllers/eventsController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(eventsController.getAllEvents));
router.post('/', authMiddleware, ctrlWrapper(eventsController.createEvent));
router.delete('/:id', authMiddleware, ctrlWrapper(eventsController.deleteEvent));

export default router;
