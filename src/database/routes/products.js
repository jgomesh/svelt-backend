const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const validateSellerDelete = require('../validations/validateSellerDelete');
const ProductController = require('../controllers/ProductController');

const router = Router();

router.get('/products', ProductController.getAll);
router.get('/my_products/:id', ProductController.getAllProductsFromSeller);
router.get('/products/:id', ProductController.getProductById);
router.delete('/product/:id', authMiddleware, validateSellerDelete, ProductController.delete);
router.post('/product', authMiddleware, ProductController.create);

module.exports = router;
