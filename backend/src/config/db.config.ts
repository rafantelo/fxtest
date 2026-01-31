import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Database initialization function
export async function initializeDatabase() {
  try {
    // Create trade_order table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS trade_order (
        id VARCHAR(36) PRIMARY KEY,
        side VARCHAR(10) NOT NULL,
        type VARCHAR(20) NOT NULL,
        amount DECIMAL(15,2) NOT NULL,
        price DECIMAL(15,5) NOT NULL,
        status VARCHAR(20) DEFAULT 'open',
        pair VARCHAR(10) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    logger.info('Database initialized successfully');
  } catch (error) {
    logger.error('Database initialization failed', { error });
    throw error;
  }
}

export default pool;
