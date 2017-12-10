/**
 * Created by paulomimahidharia on 3/9/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .controller("MapController", MapController);

    function MapController($scope, MapService, WidgetService, $routeParams, $location){

        var vm = this;

        $scope.search = search;
        vm.addMap = addMap;
        vm.updateMap = updateMap;
        vm.cancelMap = cancelMap;

        var searchedLocation;

        var lat;
        var lng;
        var noteId = $routeParams.noteId;
        var widgetId = $routeParams.widgetId;
        var placeId;


        function init(){

            if(widgetId){

                //We are in edit mode
                //console.log(widgetId);
                //console.log("In edit");
                WidgetService
                    .getWidgetById(noteId, widgetId)
                    .then(
                        function(response){

                            var location = response.data.map.location;

                            document.getElementById('Autocomplete').value = location;

                            getMapForLocation(location);

                        }
                    );

            }

        }
        init();

        var input = document.getElementById('Autocomplete');


        var autocompleteOrigin = new google.maps.places.Autocomplete(input);

        function search(){

            searchedLocation = document.getElementById('Autocomplete').value;

            getMapForLocation(searchedLocation);

        }

        function getMapForLocation(searchedLocation){

            MapService.findPlaceByName(searchedLocation, function(response){
                //console.log(response);
                $scope.data = response.results;


                lat = response.results[0].geometry.location.lat;
                lng = response.results[0].geometry.location.lng;
                placeId = response.results[0].place_id;

                var myLatLng = {lat: response.results[0].geometry.location.lat,
                    lng: response.results[0].geometry.location.lng};

                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 12,
                    center: myLatLng
                });

                //console.log(map);
                //console.log(myLatLng);

                $scope.map = map;
                $scope.myLatLng = myLatLng;

                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    title: response.results[0].formatted_address
                });
            })

        }

        function addMap(){

            if(lat && lng && searchedLocation){

                var widget = {
                    widgetType : "MAP",
                    map : {
                        lat : lat,
                        lng : lng,
                        location : searchedLocation,
                        placeId : placeId
                    }
                };

                console.log(widget);


                WidgetService.addWidget(noteId, widget)
                    .then(
                        function (response) {
                            console.log(response);
                            $location.url("/editnote/"+noteId);
                        }
                    );
            }
        }

        function updateMap(){

            if(lat && lng && searchedLocation && widgetId){

                var widget = {
                    widgetType : "MAP",
                    map : {
                        lat : lat,
                        lng : lng,
                        location : searchedLocation,
                        placeId : placeId
                    }
                };

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
            else {
                alert("You first need to search this place!");
            }
        }

        function cancelMap(){

            $location.url("/editnote/"+noteId);
        }

    }
})();