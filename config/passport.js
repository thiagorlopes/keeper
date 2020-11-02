var bCrypt = require("bcrypt");
var passport = require("passport");

module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require("passport-local").Strategy;

    passport.use("local-signup", new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true 

        }, function (req, username, password, done) {
            console.log("Signup for ", username)
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            }
            User.findOne({
                where: {
                    username: username
                }
            }).then(function (user) {
                if (user) {
                    return done(null, false, {
                        message: "That username is already taken"
                    });
                } else {
                    var userPassword = generateHash(password);
                    var data = {
                        email: req.body.email,
                        username: req.body.username,
                        password: userPassword,
                    };

                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                    }
            });
        }
    ));

    passport.use("local-login", new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },

        function (req, username, password, done) {
            var User = user;

            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            console.log("Logged to ", username)
            User.findOne({
                where: {
                    username: username
                }
            }).then(function (user) {
                if (!user) {
                    return done(null, false, {
                        message: "Username does not exist"
                    });
                }

                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: "Incorrect password."
                    });
                }

                var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function (err) {

                console.log("Error: ", err);
                return done(null, false, {
                    message: "Error during login"
                });
            });
        }
    ));

    // determines which data of user should be saved as key in the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // retrieve user object with the key stored in session
    passport.deserializeUser(function (id, done) {
        User.findByPk(id).then(function (user) {
            console.log("Deserializing id " + id);
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
}
