const db = require("../models");
const User = db.User;
const passport = require("passport");

exports.current = (req, res) => {
    res.send(req.isAuthenticated());
};

exports.signup = function(req, res, next) {
    passport.authenticate("local-signup", function(err, user) {
      if(err) {
        return next(err);
      }
    
      if(user.notUnique) {
        return res.status(422).send(user);
      }

      req.login(user, function(err) {
        if(err) {
          return next(err);
        }
        return res.send({success: true, user_id: user.id, message: "login succeeded"});
      });
    })(req, res, next);
  };

exports.login = function(req, res, next) {
    passport.authenticate("local-login", function(err, user) {
      if(err) {
        return next(err);
      }

      if(!user) {
        return res.status(400).send({success: false, message: "wrong username or password"});
      }

      req.login(user, function(err) {
        if(err) {
          return next(err);
        }

        return res.send({success: true, userId: user.id, message: "login succeeded"});
      });
    })(req, res, next);
  }

exports.logout = function (req, res) {
    console.log("logging out");
    req.session.destroy(function (err) {
        if (err) console.log(err)
        return res.send({success: true, message: "logout succeeded"});
    });
}

exports.forgot = function (req, res) {
  User.findOne({
    email: req.body.email
  }).then(function(user) {
    if(!user) {
      return res.send({success: false, message: "No account with that email address exists."});
    }

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 60*60;

    console.log(user);
    user.save().then(function(user) {
      console.log(user);
      return res.send({token: token})
    }).catch(function(error) {
      console.log(error);
    });
  })
}
