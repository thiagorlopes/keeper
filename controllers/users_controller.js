const db = require("../models");
const User = db.User;
const passport = require("passport");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Op = db.Sequelize.Op;
const bCrypt = require("bcrypt");

exports.current = (req, res) => {
    var status = req.isAuthenticated();
    res.status(200).json({authenticated: status});
};

exports.signup = (req, res, next) => {
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

exports.login = (req, res, next) => {
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

exports.logout = (req, res) => {
    console.log("logging out");
    req.session.destroy(function (err) {
        if (err) console.log(err)
        return res.send({success: true, message: "logout succeeded"});
    });
}

exports.forgot = (req, res) => {

  var origin = `http://${req.headers["x-forwarded-host"]}`

  if(process.env.NODE_ENV === "production") {
    origin = req.headers.origin;
  }

  // Generate password reset token
  crypto.randomBytes(20, function(err, buf) {
    if(err) {
      res.status(400).send(err);
    }
    var token = buf.toString("hex");

    return findUser(token);
  });

  // If username exists, token value and expiration date are stored in database
  function findUser(token) {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(user) {
      if(!user) {
        return res.status(422).json({message: "No account with that email exists."});
      }

      user.reset_password_token = token;
      user.reset_password_expires = Date.now() + 60*60*1000;

      // If user is successfully saved on database, send token to them through SMTP server
      user.save().then(function(user) {
        sendEmail(token, user);
      }).catch(function(error) {
        res.status(422).send(error);
      });
    })
    .catch((e) => {
      res.status(422).json({message: "No account with that email exists."});
    });
  }

  function sendEmail(token, user){
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    var resetOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: user.email,
      subject: "Keeper Password Reset",
      html: `<p>Hi, ${user.username}</p>
      <p>You recently requested to reset your password for your Keeper account.
      Click the link below to reset it.</p> 
      <a href="${origin}/reset/${token}">Reset password</a>
      <p>If you did not request a password reset, please ignore this email or reply to let us know.
      This password reset is only valid for the next hour.<p>

      <p>Thanks,<br />
      Thiago Rodrigues</p>
      <hr />

      <h4 style="font-weight:normal;">If you are having trouble clicking the password reset link, copy and paste the URL below
      into your browser</h4>
      ${origin}/reset/${token}`
    }; 

    transporter.sendMail(resetOptions, function(err, info){
      console.log(info);
      if(err) {
        res.status(400).send(err);
      } else {
        console.log ("success", "An e-mail has been sent to " + user.email + " with further instructions to reset password.");
        return res.status(200).json({
          render: true,
          message: `An email has been sent to ${user.email} with further instructions to reset the password.`
        });
      }
    });
  }
}

// If token is valid, redirect user to password reset screen
exports.reset = (req, res) => {
  User.findOne({
    where: {
      reset_password_token: req.params.token,
      reset_password_expires: { [Op.gt]: Date.now()}
    }
  }).then(function(user) {
    if(!user) {
      return res.status(422).json({render: true, message: "Token is invalid or has expired."});
    }

    var hashedPassword = bCrypt.hashSync(req.body.password, bCrypt.genSaltSync(8), null);

    user.password = hashedPassword;
    user.reset_password_token = null;
    user.reset_password_expires = null;

    // If user is successfully saved on database, alert about change through email
    user.save().then(function(user) {
      sendEmail(user); 
    }).catch(function(error) {
      res.status(422).send(error);
    });

  })
  .catch((e) => {
    console.log(e);
  });

  function sendEmail(user){
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    var resetOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: user.email,
      subject: "Your password has been changed",
      html: `<p>Hi, ${user.username}</p>
      <p>This is a confirmation that the password for your Keeper acount has been changed.</p>

      <p>If you did not request a password change, please reply to this email.</p>
      <p>Thanks,<br />
      Thiago Rodrigues</p>`
    };

    transporter.sendMail(resetOptions, function(err, info){
      console.log(info);
      if(err) {
        res.status(400).send(err);
      } else {
        console.log ("success", `An e-mail has been sent to ${user.email} alerting about the password change.`);
        return res.status(200).json({
          render: true,
          message: `The password was successfully updated.`
        });
      }
    });
  }
}
