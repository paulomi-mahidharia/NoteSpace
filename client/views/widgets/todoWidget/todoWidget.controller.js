/**
 * Created by anvitasurapaneni on 2/12/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .controller("ToDoController", toDoController);

    function toDoController(WidgetService, $routeParams, $location){

        var vm = this;

        var tasks = [];

        var selectedIndex = -1;

        var noteId = $routeParams.noteId;
        var widgetId = $routeParams.widgetId;

        // event handlers decleration
        vm.addToDo = addToDo;
        vm.deleteToDo = deleteToDo;
        vm.selectToDo = selectToDo;
        vm.updateToDo = updateToDo;

        // Note specifice event handlers

        vm.addTodoToNote = addTodoToNote;
        vm.updateTodoToNote = updateTodoToNote;

        function init(){

            if(widgetId){

                document.getElementById("addTodo").style.display = 'none';

                WidgetService
                    .getWidgetById(noteId, widgetId)
                    .then(
                        function(response){

                            console.log(response.data);
                            vm.widget = response.data;
                        }
                    );
            }
            else{

                document.getElementById("updateTodo").style.display = 'none';
            }

        }
        init();

        // event handlers implementation
        function addToDo(widget) {

            if(widget.todo.title){

                tasks.push(widget.todo.task);
                vm.widget.todo.tasks = tasks;

                widget.todo.task = null;
            }
            else {
                alert("Enter a title for your tasks!");
                widget.todo.task = null;
            }


        }

        function deleteToDo($index){

            vm.widget.todo.tasks.splice($index, 1);

        }

        function  selectToDo($index)
        {
            var selectedTask = vm.widget.todo.tasks[$index];
            vm.widget.todo.task = selectedTask;

            selectedIndex = $index;
        }

        function  updateToDo(widget)
        {
            vm.widget.todo.tasks[selectedIndex] = widget.todo.task;
            selectedIndex = -1;

            vm.widget.todo.task = null;
        }

        // Note specific event handlers

        function addTodoToNote(widget){

            var widget = {
                widgetType : "TODO",
                todo : {
                    title : widget.todo.title,
                    tasks : widget.todo.tasks
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

        function updateTodoToNote(widget){

            var widget = {
                widgetType : "TODO",
                todo : {
                    title : widget.todo.title,
                    tasks : widget.todo.tasks
                }
            };

            WidgetService
                .updateWidget(noteId, widgetId, widget)
                .then(
                    function(response){

                        $location.url("/editnote/"+noteId);
                    }
                );
        }

    }
})();
