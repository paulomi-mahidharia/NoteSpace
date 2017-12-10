/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("NoteSpace")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs : "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/header", {
                templateUrl: "views/header/header.view.html",
                controller: "HeaderController",
                controllerAs : "model"
            })
            .when("/note/:noteId/text", {
                templateUrl: "views/widgets/text/text.view.html",
                controller: "TextEditorController",
                controllerAs : "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/note/:noteId/text/:widgetId", {
                templateUrl: "views/widgets/text/edittext.view.html",
                controller: "TextEditorController",
                controllerAs : "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/note/:noteId/map", {
                templateUrl: "views/widgets/googlemap/map.view.html",
                controller: "MapController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/note/:noteId/map/:widgetId", {
                templateUrl: "views/widgets/googlemap/editmap.view.html",
                controller: "MapController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/note/:noteId/fileupload", {
                templateUrl: "views/widgets/fileupload/fileupload.view.html",
                controller: "FileUploadController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/note/:noteId/fileupload/:widgetId", {
                templateUrl: "views/widgets/fileupload/fileupload.view.html",
                controller: "FileUploadController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/note", {
                templateUrl: "views/note/note.view.html",
                controller: "NoteController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/createnote", {
                templateUrl: "views/createnote/createnote.view.html",
                controller: "CreateNoteController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/editnote/:noteId", {
                templateUrl: "views/createnote/editnote.view.html",
                controller: "EditNoteController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/previewnote/:noteId", {
                templateUrl: "views/createnote/previewnote.view.html",
                controller: "PreviewNoteController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/note/:noteId/todo", {
                templateUrl: "views/widgets/todoWidget/todoWidget.view.html",
                controller: "ToDoController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/note/:noteId/todo/:widgetId", {
                templateUrl: "views/widgets/todoWidget/todoWidget.view.html",
                controller: "ToDoController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/note/:noteId/image", {
                templateUrl: "views/widgets/imageWidget/imageWidget.view.html",
                controller: "ImageController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/note/:noteId/image/:widgetId", {
                templateUrl: "views/widgets/imageWidget/imageWidget.view.html",
                controller: "ImageController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/note/:noteId/youtube", {
                templateUrl: "views/widgets/youtubeApiWidget/youtubeApiWidget.view.html",
                controller: "YouTubeController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/note/:noteId/youtube/:widgetId", {
                templateUrl: "views/widgets/youtubeApiWidget/youtubeApiWidget.view.html",
                controller: "YouTubeController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/notebook", {
                templateUrl: "views//notebook/notebook.view.html",
                controller: "noteBookController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs : "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs : "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs : "model"
            })
            .when("/favorites", {
                templateUrl: "views/favorites/favorites.view.html",
                controller: "FavoriteNotesController",
                controllerAs : "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/sidebar", {
                templateUrl: "views/header/sidebar.view.html",
                controller: "HeaderController",
                controllerAs : "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/inbox", {
                templateUrl: "views/inbox/inbox.view.html",
                controller: "InboxController",
                controllerAs : "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/sharenote/:noteId", {
                templateUrl: "views/sharenote/sharenote.view.html",
                controller: "ShareNoteController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/createGroup", {
                templateUrl: "views/group/creategroup.view.html",
                controller: "GroupController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/group", {
                templateUrl: "views/group/group.view.html",
                controller: "GroupController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })

            .when("/group/:groupId/editGroup", {

                templateUrl: "views/group/editGroup.view.html",
                controller: "GroupController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/group/:groupIdV/viewGroup", {

                templateUrl: "views/group/viewGroup.view.html",
                controller: "GroupController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/notebook/:NotebookId/viewNotebook", {

                templateUrl: "views/notebook/viewnotebook.view.html",
                controller: "ViewNotebookController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }


    function checkLoggedIn($q, $location, $http, $rootScope, $timeout) {

        var deferred = $q.defer();

        $http.get('/api/project/user/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.currentUser = null;
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/home');
            }
        });

        return deferred.promise;
    }


    function getLoggedIn($q, $http, $rootScope, $timeout) {

        var deferred = $q.defer();

        $http.get('/api/project/user/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;

    }
})();