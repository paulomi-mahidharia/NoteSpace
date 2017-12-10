/**
 * Created by anvitasurapaneni on 4/15/16.
 */

(function(){
    angular
        .module("NoteSpace")
        .controller("ShareNoteController", ShareNoteController);

    function ShareNoteController( UserService, NoteService, $routeParams, GroupService, $location) {

        var vm = this;
        vm.shareNoteWithUser = shareNoteWithUser;
        vm.shareNoteWithGroup = shareNoteWithGroup;


        function init() {

            noteId = $routeParams.noteId;
            vm.noteId = noteId;

            NoteService.findNoteById(noteId)
                .then(
                    function(response){

                        vm.noteToBeShared = response.data;
                    }
                );

            UserService.findAllUsers()
                .then(function (foundUsers) {

                    vm.toShareUsers = foundUsers.data;
                    vm.$location = $location;
                });


            GroupService.findAllGroups()
                .then(function (foundGroups) {

                    vm.toShareGroups = foundGroups.data;
                    vm.$location = $location;
                });
        }
        init();

        function shareNoteWithGroup(note, group){

            NoteService.shareNoteWithGroup(note, group._id)
                .then(function (response) {

                 });

            for(i=0; i< group.members.length; i++ ){

                NoteService
                    .shareNoteWithUser(note, group.members[i])
                    .then(function (response) {

                    });

            }

            alert("note shared successfully with group");
        }

        function shareNoteWithUser(note, user){

            NoteService
                .shareNoteWithUser(note, user._id)

                .then(function (response) {
                    alert("note shared successfully with user");
                });

        }
    }
})();
