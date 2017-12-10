/**
 * Created by paulomimahidharia on 3/25/16.
 */
"use strict";
module.exports = function(app, NoteModel, NotebookModel, UserModel, uuid) {
    //app.post("/api/project/user/:userId/movie/:noteId", userLikesNote);

    //Note api calls
    app.get("/api/project/user/:userId/note/liked", findAllNotesLikedByUser);
    app.delete("/api/project/note/:noteId", deleteNoteById);
    app.get("/api/project/user/:userId/note", findAllNotesForUser);
    app.get("/api/project/note/:noteId", findNoteById);
    app.put("/api/project/note/:noteId", updateNoteById);
    app.post("/api/project/user/:userId/note", createNoteForUser);
    app.post("/api/project/user/:userId/note/:noteId", userLikesNote);
    app.delete("/api/project/note/:noteId/user/:userId", removeLikedUser);
    app.put("/api/project/note/:noteId/notebook/:notebookId", addNoteToNotebook);
    app.delete("/api/project/note/:noteId/notebook/:notebookId", deleteNoteFromNotebook);


    //Notebook api calls
    app.get("/api/project/user/:userId/notebook", findAllNoteBooksForUser);
    app.delete("/api/project/notebook/:NBId", deleteNotebookById);
    app.get("/api/project/notebook/:NBId", selectNoteBookById);
    app.put("/api/project/notebook/:NBId", updateNoteBookById);
    app.post("/api/project/user/:userId/notebook", addNoteBookForUser);
    app.get("/api/project/note/notebookId/:notebookId", findNotebookById);
    app.get("/api/project/note/notebook/:notebookId", getNotesOfNotebook);

    //Share api calls
    app.post("/api/project/user/share/:userId/note", shareNoteWithUser);
    app.get("/api/project/user/:userId/note/received", findAllNotesReceivedByUser);
    app.get("/api/project/user/:userId/note/receive/:noteId", userReceivesNote);
    app.delete("/api/project/user/share/:userId/note/:noteId", deleteReceivedNoteForUser);


    //Note functions

    function addNoteToNotebook(req, res){

        var noteId = req.params.noteId;

        var notebookId = req.params.notebookId;

        NotebookModel
            .selectNoteBookById(notebookId)
            .then(

                function(notebook){

                    notebook.notes.push(noteId);

                    notebook.save();

                    res.json(notebook);
                },
                function (err) {

                    res.status(400).send(err);
                }
            );
    }

    function deleteNoteFromNotebook(req, res){

        var noteId = req.params.noteId;

        var notebookId = req.params.notebookId;

        NoteModel
            .deleteNoteFromNotebook(noteId, notebookId)
            .then(
                function (notebook) {

                    res.json(notebook);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function removeLikedUser(req, res) {

        var note  = req.body;
        var userId = req.params.userId;
        //console.log(userId);
        var noteId = req.params.noteId;
        var newNote;

        NoteModel
            .removeLikedUser(userId, noteId)
            .then(
                function (stats) {

                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function userLikesNote(req, res) {

        var note  = req.body;
        var userId = req.params.userId;
        var noteId = req.params.noteId;
        var newNote;

        NoteModel
            .userLikesNote(userId, note)
            // add user to note likes
            .then(
                function (note) {
                    return UserModel.userLikesNote(userId, note);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add movie to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }



    function findAllNotesLikedByUser(req, res){

        var userId = req.params.userId;
        res.json(NoteModel.findAllNotesLikedByUser(userId));
    }

    function deleteNoteById(req, res){

        var noteId = req.params.noteId;

        NoteModel.deleteNoteById(noteId)
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

    function findAllNotesForUser(req, res){

        var userId = req.params.userId;

        NoteModel.findAllNotesForUser(userId)
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

    function findNoteById(req, res){

        var noteId = req.params.noteId;

        NoteModel.findNoteById(noteId)
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

    function updateNoteById(req, res){

        var noteId = req.params.noteId;
        var newNote = req.body;

        NoteModel.updateNoteById(noteId, newNote)
            .then(
                function (doc) {
                    //console.log(doc);
                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {

                    res.status(400).send(err);
                }
            );
    }

    function createNoteForUser(req, res){

        var note = req.body;
        var userId = req.params.userId;

        note.createdBy = userId;
        note.created = Date.now();

         NoteModel.createNote(note)
            .then(
                function (doc) {
                    //console.log(doc);
                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {

                    res.status(400).send(err);
                }
            );
    }

    //Notebook functions

    function findAllNoteBooksForUser(req, res){

        var userId = req.params.userId;

        NotebookModel.findAllNoteBooksForUser(userId)
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

    function deleteNotebookById(req, res){

        var NBId = req.params.NBId;

        NotebookModel.deleteNotebookById(NBId)
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

    function selectNoteBookById(req, res){

        var NBId = req.params.NBId;

        NotebookModel.selectNoteBookById(NBId)
            .then (
            function (NB) {
                res.json (NB);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function updateNoteBookById(req, res){

        var NBId = req.params.NBId;
        var newNB = req.body;

        NotebookModel.updateNoteBookById(NBId, newNB)
            .then (
            function (NB) {
                console.log(NB);
                res.json (NB);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function  addNoteBookForUser(req, res){

        var userId = req.params.userId;
        var notebook = req.body;

        notebook.createdBy = userId;
        notebook.createdDate = Date.now();

        NotebookModel.createNotebook(notebook)
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

    //Share Note Function
    function deleteReceivedNoteForUser(req, res){

        var userId = req.params.userId;
        var noteId = req.params.noteId;

        NoteModel.deleteReceivedNoteForUser(noteId, userId)
            .then (
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function shareNoteWithUser(req, res){
        console.log("sharing note with user");

        var note = req.body;
        var userId = req.params.userId;

        var user =  UserModel.findUserById(userId);
        console.log(user);

        NoteModel.shareNoteWithUser(note, userId)
            .then (
                function (user) {
                    res.json (user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function findAllNotesReceivedByUser(req,res){

        var userId = req.params.userId;

        res.json(NoteModel.findAllNotesReceivedByUser(userId));

    }


    function userReceivesNote(req, res) {
        var note  = req.body;
        var userId = req.params.userId;
        var noteId = req.params.noteId;
        var newNote;

        NoteModel
            .userReceivesNote(userId, note)
            // add user to note likes
            .then(
                function (note) {
                    return UserModel.userReceivesNote(userId, note);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add movie to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findNotebookById(req, res){

        var notebookId = req.params.notebookId;

        console.log("server NBID"+notebookId);

        NotebookModel.findNotebookById(notebookId)
            .then(
                function (doc) {
                    console.log(doc);
                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {

                    res.status(400).send(err);
                }
            );
    }


    function getNotesOfNotebook(req,res){

        var notebookId = req.params.notebookId;
        var notebook = null;

        NotebookModel.findNotebookById(notebookId)
            .then(

                // first retrieve the user by user id
                function (doc) {

                    notebook = doc;
                    NoteModel.getNotesByNoteIds(doc.notes)
                        .then(function(response){
                                res.json(response);
                                console.log(response);
                            },
                            function (err){
                                res.status(400).send(err);
                            })
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )

    }

};