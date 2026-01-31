import pool from '../config/db.config';
import { TradeOrder } from '../types';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';

export default class TradeOrderModel {
  static async getAll(
    page: number,
    limit: number,
    filters: { side?: string; type?: string; status?: string; pair?: string } = {}
  ): Promise<TradeOrder[]> {
    const offset = (page - 1) * limit;

    const where: string[] = [];
    const params: any[] = [];

    if (filters.side) {
      where.push('side = ?');
      params.push(filters.side);
    }
    if (filters.type) {
      where.push('type = ?');
      params.push(filters.type);
    }
    if (filters.status) {
      where.push('status = ?');
      params.push(filters.status);
    }
    if (filters.pair) {
      where.push('pair = ?');
      params.push(filters.pair);
    }

    let sql = 'SELECT * FROM trade_order';
    if (where.length) sql += ' WHERE ' + where.join(' AND ');
    sql += ' LIMIT ? OFFSET ?';

    params.push(limit, offset);

    const [rows] = await pool.query<RowDataPacket[]>(sql, params);

    return rows as TradeOrder[];
  }

  static async create(tradeOrder: Omit<TradeOrder, 'id' | 'created_at' | 'updated_at'>): Promise<{ id: number; uuid: string }> {
    const uuid = uuidv4();
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO trade_order (id, side, type, amount, price, status, pair) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [uuid, tradeOrder.side, tradeOrder.type, tradeOrder.amount, tradeOrder.price, tradeOrder.status, tradeOrder.pair]
    );

    return { id: result.insertId, uuid };
  }
}
