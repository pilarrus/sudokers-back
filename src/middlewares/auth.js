const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  try {
    const {token} = req.headers;

    if (!token)
      throw { code: 403, status: 'ACCESS_DENIED', message: 'Missing header token' };

    const data = jwt.verify(token, process.env.JWT_SECRET);

    req.sessionData = {userId: data.userId};
    next();

  } catch (e) {
    res.status(e.code || 403).send({status: e.status || 'ERROR', message: e.message});
  }
};

const isValidHostname = (req, res, next) => {
  const validHost = ['myHost', 'localhost'];
  if (!validHost.includes(req.hostname))
    return res.status(401).send({status: 'ACCESS_DENIED'});

  next();
};

module.exports = { isAuth, isValidHostname };