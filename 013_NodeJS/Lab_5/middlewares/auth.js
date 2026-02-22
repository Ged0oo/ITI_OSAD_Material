const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'hjfytfsayr57623er623dfsss3d6723ert623dr';

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'Authentication token is required' });
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    return res.status(401).json({ error: 'Invalid or malformed token' });
  }
};

module.exports = {
  verifyToken
};
