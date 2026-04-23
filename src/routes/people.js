const express = require('express');
const { z } = require('zod');
const { validate } = require('../middleware/validate');
const { people } = require('../data/mockData');

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ data: people });
});

router.get(
  '/:id',
  validate({ paramsSchema: z.object({ id: z.string().min(1).max(64) }) }),
  (req, res) => {
    const person = people.find((p) => p.id === req.params.id);
    if (!person) return res.status(404).json({ error: 'not_found' });
    res.json({ data: person });
  }
);

module.exports = router;
