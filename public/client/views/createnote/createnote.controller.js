/**
 * Created by paulomimahidharia on 4/15/16.
 */
/**
 * Created by paulomimahidharia on 3/25/16.
 */
(function() {
    angular
        .module("NoteSpace")
        .controller("CreateNoteController", CreateNoteController);

    function CreateNoteController(NoteService, $rootScope, $location) {

        var vm = this;

        function init() {

            NoteService
                .findAllNoteBooksForUser($rootScope.currentUser._id)
                .then(
                    function (response){
                        vm.notebooks = response.data;
                    }
                );

        }
        init();

        vm.addNote = addNote;

        function addNote(note) {

            if (note.notebook == null) {

                alert("You should have a notebook to which this note belongs!");
                $location.url("/createnote");
            }


            var currentUser = $rootScope.currentUser;
            var currentUserId = currentUser._id;

            var noteId;

            note.createdBy = currentUser;
            note.createdDate = new Date();

            NoteService
                .selectNoteBookById(note.notebook)
                .then(
                    function (response) {

                        var createNote = {
                            createdBy: note.createdBy,
                            createdDate: note.createdDate,
                            title: note.title,
                            notebook: response.data.name,
                            notebookId: note.notebook
                        };

                        return NoteService
                            .createNoteForUser(currentUserId, createNote);
                    }
                )
                .then(
                    function (response) {

                        noteId = response.data._id;

                        console.log(response.data);

                        return NoteService.addNoteToNotebook(noteId, note.notebook);

                    })
                .then(
                    function (notebook) {

                        $location.url("/editnote/" + noteId);
                    }
                );

            vm.widget = {};

        }
    }
})();