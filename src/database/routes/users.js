const { Router } = require('express');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const validateUser = require('../validations/userValidation');
const authAdmin = require('../middlewares/authAdmin');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.delete('/user/:id', authAdmin, UserController.delete);
router.get('/users', authAdmin, UserController.getAll);
router.get('/seller_name/:id', authMiddleware, UserController.getSellerName);
router.post('/register', validateUser, UserController.store);
router.post('/register_seller', validateUser, UserController.createSeller);
router.post('/login', AuthController.authenticate);
router.get('/auth', authMiddleware, UserController.index);
router.get('/sellers', authMiddleware, UserController.getAllSellers);

module.exports = router;
