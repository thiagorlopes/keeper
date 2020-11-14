module.exports =  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      next();
    } else {
      res.status(401).send({ message: "No credentials provided."});
    }
}
