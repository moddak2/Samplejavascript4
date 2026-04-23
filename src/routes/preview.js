const express = require('express');
const escapeHtml = require('escape-html');
const { z } = require('zod');
const { validate } = require('../middleware/validate');

const router = express.Router();

router.post(
  '/',
  validate({ bodySchema: z.object({ text: z.string().min(0).max(2000) }) }),
  (req, res) => {
    const safe = escapeHtml(req.body.text);

    res
      .status(200)
      .set('Content-Type', 'text/html; charset=utf-8')
      .send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Safe Preview</title>
  </head>
  <body>
    <h1>Safe Preview</h1>
    <p>This endpoint demonstrates output escaping to prevent XSS.</p>
    <hr />
    <div>${safe}</div>
  </body>
</html>`);
  }
);

module.exports = router;
