/**
 * Created by anvitasurapaneni on 4/19/16.
 */


/**
 * Created by anvitasurapaneni on 4/15/16.
 */


(function(){
    angular
        .module("NoteSpace")
        .controller("ViewNotebookController", ViewNotebookController);

    function ViewNotebookController(NoteService, $rootScope, $location, $routeParams, UserService){

        var vm = this;
        vm.viewNotebookId = $routeParams.NotebookId;
        // vm.viewNotebook
        var currentGroupAdminId;


        var groupId;
        var userIsAdminGroup1 = {};


        function init() {

            console.log($routeParams.NotebookId);




            NoteService.findNotebookById($routeParams.NotebookId)

                .then(function (notebook){
                    console.log("nb");
                    console.log(notebook);

                    vm.viewNotebook = notebook.data;
                });

            NoteService.getNotesOfNotebook($routeParams.NotebookId)

                .then(function (notes){
                    console.log("notes of NB");
                    console.log(notes.data);

                    vm.notesOfCurrentNotebook = notes.data;
                });





        }
        init();





    }
})();

