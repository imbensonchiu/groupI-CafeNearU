const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const base64 = require('base-64')

const errorHandler = require('./errorHandler');

module.exports = {
  bcrypt: bcrypt,
  jwt: jwt,
  jwtSecret: process.env.JWT_SECRET,

  userAuthorization: async (req, res, next) => {
    if (!req.header('Authorization')) {
      errorHandler.clientError(res, 'noToken', 401);
    } else {
      try {
        // Verify user token
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, jwtSecret);

        const userData = {
          id: decoded.id,
          name: decoded.name,
        };

        next();
      } catch (error) {
        errorHandler.clientError(res, 'invalidToken', 403);
      }
    }
  },
  extractUserIDFromToken: (req) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, jwtSecret);
    const userID = decoded.id;

    return userID;
  },
  validateEmail: (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
  },
  validateProvider: (provider) => {
    return provider === 'native' || provider === 'google';
  },
};
