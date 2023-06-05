import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import validateSellerDelete from '../validations/validateSellerDelete';
import ProductController from '../controllers/ProductController';

const router = Router();

router.get('/products', ProductController.getAll);
router.get('/my_products/:id', ProductController.getAllProductsFromSeller);
router.get('/products/:id', ProductController.getProductById);
router.delete('/product/:id', authMiddleware, validateSellerDelete, ProductController.delete);
router.post('/product', authMiddleware, ProductController.create);

export default router;
