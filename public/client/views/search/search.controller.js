/**
 * Created by anvitasurapaneni on 3/25/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .controller("SearchController", SearchController);

    function SearchController( NoteService, $rootScope, $location) {
        var vm = this;
        vm.search = search;

        function init() {
            //console.log("Init");

            NoteService.findAllNotesForUser($rootScope.currentUser._id)
                .then(function (foundNotes) {
                    //console.log(foundNotes);
                    vm.notes = foundNotes.data;
                    vm.$location = $location;
                    console.log(vm.notes);
                });


        }
        init();

        function search(key){
            vm.searchedNotes = [];
            for(note in vm.notes){
                if(key.substring(vm.notes[note].name)){
                    console.log("n"+vm.notes[note].name);
                    vm.searchedNotes.push(vm.notes[note]);
                }
            }

            console.log(key);
        }

    }
    })();
