const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const peopleRouter = require('./routes/people');
const financeRouter = require('./routes/finance');
const previewRouter = require('./routes/preview');
const labsRouter = require('./routes/labs');
const { notFound, errorHandler } = require('./middleware/errorHandler');

function createApp({ enableRateLimit = true } = {}) {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());

  if (enableRateLimit) {
    app.use(
      rateLimit({
        windowMs: 60 * 1000,
        limit: 120,
        standardHeaders: true,
        legacyHeaders: false
      })
    );
  }

  app.use(express.json({ limit: '10kb' }));

  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.use('/api/people', peopleRouter);
  app.use('/api/finance', financeRouter);
  app.use('/api/preview', previewRouter);
  app.use('/api/labs', labsRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

const app = createApp();

module.exports = { app, createApp };
