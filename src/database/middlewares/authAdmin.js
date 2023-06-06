const { verify } = require('jsonwebtoken');

function authAdmin(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = verify(token, 'secret');
    const { id, role } = data;

    if (!id || !role || role !== 'admin') {
      return res.sendStatus(401);
    }

    req.userId = id;
    next();
  } catch {
    return res.sendStatus(401);
  }
}

module.exports = authAdmin;
