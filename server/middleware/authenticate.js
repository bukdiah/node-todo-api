var {User} = require('./../models/user');

// Middleware we use on ours routes to make them private

var authenticate = (req, res, next) => {
  var token = req.header('x-auth'); //retrieve token from header

  User.findByToken(token).then((user) => {
    if (!user) {
      // valid token but couldn't find doc specified
      return Promise.reject(); // code stops so the rest doesn't exec
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });  
};

module.exports = {
  authenticate: authenticate
}