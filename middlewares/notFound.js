function notFound(req, res, next) {
  res.status(404);
  res.json({
    error: "KO",
    message: "Endpoint not found",
  });
}

module.exports = notFound;
