/**
 * Created by paulomimahidharia on 3/3/16.
 */

(function(){
    angular
        .module("NoteSpace")
        .controller("TextEditorController", textEditorController );

    function textEditorController($routeParams, WidgetService, $location){
        var vm = this;

        // event handlers decleration

        vm.addText = addText;
        vm.updateText = updateText;
        vm.cancelText = cancelText;

        var noteId = $routeParams.noteId;

        var widgetId = $routeParams.widgetId;

        function init(){

            if(widgetId){

                WidgetService.getWidgetById(noteId, widgetId)
                    .then(

                      function(response){

                         vm.widget = response.data;
                      }
                    );
            }
        }
        init();



        function addText(widget){

            console.log(widget.html.text);

            if(widget.html.text !== ""){
                widget.widgetType = 'TEXT';

                WidgetService.addWidget(noteId, widget)
                    .then(
                        function (response) {

                            $location.url("/editnote/"+noteId);
                        }
                    );
            }
            else{
                alert("Enter text to continue");
            }
        }

        // event handlers decleration

        function updateText(widget){

            WidgetService
                .updateWidget(noteId, widgetId, widget)
                .then(
                    function(response) {
                        $location.url("/editnote/"+noteId);
                    },
                    function(error) {
                        vm.error = error;
                    }
                );
        }

        function cancelText(){

            $location.url("/editnote/"+noteId);
        }

    }
})();