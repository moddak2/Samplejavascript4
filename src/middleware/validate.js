function validate({ paramsSchema, querySchema, bodySchema }) {
  return (req, _res, next) => {
    try {
      if (paramsSchema) req.params = paramsSchema.parse(req.params);
      if (querySchema) req.query = querySchema.parse(req.query);
      if (bodySchema) req.body = bodySchema.parse(req.body);
      next();
    } catch (err) {
      err.status = 400;
      next(err);
    }
  };
}

module.exports = { validate };
