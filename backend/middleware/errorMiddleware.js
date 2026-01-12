/**
 * =========================================
 * Centralized Error Handling Middleware
 * - No silent failures
 * - Structured logging
 * - Consistent API responses
 * =========================================
 */

const logger = require("../utils/logger");

/* ------------------
   ❌ 404 - Route Not Found
------------------ */
const notFound = (req, res, next) => {
  logger.warn("Route Not Found", {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });

  res.status(404).json({
    success: false,
    error: {
      code: "ROUTE_NOT_FOUND",
      message: `Cannot ${req.method} ${req.originalUrl}`,
    },
  });
};

/* ------------------
   ❌ GLOBAL ERROR HANDLER
------------------ */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode || 500;

  let message = err.message || "Internal Server Error";
  let errorCode = err.code || "INTERNAL_SERVER_ERROR";

  /* ------------------
     🟡 MONGOOSE ERRORS
  ------------------ */
  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
    errorCode = "VALIDATION_ERROR";
  }

  if (err.name === "CastError") {
    message = "Invalid resource ID format";
    errorCode = "INVALID_ID";
  }

  /* ------------------
     🟡 JWT ERRORS
  ------------------ */
  if (err.name === "JsonWebTokenError") {
    message = "Invalid authentication token";
    errorCode = "INVALID_TOKEN";
  }

  if (err.name === "TokenExpiredError") {
    message = "Authentication token expired";
    errorCode = "TOKEN_EXPIRED";
  }

  /* ------------------
     🟡 MULTER ERRORS
  ------------------ */
  if (err.name === "MulterError") {
    errorCode = "FILE_UPLOAD_ERROR";
    message =
      err.code === "LIMIT_FILE_SIZE"
        ? "File size exceeds 5MB limit"
        : err.message;
  }

  /* ------------------
     🔥 LOG EVERY ERROR (NO SILENT FAIL)
  ------------------ */
  logger.error("Application Error", {
    method: req.method,
    url: req.originalUrl,
    statusCode,
    errorCode,
    message,
    stack: err.stack,
    user: req.user ? req.user.id : "anonymous",
  });

  /* ------------------
     ❌ STANDARD RESPONSE
  ------------------ */
  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};

module.exports = {
  notFound,
  errorHandler,
};
