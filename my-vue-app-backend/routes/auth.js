const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Access Denied: No Token Provided' });
  }

  jwt.verify(token, '123', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Access Denied: Invalid Token' });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
