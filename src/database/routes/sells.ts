import { Router } from 'express';
import authAdmin from '../middlewares/authAdmin';
import validateSale from '../validations/saleValidation';
import priceValidation from '../validations/priceValidation';
import authMiddleware from '../middlewares/authMiddleware';
import SaleController from '../controllers/SaleController';

const router = Router();

router.post('/sell', authMiddleware, validateSale, priceValidation, SaleController.create);
router.get('/sells', authAdmin, SaleController.getAll);
router.get('/seller_sells', authMiddleware, SaleController.getSellerSales);
router.get('/user_sells', authMiddleware, SaleController.getById);
router.get('/user_sells/:id', authMiddleware, SaleController.getSalesProductsId);
router.get('/sales_products', authAdmin, SaleController.getSalesProducts);
router.get('/top_sellers', SaleController.getTopSellers);
router.get('/top_products', SaleController.getTopProducts);

export default router;
