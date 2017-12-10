/**
 * Created by paulomimahidharia on 4/17/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .controller("ImageController", imageController );




    function imageController($routeParams, WidgetService, $location){

        var vm = this;

        vm.addImage = addImage;

        vm.noteId = $routeParams.noteId;

        var noteId = vm.noteId;

        function init(){

            var widgetId = $routeParams.widgetId;


            if(widgetId){

                //console.log(widgetId);

                vm.widgetId = widgetId;

                document.getElementById('imageEdit').style.display = 'inline';

                WidgetService
                    .getWidgetById(noteId, widgetId)
                    .then(
                        function(response){

                            vm.widget = response.data;

                        }
                    );


            }

        }
        init();

        function addImage(widget){

            var widget = {
                widgetType : "IMAGE",
                image : {
                    url : widget.image.url
                }
            };

            WidgetService
                .addWidget(noteId, widget)
                .then(
                    function(response){
                        $location.url("/editnote/"+noteId);
                    }
                );
        }
    }
})();
