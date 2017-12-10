/**
 * Created by anvitasurapaneni on 4/14/16.
 */

(function(){
    angular
        .module("NoteSpace")
        .controller("InboxController", InboxController);

    function InboxController(NoteService,UserService, $rootScope, $location){

        var vm = this;

        vm.deleteReceivedNoteForUser = deleteReceivedNoteForUser;


        function init() {
            console.log("inbox controller");

            UserService.findUserById($rootScope.currentUser._id)
                .then(function (user) {
                    console.log(user.data);

                    vm.receivedNotes = user.data.receivesNotes;


                    for(i=0; i<vm.receivedNotes.length; i++){
                        UserService.findUserById(vm.receivedNotes[i]._id)
                            .then(function (user1) {
                                console.log(user1.data);
                            });
                    }
                     vm.$location = $location;
                });

             NoteService.findAllNoteBooksForUser($rootScope.currentUser._id)

                .then(function (foundNoteBooks){

                    vm.notebooks = foundNoteBooks.data;
                    vm.$location = $location;
                });

            UserService.findAllUsers()

                .then(function (allUsers){

                    vm.allusers =  allUsers.data;
                    vm.$location = $location;
                })




        }
        init();

        // event handlers implementation

    function deleteReceivedNoteForUser($index){

        var noteId = vm.receivedNotes[$index]._id;

        NoteService.deleteReceivedNoteForUser(noteId, $rootScope.currentUser._id)
            .then(function (response) {
            console.log("remove filed response");
            console.log(response);

            if(response == "OK") {
                init();
            }
        });
    }







    }
})();
