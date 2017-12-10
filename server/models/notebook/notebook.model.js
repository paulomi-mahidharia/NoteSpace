/**
 * Created by anvitasurapaneni on 3/25/16.
 */

var q = require("q");

module.exports = function(db, mongoose) {

    var NotebookSchema = require("./notebook.schema.server.js")(mongoose);
    var Notebook = mongoose.model('Notebook', NotebookSchema);

    var api = {
        findAllNoteBooksForUser: findAllNoteBooksForUser,
        deleteNotebookById: deleteNotebookById,
        selectNoteBookById: selectNoteBookById,
        updateNoteBookById: updateNoteBookById,
        createNotebook: createNotebook,
        findNotebookById: findNotebookById,
        getMongooseModel : getMongooseModel
    };

    return api;

    function findAllNoteBooksForUser(userId){

        return Notebook.find({ "createdBy": userId });
    }


    function deleteNotebookById(NBId){

        return Notebook.findByIdAndRemove(NBId);
    }


    function selectNoteBookById(NBId){

        return Notebook.findById(NBId);

    }

    function updateNoteBookById(NBId, newNB){

        return Notebook.findByIdAndUpdate(NBId, newNB);
    }

    function createNotebook(notebook) {

        return Notebook.create(notebook);
    }

    function getMongooseModel(){

        return Notebook;
    }

    function findNotebookById(NBId){

        return Notebook.findById(NBId);

    }


};