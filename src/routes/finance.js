const express = require('express');
const { z } = require('zod');
const { validate } = require('../middleware/validate');
const { bankAccounts, eMoneyWallets } = require('../data/mockData');

const router = express.Router();

router.get('/bank-accounts', (_req, res) => {
  res.json({ data: bankAccounts });
});

router.get('/e-money-wallets', (_req, res) => {
  res.json({ data: eMoneyWallets });
});

router.get(
  '/owner/:ownerId',
  validate({ paramsSchema: z.object({ ownerId: z.string().min(1).max(64) }) }),
  (req, res) => {
    const { ownerId } = req.params;
    res.json({
      data: {
        bankAccounts: bankAccounts.filter((a) => a.ownerId === ownerId),
        eMoneyWallets: eMoneyWallets.filter((w) => w.ownerId === ownerId)
      }
    });
  }
);

module.exports = router;
