/**
 * Created by anvitasurapaneni on 2/12/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .controller("noteBookController", noteBookController);

    function noteBookController(NoteService,$rootScope, $location ){

        var vm = this;
        var  selectedIndex = -1;
        var displayNotebook = {};
        var notebooks1;
      //  var notesList;

        var notebooks = [];

        var user = $rootScope.currentUser;
        var userId = user._id;

        function init() {
            NoteService
                .findAllNoteBooksForUser($rootScope.currentUser._id)

                .then(function (foundNoteBooks){
                    vm.notebooks = foundNoteBooks.data;
                    vm.$location = $location;


                    notebooks = foundNoteBooks.data;

                    var notes = [];







                });






        }
        init();

        // event handlers decleration

        vm.deleteNoteBook = deleteNoteBook;
        vm.selectNoteBook = selectNoteBook;
        vm.updateNoteBook = updateNoteBook;
        vm.addNoteBook = addNoteBook;


        // event handlers implementation

         function deleteNoteBook($index){

            var NBId = vm.notebooks[$index]._id;

            NoteService.deleteNotebookById(NBId)
                .then(function(response) {

                    if(response) {
                        vm.notebooks = response;
                        init();
                    }
                });
        }

        function  selectNoteBook($index)
        {
            var NBId = vm.notebooks[$index]._id;

            NoteService.selectNoteBookById(NBId)
                .then(function(response){

                    if(response){

                        var selectedNoteBook = response.data;

                        vm.notebook =  selectedNoteBook;
                    }
                });
            selectedIndex = $index;
         }

        function updateNoteBook(notebook){

            if (selectedIndex != -1){

                var position = vm.notebooks[selectedIndex];
                var newNB = {

                    "name": notebook.name,
                    "description": notebook.description
                 };


                NoteService.updateNoteBookById(notebook._id,newNB)
                    .then(function (response) {

                        vm.notebooks[selectedIndex] = response.data;

                        vm.selectedIndex = -1;

                        init();
            });

                vm.notebook = null;
        }}


        function addNoteBook(notebook){

            if (notebook != -1){

                var newNB = {
                    "name": notebook.name,
                    "description": notebook.description,
                    "notes": notebook.notes,
                    "createdBy": $rootScope.currentUser._id
                };

                NoteService
                    .addNoteBookForUser($rootScope.currentUser._id, newNB)

                    .then(function (response) {

                        if(response) {

                            vm.notebooks = response;

                            vm.notebook1 = null;
                            init();
                        }
                    });

            }}




    }
})();
