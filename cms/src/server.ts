import express from 'express';
import payload from 'payload';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Redirect root to admin
app.get('/', (_, res) => res.redirect('/admin'));

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'CHANGE-ME-super-secret-key-here',
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin: ${payload.getAdminURL()}`);
    },
  });

  // CORS for frontend
  app.use((req, res, next) => {
    const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000').split(',');
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
  });

  app.listen(PORT, '0.0.0.0', () => {
    payload.logger.info(`Server running on port ${PORT}`);
  });
};

start();
