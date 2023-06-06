const { Router } = require('express');
const authAdmin = require('../middlewares/authAdmin');
const validateSale = require('../validations/saleValidation');
const priceValidation = require('../validations/priceValidation');
const authMiddleware = require('../middlewares/authMiddleware');
const SaleController = require('../controllers/SaleController');

const router = Router();

router.post('/sell', authMiddleware, validateSale, priceValidation, SaleController.create);
router.get('/sells', authAdmin, SaleController.getAll);
router.get('/seller_sells', authMiddleware, SaleController.getSellerSales);
router.get('/user_sells', authMiddleware, SaleController.getById);
router.get('/user_sells/:id', authMiddleware, SaleController.getSalesProductsId);
router.get('/sales_products', authAdmin, SaleController.getSalesProducts);
router.get('/top_sellers', SaleController.getTopSellers);
router.get('/top_products', SaleController.getTopProducts);

module.exports = router;
