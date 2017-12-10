/**
 * Created by paulomimahidharia on 4/17/16.
 */

(function() {

    angular
        .module("NoteSpace")
        .controller("YouTubeController", YouTubeController);

    function YouTubeController($http, $sce, WidgetService, $routeParams, $location) {

        var vm =this;

        vm.SafeYoutubeUrl = SafeYoutubeUrl;
        vm.addVideo = addVideo;
        vm.searchVideo = searchVideo;

        var noteId = $routeParams.noteId;
        var widgetId = $routeParams.widgetId;
        var keyword;

        function init(){

            if(widgetId){

                console.log(widgetId);

                //Edit mode
                WidgetService.getWidgetById(noteId, widgetId)
                    .then(
                        function(response){

                            var widget = response.data;
                            vm.widget = widget;

                            searchVideo(widget);
                        }
                    );

            }

        }
        init();

        function searchVideo(widget){
            console.log(widget);

            keyword = widget.youtube.keyword;
            console.log(keyword);

            $http.get("https://www.googleapis.com/youtube/v3/search?part=snippet" +
                "&maxResults=10&q="+keyword+"&key=AIzaSyBId_35KFQKeZoRy-aRDZxma65PqdmkUI8")
                .then(
                    function(response){
                        console.log(response);

                        var videos = response.data.items;

                        console.log(videos);

                        var videoURLs =[];

                        for(var i in videos){
                            videoURLs.push("http://www.youtube.com/embed/"+videos[i].id.videoId);
                        }

                        document.getElementById('searchResults').style.display = 'inline';

                        vm.urls = videoURLs;
                    },
                    function (err){
                        console.log(err);
                    }
                );
        }



        function addVideo($index){

            var widgetURL = vm.urls[$index];

            var widget = {
                widgetType : "YOUTUBE",
                youtube : {
                    keyword: keyword,
                    url: widgetURL
                }
            };

            if(widgetId){

                //Update widget

                WidgetService.updateWidget(noteId, widgetId, widget)
                    .then(
                        function(response){
                            $location.url("/editnote/"+noteId);
                        }
                    );

            }
            else {

                //Add Widget

                WidgetService.addWidget(noteId, widget)
                    .then(
                        function(response){
                            $location.url("/editnote/"+noteId);
                        }
                    );
            }



        }

        function  SafeYoutubeUrl(url){

            return $sce.trustAsResourceUrl(url);
        }

    }
})();