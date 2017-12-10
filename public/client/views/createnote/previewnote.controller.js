/**
 * Created by paulomimahidharia on 4/19/16.
 */
(function() {
    angular
        .module("NoteSpace")
        .controller("PreviewNoteController", PreviewNoteController);

    function PreviewNoteController(NoteService, $routeParams, WidgetService, $rootScope, $sce) {

        var vm = this;

        var noteId;

        var userId = $rootScope.currentUser._id;

        vm.trustAsHtml = trustAsHtml;
        vm.getSrc = getSrc;
        vm.safeYouTubeUrl = safeYouTubeUrl;

        function init() {



            noteId = $routeParams.noteId;
            vm.noteId = noteId;

            NoteService.findNoteById(noteId)
                .then(
                    function(response){

                        if(userId != response.data.createdBy){

                            document.getElementById('editbutton').style.display = 'none';
                            document.getElementById('removebutton').style.display = 'none';
                        }

                        vm.widget = response.data;
                    }
                );

            WidgetService.getWidgets(noteId)
                .then(
                    function(response){

                        vm.widgets = response.data;

                    }
                );

            NoteService
                .findAllNoteBooksForUser(userId)
                .then(
                    function (response){

                        vm.notebooks = response.data;
                    }
                )

        }
        init();

        function trustAsHtml(html) {

            return $sce.trustAsHtml(html);
        }

        function getSrc(src){

            return $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?"
                +"key=AIzaSyCf4_tYh0DMPul0ewcyzdK9l5K_jNHDU9Y&q="+src);
        }

        function safeYouTubeUrl(widget) {

            if(widget && widget.youtube) {

                var urlParts = widget.youtube.url.split("/");
                var youTubeId = urlParts[urlParts.length-1];

                return $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+youTubeId);
            }
            return "";
        }

    }
})();