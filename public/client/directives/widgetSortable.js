"use strict";

(function () {

    angular
        .module("widgetSortable", [])
        .directive("widgetSortable", widgetSortable);

    function widgetSortable() {

        //var start = null, end = null;

        function link(scope, element, attributes) {

            var start = null;
            var end   = null;

            $(element)
                .sortable({
                    axis: "y",
                    sort: function(event, ui) {
                        //ui.helper.find("a").hide();
                        start = ui.item.index();
                    },
                    stop: function(event, ui) {
                        //ui.item.find("a").show();
                        end = ui.item.index();
                        if(start >= end) {
                            start--;
                        }
                        scope.widgetSortableCallback({start: start, end: end});
                    }
                });
        }
        return {
            scope: {
                widgetSortableCallback: '&'
            },
            link: link
        };
    }
})();