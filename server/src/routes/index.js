import { Router } from 'express';
import express from 'express';
import authRoutes from './auth.js'; 
import newsRoutes from './news.js';
import eventsRoutes from './events.js'; // 👈 новий імпорт
import linksRoutes from './links.js';
import catalogRoutes from './catalog.js';

const router = Router();

router.use('/api/login', authRoutes);
router.use('/api/news', newsRoutes);
router.use('/api/events', eventsRoutes); 
router.use('/uploads', express.static('uploads'));
router.use('/api/links', linksRoutes);
router.use('/api/catalog', catalogRoutes);

export default router;