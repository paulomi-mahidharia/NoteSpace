/**
 * Created by paulomimahidharia on 3/16/16.
 */

//var bcrypt = require("bcrypt-nodejs");
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function(app, UserModel, NoteModel, uuid){

    //var fs = require("fs");

    //var multer  = require('multer');
    //var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var auth = authorized;
    app.post  ('/api/project/login', passport.authenticate('local'), login);

    //creates a new user embedded in the body of the request, and responds with an array of all users
    app.post("/api/project/user", createUser);

    //responds with an array of all users
    app.get("/api/project/user", findAllUsers);

    //Return logged in user (possibly null)
    app.get("/api/project/user/loggedin", loggedIn);

    //updates an existing user whose id property is equal to the id path parameter.
    //The new properties are set to the values in the user object embedded in the HTTP request. Responds with an array of all users
    app.put("/api/project/user/:id", updateUser);

    //removes an existing user whose id property is equal to the id path parameter.
    // Responds with an array of all users
    app.delete("/api/project/user/:id", deleteUserById);

    //responds with a single user whose id property is equal to the id path parameter
    app.get("/api/project/user/:UserId", findUserById);

    //Logout current user
    app.post("/api/project/user/logout", logout);

    //Find notes liked by user
    app.get("/api/project/user/:userId/notes", findNoteLikes);

    app.delete("/api/project/user/:userId/note/:noteId", removeLikedNote);

    app.get("/api/project/user/:userId/note/:noteId/favorite", isNoteFavForUser);

    //Facebook authentication!
    app.get   ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
         passport.authenticate('facebook', {
             successRedirect: '/#/profile',
             failureRedirect: '/#/login'
         }
         )
    );

    var facebookConfig = {
        clientID        : "219912225053962",
        clientSecret    : "a2a3e07c2744382c24bcbacdcd3fafa0",
        callbackURL     : "https://paulomi-notemaker.herokuapp.com/auth/facebook/callback"
        //callbackURL     : "http://localhost:3000/auth/facebook/callback"
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function login(req, res) {

        var user = req.user;
        res.json(user);
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {

        UserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        UserModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if(user) {

                        return done(null, user);

                    } else {

                        return done(null, false);
                    }
                },
                function(err) {

                    if (err) { return done(err); }
                }
            );
    }

    function loggedIn(req, res) {

        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {

        req.logOut();
        res.send(200);
    }


    function isNoteFavForUser(req,res){

        var userId = req.params.userId;
        var noteId = req.params.noteId;

        UserModel.isNoteFavForUser(userId, noteId)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function removeLikedNote(req, res){
        var userId = req.params.userId;
        var noteId = req.params.noteId;

        UserModel.removeLikedNote(userId, noteId)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function findNoteLikes(req, res){
        var userId = req.params.userId;

        var user;

        UserModel.findUserById(userId)
            .then (
                function (doc) {
                    user = doc;
                    if (doc) {
                        return NoteModel.findNotesByIds(user.likes);
                    } else {
                        res.json ({});
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then (
                function (notes) {
                    user.likesNotes = notes;
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }



    function findAllUsers(req, res){

        var username = req.query.username;
        var password = req.query.password;

        // If both username and password are provided for credentials

        if(username != null && password!= null) {

            var credentials = {username: username,
                               password: password};

            findUserByCredentials(credentials, req, res);
        }

        //If only username is provided for credentials

        else if(username != null){

            findUserByUsername(username, req, res)
        }

        //If nothing is provided and we need all users

        else{

            var user = UserModel.findAllUsers()
                .then(
                    function (doc) {

                        res.json(doc);
                    },

                    // send error if promise rejected
                    function ( err ) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function findUserByCredentials(credentials, req ,res){

        var user = UserModel.findUserByCredentials(credentials)
            .then(
                function (doc) {

                    req.session.currentUser = doc;
                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }


    function findUserByUsername(req, res){
        var username = req.body;

        var user = UserModel.findUserByUsername(username)
            .then(
                function (doc) {

                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {

                    res.status(400).send(err);
            });
    }

    function findUserById(req, res) {

        var userId = req.params.UserId;

        var user = UserModel.findUserById(userId)
            .then(
                function (doc) {

                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {

                    res.status(400).send(err);
                });

    }

    function updateUser(req,res){
        var userId = req.params.id;
        var user = req.body;

        var updatedUser = UserModel.updateUser(userId, user)
            .then(
                function (doc) {

                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {

                    res.status(400).send(err);
                });
    }

    function createUser(req,res){

        var newUser = req.body;

        UserModel.findUserByUsername(newUser.username)
            .then(

                function(user){

                    if(user) {

                        res.json(null);
                    } else {

                        return UserModel.createUser(newUser);
                    }
                },
                function(err){

                    res.status(400).send(err);
                }
            )
            .then(
                function(user){

                    if(user){

                        req.login(user, function(err) {

                            if(err) {

                                res.status(400).send(err);
                            } else {

                                res.json(user);
                            }
                        });
                    }
                },
                function(err){

                    res.status(400).send(err);
                }
            );

    }

    function deleteUserById(req, res){

        var user = req.body;
        var userId = req.params.id;

        user = UserModel.deleteUserById(userId)
            .then(
                function (doc) {

                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {

                    res.status(400).send(err);

                }
            );
    }

    function authorized (req, res, next) {

        if (!req.isAuthenticated()) {

            res.send(401);
        } else {
            next();
        }
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        UserModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastName:  names[1],
                            firstName: names[0],
                            email:     profile.emails ? profile.emails[0].value:"",
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return UserModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

};
