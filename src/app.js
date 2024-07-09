import express from 'express';
import 'dotenv/config';

import UserRouter from './routes/userRoutes.js';
import habitsRouter from './routes/habitRoutes.js';

const app = express();

app.use(express.json());

app.use('/users', UserRouter);
app.use('/habits', habitsRouter);

// unhandled routes
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'false',
    message: `Route ${req.originalUrl} not found on the server`,
  });
});

export default app;
