import { Router } from 'express';
import {
  getPackages,
  getPackage,
  createPackage,
  updatePackage,
  deletePackage,
} from '../controllers/packageController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', getPackages);
router.get('/:id', getPackage);
router.post('/', protect, upload.single('image'), createPackage);
router.put('/:id', protect, upload.single('image'), updatePackage);
router.delete('/:id', protect, deletePackage);

export default router;
