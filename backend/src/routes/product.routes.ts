import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { upload } from '../middleware/upload';
import { 
  createProduct, 
  getProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct,
  bulkUploadProducts,
  downloadTemplate
} from '../controllers/product.controller';

const router = Router();

// ... existing code ...

// Bulk upload endpoints
router.post(
  '/bulk-upload',
  authenticateToken,
  upload.single('file'),
  bulkUploadProducts
);

router.get(
  '/bulk-upload/template',
  downloadTemplate
);

export default router; 