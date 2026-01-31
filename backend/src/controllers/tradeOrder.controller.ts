import { Request, Response } from 'express';
import TradeOrderModel from '../models/tradeOrder.model';
import logger from '../utils/logger';

export default class TradeOrderController {
  static async getAllTradeOrders(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const filters: any = {};
      if (req.query.side) filters.side = req.query.side;
      if (req.query.type) filters.type = req.query.type;
      if (req.query.status) filters.status = req.query.status;
      if (req.query.pair) filters.pair = req.query.pair;

      const tradeOrders = await TradeOrderModel.getAll(page, limit, filters);
      res.json(tradeOrders);
    } catch (error) {
      logger.error('Get all trade orders error', { error });
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async createTradeOrder(req: Request, res: Response) {
    try {
      const { side, type, amount, price, status, pair } = req.body;
      
      const newTradeOrder = await TradeOrderModel.create({ side, type, amount, price, status, pair });
      if (!newTradeOrder) {
        return res.status(500).json({ message: 'Failed to create trade order' });
      }
      
      res.json({ message: 'Trade order created successfully', tradeOrder: newTradeOrder });
    } catch (error) {
      logger.error('Create trade order error', { error });
      res.status(500).json({ message: 'Server error' });
    }
  }
}
