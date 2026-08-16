import { Router } from 'express';
import {
  getGallery,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  reorderGallery,
} from '../controllers/galleryController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', getGallery);
router.get('/:id', getGalleryItem);
router.post('/', protect, upload.single('media'), createGalleryItem);
router.put('/:id', protect, upload.single('media'), updateGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);
router.put('/reorder', protect, reorderGallery);

export default router;
