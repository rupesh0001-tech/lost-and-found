// middleware/requireAuth.js
const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    // No token, user not logged in
    return res.redirect('/login');
  }

  try {
    // Verify token validity
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // Optional: attach user data
    next(); // proceed to protected route
  } catch (err) {
    // Invalid or expired token
    res.clearCookie('token');
    return res.redirect('/login');
  }
}

module.exports = requireAuth;
