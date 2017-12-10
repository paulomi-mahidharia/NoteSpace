/**
 * Created by paulomimahidharia on 2/12/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .controller("NoteController", NoteController);

    function NoteController(NoteService, $rootScope, $location, UserService){

        var vm = this;

        vm.deleteNote = deleteNote;
        vm.editNote = editNote;
        vm.toggleFavorite = toggleFavorite;
        vm.isNoteInFavourites = isNoteInFavourites;
        vm.previewNote = previewNote;
        vm.shareNote = shareNote;

        function init() {

            console.log($rootScope.currentUser._id);

            NoteService
                .findAllNotesForUser($rootScope.currentUser._id)

                .then(function (foundNotes) {

                    var favNotes = [];

                    vm.notes = foundNotes.data;

                    console.log(foundNotes.data);

                    vm.$location = $location;
                });

            NoteService
                .findAllNoteBooksForUser($rootScope.currentUser._id)

                .then(function (foundNoteBooks){

                    vm.notebooks = foundNoteBooks.data;
                    vm.$location = $location;
                });

            NoteService
                .findAllNotesReceivedByUser($rootScope.currentUser._id)

                .then(function (foundNotes) {

                    var favNotes = [];

                    vm.foundNotes = foundNotes.data;
                    //console.log(vm.notes);

                    vm.$location = $location;
                });
        }
        init();

        // event handlers implementation

        function deleteNote($index){
            var noteId = vm.notes[$index]._id;

            NoteService.deleteNoteById(noteId)
                .then(function(response) {

                    if(response) {
                        vm.notes = response;



                        init();
                    }
            });
        }

        function editNote($index){

            var noteId = vm.notes[$index]._id;

            $location.url("/editnote/"+noteId);
        }

        //Like and dislike notes by clicking on it alternatively
        function toggleFavorite($index){

            var note = vm.notes[$index];
            var noteId = note._id;

            var currentUser = $rootScope.currentUser;
            var currentUserId = currentUser._id;

            var userLikesNote = note.likes.indexOf(currentUserId);

            if(userLikesNote >= 0) {

                //If note is liked, dislike it

                //Remove the given note from note likes
                note.likes.splice(userLikesNote, 1);

                //Remove the given note from user likes
                currentUser.likes.splice($index, 1);

                //Save all changes to the databases
                UserService.removeLikedNote(currentUserId, noteId)
                    .then(function(response){

                        //console.log(response);
                        if(response.data == "OK"){

                            return NoteService.removeLikedUser(currentUserId, noteId);
                        }
                    })
                    .then(function(response){
                        if(response.data == "OK"){

                            console.log("Done");
                        }
                    });


            } else {

                //If note is not liked

                //Push the given note from note likes
                note.likes.push(currentUserId);

                //Push the given note from user likes
                currentUser.likes.push(noteId);

                NoteService.findNoteById(noteId)
                    .then(function(response){
                        if(response) {

                            var foundNote = response.data;

                            NoteService
                                .userLikesNote(currentUserId, foundNote);
                        }
                    });
            }
        }

        function isNoteInFavourites(favourites, note) {

            var noteId = note._id;
            for(var i in favourites) {
                if(favourites[i] === noteId)
                    return true;
            }
            return false;
        }

        function previewNote($index){

            var noteId = vm.notes[$index]._id;
            $location.url('/previewnote/'+noteId);
        }

        //share note

        function shareNote($index){
            var noteId = vm.notes[$index]._id;

            $location.url("/sharenote/"+noteId);
        }
    }


})();
