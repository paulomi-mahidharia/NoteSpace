/**
 * Created by paulomimahidharia on 3/16/16.
 */


var q = require("q");

var noUser = {};

module.exports = function(db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var User = mongoose.model('ProjectUser', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        createUser: createUser,
        findUserById: findUserById,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        userLikesNote: userLikesNote,
        removeLikedNote: removeLikedNote,
        isNoteFavForUser: isNoteFavForUser,
        findUserByFacebookId: findUserByFacebookId,
        userReceivesNote: userReceivesNote,
        getMongooseModel: getMongooseModel
    };

    return api;

    function isNoteFavForUser(userId, noteId){

        return User.findOne({_id: userId, 'likes': {$in : [noteId]}}) ;
    }



    function removeLikedNote (userId, noteId) {

        return User.update(
            { _id: userId },
            { $pull: { 'likes': { $in: [noteId]} } }
        );
    }



    function userLikesNote (userId, note) {

        var deferred = q.defer();

        // find the user
        User.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // add movie id to user likes
                doc.likes.push (note._id);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred;
    }

    function findUserByCredentials(credentials){

        var deferred = q.defer();

        // find one retrieves one document
        User.findOne(

            // first argument is predicate
            {   username: credentials.username,
                password: credentials.password },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function findUserByUsername(username){

        var deferred = q.defer();

        User.findOne({username: username}, function (err,doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllUsers(){

        return User.find();
    }

    function updateUser(userId, user){

        delete user._id;

        return User.update({_id: userId}, {$set: user});
    }

    function findUserById(UserId){

        var deferred = q.defer();

        User.findById(UserId, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function createUser(user){

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        User.create(user, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function deleteUserById(UserId){

        var deferred = q.defer();

        User.findByIdAndRemove(UserId, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findUserByFacebookId(facebookId) {

        return User.findOne({'facebook.id': facebookId});
    }

    function getMongooseModel() {
        return User;
    }


    function userReceivesNote(userId, note) {

        var deferred = q.defer();

        // find the user
        User.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // add movie id to user likes
                doc.receives.push (note._id);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred;
    }



};