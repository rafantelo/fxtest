jest.mock('../../config/db.config', () => ({ __esModule: true, default: { query: jest.fn() } }));
jest.mock('uuid', () => ({ v4: () => 'fixed-uuid' }));

import pool from '../../config/db.config';
import TradeOrderModel from '../tradeOrder.model';
import { TradeOrder } from '../../types';

const mockedPool = pool as unknown as { query: jest.Mock };

describe('TradeOrderModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAll returns rows and calls pool.query with limit and offset', async () => {
    const rows = [
      { id: 'fixed-uuid', side: 'buy', type: 'limit', amount: '10.00', price: '100.12345', status: 'open', pair: 'BTCUSD' }
    ];

    mockedPool.query.mockResolvedValue([rows]);

    const result = await TradeOrderModel.getAll(1, 10);

    expect(mockedPool.query).toHaveBeenCalledWith(expect.any(String), [10, 0]);
    expect(result).toEqual(rows);
  });

  test('create generates uuid, inserts and returns id and uuid', async () => {
    mockedPool.query.mockResolvedValue([{ insertId: 42 }]);

    const payload = {
      side: 'buy',
      type: 'limit',
      amount: 10.00,
      price: 100.12345,
      status: 'open',
      pair: 'BTCUSD'
    } as unknown as TradeOrder;

    const res = await TradeOrderModel.create(payload);

    expect(mockedPool.query).toHaveBeenCalledWith(expect.any(String), ['fixed-uuid', payload.side, payload.type, payload.amount, payload.price, payload.status, payload.pair]);
    expect(res).toEqual({ id: 42, uuid: 'fixed-uuid' });
  });
});
