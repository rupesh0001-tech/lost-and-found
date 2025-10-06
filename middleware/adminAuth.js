const jwt = require('jsonwebtoken');

function requireAdminAuth(req, res, next) {
  const token = req.cookies?.adminToken;

  if (!token) {
    return res.redirect('/admin/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
    if (decoded.role !== 'admin') {
      return res.redirect('/admin/login');
    }
    req.admin = decoded;
    next();
  } catch (err) {
    res.clearCookie('adminToken');
    return res.redirect('/admin/login');
  }
}

module.exports = requireAdminAuth;
