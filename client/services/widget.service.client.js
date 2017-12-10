/**
 * Created by paulomimahidharia on 4/13/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            addWidget: addWidget,
            getWidgets: getWidgets,
            getWidgetById: getWidgetById,
            //findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            removeWidget: removeWidget
            //sortWidget: sortWidget
        };

        return api;

        function addWidget(noteId, widget) {

            return $http.post("/api/project/note/" + noteId + "/widget", widget);
        }

        function getWidgets(noteId) {

            return $http.get("/api/application/note/"+noteId+"/widgets");
        }

        function getWidgetById(noteId, widgetId){

            return $http.get("/api/project/note/"+noteId+"/widget/"+widgetId);
        }

        function updateWidget(noteId, widgetId, widget){

            return $http.put("/api/project/note/"+noteId+"/widget/"+widgetId, widget);
        }

        function removeWidget(noteId, widgetId){

            return $http.delete("/api/project/note/"+noteId+"/widget/"+widgetId);
        }
    }
})();