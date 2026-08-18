import { Router } from 'express';
import {
  getAllContent,
  getContentByKey,
  updateContent,
  bulkUpdateContent,
  uploadHeroMedia,
  uploadContentImage,
  getSettings,
  updateSettings,
  getDashboardAnalytics,
} from '../controllers/contentController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', getAllContent);
router.get('/settings', getSettings);
router.get('/analytics', protect, getDashboardAnalytics);
router.get('/:key', getContentByKey);
router.put('/', protect, bulkUpdateContent);
router.put('/single', protect, updateContent);
router.put('/settings', protect, updateSettings);
router.post('/hero-media', protect, upload.single('media'), uploadHeroMedia);
router.post('/image/:key', protect, upload.single('image'), uploadContentImage);

export default router;
