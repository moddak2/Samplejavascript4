function notFound(_req, res) {
  res.status(404).json({ error: 'not_found' });
}

function errorHandler(err, _req, res, _next) {
  const status = Number.isInteger(err.status) ? err.status : 500;
  const message = status === 500 ? 'internal_error' : (err.message || 'bad_request');

  res.status(status).json({
    error: message,
    details: status === 500 ? undefined : (err.issues || err.errors || undefined)
  });
}

module.exports = {
  notFound,
  errorHandler
};
