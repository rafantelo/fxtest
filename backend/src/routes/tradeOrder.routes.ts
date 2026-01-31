import { Router } from 'express';
import tradeOrderController from '../controllers/tradeOrder.controller';
import { create, getAll } from '../middleware/tradeOrder.middleware';

const router = Router();

// here I can apply middleware to all trade order routes if needed
// router.use(verifyToken);

// Get all trade orders
router.get('/', getAll, tradeOrderController.getAllTradeOrders);

// Create a new trade order
router.post('/', create, tradeOrderController.createTradeOrder);

export default router;
