/**
 * Created by paulomimahidharia on 3/4/16.
 */


(function() {
    angular
        .module("NoteSpace")
        .controller("FileUploadController", FileUploadController);

    function FileUploadController($routeParams, WidgetService, $location) {

        var vm = this;

        vm.noteId = $routeParams.noteId;

        var noteId = vm.noteId;

        vm.addFile = addFile;

        //console.log(vm.noteId);

        function init(){

            var widgetId = $routeParams.widgetId;

            if(widgetId){

                //console.log(widgetId);

                vm.widgetId = widgetId;

                document.getElementById('fileEdit').style.display = 'inline';

                WidgetService
                    .getWidgetById(noteId, widgetId)
                    .then(
                        function(response){

                            //console.log(response);

                            vm.widget = response.data;

                            //console.log(vm.widget);

                            //console.log(vm.widgetId);
                        }
                    );


            }

        }
        init();

        function addFile(widget){

                if(widget.upload.name){

                    var widget = {
                        widgetType : "UPLOAD",
                        upload : {
                            url : widget.upload.url,
                            name : widget.upload.name
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
                else{

                    alert("You are missing NAME of the document!")
                }

            }

        }
})();
