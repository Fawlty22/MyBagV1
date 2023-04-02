const jwt = require('jsonwebtoken');
const { AuthenticationError } = require("apollo-server-express");

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  //middleware for verifying token on server requests
  //middleware for verifying token on server requests
authMiddleware: function ({ req }) {
  // allows token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (!token) {
    return req;
  }

  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log("invalid token");
  }
  return req;
}
,
  signToken: function({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
};