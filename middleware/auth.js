const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.cookies?.token;  
  // Usually: "Authorization: Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, 'SECRET_KEY');

    // Attach user info to request
    req.user = decoded;
    next(); // go to next middleware/route
  } catch (err) {
    res.status(400).json({ message: "Somthing went wrong" });
  }
}

module.exports = authMiddleware;



