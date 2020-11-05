var bCrypt = require("bcrypt");

module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require("passport-local").Strategy;

    passport.use("local-signup", new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true 

        }, function (req, username, password, done) {
            console.log("signup for ", username)
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            }
            User.findOne({
                where: {
                    username: username
                }
            }).then(function (user) {
                if (user) {
                    console.log("username already exists");
                    return done(null, {
                        validationError: "username already exists"
                    });
                } else {
                    User.findOne({
                        where: {
                            email: req.body.email
                        }
                    }).then(function(user) {
                        if (user) {
                            console.log("email already exists");
                            return done(null, {
                                validationError: "email already exists"
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
            console.log("logged to ", username)
            User.findOne({
                where: {
                    username: username
                }
            }).then(function (user) {
                if (!user) {
                    return done(null, false, {
                        message: "username does not exist"
                    });
                }

                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: "incorrect password."
                    });
                }

                var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function (err) {

                console.log("error: ", err);
                return done(null, false, {
                    message: "error during login"
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
            console.log("deserializing id " + id);
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
}
