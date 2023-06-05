import { Router } from 'express';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';
import validateUser from '../validations/userValidation';
import authAdmin from '../middlewares/authAdmin';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.delete('/user/:id', authAdmin, UserController.delete);
router.get('/users', authAdmin, UserController.getAll);
router.get('/seller_name/:id', authMiddleware, UserController.getSellerName)
router.post('/register', validateUser, UserController.store);
router.post('/register_seller', validateUser, UserController.createSeller);
router.post('/login', AuthController.authenticate);
router.get('/auth', authMiddleware, UserController.index);
router.get('/sellers', authMiddleware, UserController.getAllSellers);

export default router;
