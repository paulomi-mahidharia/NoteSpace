/**
 * Created by paulomimahidharia on 3/25/16.
 */
"use strict";
(function(){
    angular
        .module("NoteSpace")
        .factory("NoteService", NoteService);

    function NoteService($http, $q) {
        var api = {
            //Note services
            userLikesNote: userLikesNote,
            findAllNotesLikedByUser: findAllNotesLikedByUser,
            deleteNoteById: deleteNoteById,
            findAllNotesForUser: findAllNotesForUser,
            updateNoteById: updateNoteById,
            createNoteForUser: createNoteForUser,
            findNoteById: findNoteById,
            removeLikedUser: removeLikedUser,
            sortWidgets: sortWidgets,
            addNoteToNotebook : addNoteToNotebook,
            deleteNoteFromNotebook : deleteNoteFromNotebook,

            //Notebook services
            deleteNotebookById: deleteNotebookById,
            selectNoteBookById: selectNoteBookById,
            updateNoteBookById: updateNoteBookById,
            addNoteBookForUser: addNoteBookForUser,
            findAllNoteBooksForUser: findAllNoteBooksForUser,
            findNotebookById : findNotebookById,
            getNotesOfNotebook : getNotesOfNotebook,


            // share
            findAllNotesReceivedByUser: findAllNotesReceivedByUser,
            shareNoteWithUser: shareNoteWithUser,
            deleteReceivedNoteForUser: deleteReceivedNoteForUser,
            shareNoteWithGroup: shareNoteWithGroup


        };

        return api;


        function removeLikedUser(userId, noteId){

            return $http.delete("/api/project/note/"+noteId+"/user/"+userId);
        }

        function userLikesNote(userId, note){

            return $http.post("/api/project/user/"+userId+"/note/"+note._id, note);
        }

        function findAllNotesLikedByUser(userId){

            return $http.get("/api/project/user/"+userId+"/note/liked");
        }

        function deleteNoteById(noteId) {

           return $http.delete("/api/project/note/"+noteId);
        }

        function findAllNotesForUser(userId){

            return $http.get("/api/project/user/"+userId+"/note");
        }

        function findNoteById(noteId){

            return $http.get("/api/project/note/"+noteId);
        }

        function updateNoteById(noteId, newNote){

            return $http.put("/api/project/note/"+noteId, newNote);
        }

        function createNoteForUser(userId, newNote){

            return $http.post("/api/project/user/"+userId+"/note", newNote);
        }

        function sortWidgets(noteId, startIndex, endIndex) {

            return $http.put("/api/project/note/"+noteId+"/widget?startIndex="+startIndex+"&endIndex="+endIndex);
        }

        function addNoteToNotebook(noteId, notebookId){

            return $http.put("/api/project/note/"+noteId+"/notebook/"+notebookId);
        }

        function deleteNoteFromNotebook(noteId, notebookId){

            return $http.delete("/api/project/note/"+noteId+"/notebook/"+notebookId);
        }

        ////////////////////////////////////////////////////////////////////
        function deleteNotebookById(NBId){

            return $http.delete("/api/project/notebook/"+NBId);
        }

        function selectNoteBookById(NBId){

            return $http.get("/api/project/notebook/"+NBId);
        }

        function updateNoteBookById(NBId, newNB){

            return $http.put("/api/project/notebook/"+NBId, newNB);
        }

        function addNoteBookForUser(userId,newNB){

            return $http.post("/api/project/user/"+userId+"/notebook/", newNB);
        }

        function findAllNoteBooksForUser(userId){

            return $http.get("/api/project/user/"+userId+"/notebook");
        }

        ///////////////////////////////////////////////////////////////////////

        function shareNoteWithGroup(note, groupId){


            var deferred = $q.defer();

            var url = "/api/project/user/group/share/:groupId/note";

            url = url.replace(":groupId", groupId);

            $http.post(url, note).success(function(response) {

                deferred.resolve(response);
            });

            return deferred.promise;

        }


        function findAllNotesReceivedByUser(userId){

            return $http.get("/api/project/user/"+userId+"/note");

        }

        function shareNoteWithUser(note, userId){


            var deferred = $q.defer();

            var url = "/api/project/user/share/:userId/note";
            url = url.replace(":userId", userId);

            $http.post(url, note).success(function(response) {

                deferred.resolve(response);
            });

            return deferred.promise;

        }

        function deleteReceivedNoteForUser(noteId, userId){

            var deferred = $q.defer();

            var url = "/api/project/user/share/:userId/note/:noteId";
            url = url.replace(":userId", userId);
            url = url.replace(":noteId", noteId);

            $http.delete(url).success(function(response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findNotebookById(NBId){

            return $http.get("/api/project/note/notebookId/"+NBId);
        }

        function  getNotesOfNotebook(notebookId){

            return $http.get("/api/project/note/notebook/"+notebookId);
        }

    }
})();