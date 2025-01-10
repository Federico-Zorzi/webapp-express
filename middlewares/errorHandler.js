function errorHandler(err, req, res, next) {
  res.status(err.status ?? 500);
  res.json({
    error: err.error ?? "server error",
    message: err.message,
  });
}

module.exports = errorHandler;
