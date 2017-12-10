/**
 * Created by paulomimahidharia on 3/25/16.
 */
"use strict";

var notes = require("./note.mock.json");
var q = require("q");

module.exports = function(db, mongoose, UserModel, NotebookModel) {

    var NoteSchema = require("./note.schema.server.js")(mongoose);
    var Note = mongoose.model('Note', NoteSchema);

    var User = UserModel.getMongooseModel();

    var Notebook = NotebookModel.getMongooseModel();

    var api = {

        deleteNoteById: deleteNoteById,
        findAllNotesForUser: findAllNotesForUser,
        findNoteById: findNoteById,
        updateNoteById: updateNoteById,
        createNote: createNote,
        userLikesNote: userLikesNote,
        findNotesByIds: findNotesByIds,
        removeLikedUser: removeLikedUser,
        getMongooseModel: getMongooseModel,
        deleteNoteFromNotebook : deleteNoteFromNotebook,

        // for notebook
        getNotesByNoteIds : getNotesByNoteIds,

        // share note functions
        findAllNotesReceivedByUser: findAllNotesReceivedByUser,
        userReceivesNote: userReceivesNote,
        shareNoteWithUser:shareNoteWithUser,
        deleteReceivedNoteForUser: deleteReceivedNoteForUser

    };

    return api;

    function deleteNoteFromNotebook(noteId, notebookId){

        return Notebook.update(
            { _id: notebookId },
            { $pull: { 'notes': { $in: [noteId]} } }
        );
    }

    function removeLikedUser(userId, noteId){

        return Note.update(
            { _id: noteId },
            { $pull: { 'likes': { $in: [userId]} } }
        );
    }


    function userLikesNote(userId, note){
        var deferred = q.defer();

        // find the note by noteId
        Note.findOne({_id: note._id},

            function (err, doc) {

                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }

                // if there's a note
                if (doc) {
                    // add user to likes
                    doc.likes.push (userId);
                    // save changes
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function findNotesByIds(noteIds){

        var deferred = q.defer();

        // find all users in array of user IDs
        Note.find({
            _id: {$in: noteIds}
        }, function (err, notes) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(notes);
            }
        });

        return deferred.promise;
    }

    function deleteNoteById(noteId){

        return Note.findByIdAndRemove(noteId);
    }

    function findAllNotesForUser(userId){

        return Note.find({
            createdBy : userId
        });
    }

    function findNoteById(noteId){

        return Note.findById(noteId);
    }

    function updateNoteById(noteId, newNote){

        return Note.findByIdAndUpdate(noteId, newNote);
    }

    function createNote(newNote){

        return Note.create(newNote);

    }

    function getMongooseModel() {

        return Note
    }

    function deleteReceivedNoteForUser(noteId, userId) {

        return User.update(
            { _id: userId },
            { $pull: { 'receivesNotes': { _id : noteId } } }
        );

    }

    function shareNoteWithUser(note, userId){

        return User.findById(userId)
            .then(
                function(user){
                    user.receivesNotes.push(note);
                    return user.save();
                }
            );
    }

    function userReceivesNote(userId, note){
        var deferred = q.defer();

        Note.findOne({_id: note._id},

            function (err, doc) {

                if (err) {
                    deferred.reject(err);
                }

                if (doc) {
                    doc.receives.push (userId);
                    // save changes
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function findAllNotesReceivedByUser(userID){

        return Note.find();

    }

    function getNotesByNoteIds(noteIds){

        var deferred = q.defer();

        Note.find({
                _id: {$in: noteIds}
            },
            function (err, users) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }
            });

        return deferred.promise;
    }


};
