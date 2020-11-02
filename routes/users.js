module.exports = function(app, passport) {
  app.get("/users/current", function(req, res){
    res.send(req.isAuthenticated());
  });

  app.post("/users/signup", function(req, res, next) {
    passport.authenticate("local-signup", function(err, user) {
      if(err) {
        return next(err);
      }

      if(!user) {
        return res.status(401).send({success: false, message: "authentication failed"});
      }

      req.login(user, function(err) {
        if(err) {
          return next(err);
        }
        return res.send({success: true, user_id: user.id, message: "authentication succeeded"});
      });
    })(req, res, next);
  });

  app.post("/users/login", function(req, res, next) {
    passport.authenticate("local-login", function(err, user) {
      if(err) {
        return next(err);
      }

      if(!user) {
        return res.status(401).send({success: false, message: "login failed"});
      }

      req.login(user, function(err) {
        if(err) {
          return next(err);
        }

        return res.send({success: true, userId: user.id, message: "login succeeded"});
      });
    })(req, res, next);
  });

  app.get("/users/logout", function (req, res) {
      //console.log(req.session);
      console.log("logging out");
      req.session.destroy(function (err) {
          if (err) console.log(err)
          return res.send({success: true, message: "logout succeeded"});
      });
  });
}
