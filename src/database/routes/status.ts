import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import validateCancelStatus from '../validations/validateCancelStatus';
import validateStatusOwner from '../validations/validateStatusOwner';
import SaleController from '../controllers/SaleController';

const router = Router();

router.put('/status/:id', authMiddleware, validateStatusOwner, SaleController.updateStatus);
router.put('/cancel_status/:id', authMiddleware, validateCancelStatus, SaleController.canceledStatus);

export default router;
