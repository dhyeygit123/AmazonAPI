const rateLimit = require('express-rate-limit');

const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs: windowMs,
    max: max,
    message: { error: message },
    headers: true,
  });
};

const apiLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  100, // limit each IP to 100 requests per windowMs
  'Too many requests from this IP, please try again after 15 minutes'
);

const loginLimiter = createRateLimiter(
  60 * 60 * 1000, // 1 hour
  5, // limit each IP to 5 login requests per hour
  'Too many login attempts from this IP, please try again after an hour'
);

module.exports = {
  apiLimiter,
  loginLimiter
};