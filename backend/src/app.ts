import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/db.config';
import logger from './utils/logger';

// Import routes
import tradeRoutes from './routes/tradeOrder.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swaggerSpec';

// Initialize environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/trade_orders', tradeRoutes);

// Swagger UI & spec
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/docs.json', (_req: Request, res: Response) => res.json(swaggerSpec));

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: `Welcome to Rafael's test` });
});

// Handle 404 errors
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Unhandled error', { stack: err.stack });
  // for security reasons, avoid sending stack trace in production
  res.status(500).json({ 
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' ? { error: err.message } : {})
  });
});

// Initialize database and start server
(async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server', { error });
    process.exit(1);
  }
})();

// For testing purposes
export default app;
