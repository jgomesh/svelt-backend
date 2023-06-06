const { verify } = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = verify(token, 'secret');
    const { id, role } = data;

    if (!id || id === 'undefined' || !role || role === 'undefined') {
      return res.sendStatus(401);
    }
    req.userId = id;
    req.role = role;

    return next();
  } catch (error) {
    return res.sendStatus(401);
  }
}

module.exports = authMiddleware;
