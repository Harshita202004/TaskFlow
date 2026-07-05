export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const validationErrors = err.errors
    ? Object.values(err.errors).map((error) => error.message || error)
    : undefined;

  res.status(statusCode).json({
    message: err.message || "Server error",
    errors: validationErrors,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
