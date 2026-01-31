import { Request, Response, NextFunction } from 'express';
import { body, query, validationResult } from 'express-validator';

export const getAll = [
  query('page')
    .default(1)
    .optional()
    .isInt({ min: 1 }).withMessage('page must be a positive integer'),
  
  query('limit')
    .default(10)
    .optional()
    .isInt({ min: 1 }).withMessage('limit must be a positive integer'),

  (req: Request, res: Response, next: NextFunction) => {
    next();
  }
];

export const create = [
  body('side')
    .trim()
    .isIn(['buy', 'sell']).withMessage('side must be either "buy" or "sell"'),
  
  body('type')
    .trim()
    .isIn(['market', 'limit', 'stop']).withMessage('type must be either "market", "limit", or "stop"'),
  
  body('amount')
    .exists().withMessage('amount is required')
    .bail()
    .matches(/^\d+(?:\.\d{1,2})?$/).withMessage('amount must be a decimal with up to two decimal places')
    .bail()
    .custom((value) => parseFloat(value) > 0).withMessage('amount must be a positive number'),
  
  body('price')
    .exists().withMessage('price is required')
    .bail()
    .matches(/^\d+(?:\.\d{1,5})?$/).withMessage('price must be a decimal with up to five decimal places')
    .bail()
    .custom((value) => parseFloat(value) > 0).withMessage('price must be a positive number'),
  
  body('status')
    .optional()
    .trim()
    .default('open')
    .isIn(['open', 'executed', 'canceled'])
    .withMessage('Status must be one of "open", "executed", or "canceled"'),
  
  body('pair')
    .trim()
    .notEmpty().withMessage('pair is required'),
  
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
