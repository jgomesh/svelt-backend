const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const validateCancelStatus = require('../validations/validateCancelStatus');
const validateStatusOwner = require('../validations/validateStatusOwner');
const SaleController = require('../controllers/SaleController');

const router = express.Router();

router.put('/status/:id', authMiddleware, validateStatusOwner, SaleController.updateStatus);
router.put('/cancel_status/:id', authMiddleware, validateCancelStatus, SaleController.canceledStatus);

module.exports = router;
