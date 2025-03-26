import express from 'express';
import RssController from '../controllers/rssController.js';
import { rssService } from '../services/rssService.js';

const router = express.Router();

// Criar instância do controller
const rssController = new RssController(rssService);

// Definir rotas
router.get('/news', rssController.getAllNews.bind(rssController));
router.get('/sections', rssController.getSections.bind(rssController));
router.get('/news/:section', rssController.getNewsBySection.bind(rssController));

export default router;