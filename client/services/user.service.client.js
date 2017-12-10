/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("NoteSpace")
        .factory("UserService", UserService);

    function UserService($http, $rootScope){

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findNoteLikes: findNoteLikes,
            removeLikedNote: removeLikedNote,
            isNoteFavForUser: isNoteFavForUser,
            login: login,
            logout: logout

        };

        return api;

        function isNoteFavForUser(userId, noteId){

            return $http.get("/api/project/user/"+userId+"/note/"+noteId+"/favorite");
        }

        function removeLikedNote(userId, noteId){

            return $http.delete("/api/project/user/"+userId+"/note/"+noteId);
        }

        function getCurrentUser() {

            return $http.get("/api/project/user/loggedin");

        }

        function setCurrentUser(user) {

            $rootScope.currentUser = user;
        }

        function findUserByCredentials(username, password){

            return $http.get("/api/project/user?username="+username+"&password="+password);
        }

        function findAllUsers(){

            return $http.get("/api/project/user");
        }

        function findUserByUsername(username){

            return $http.get("/api/project/user?username="+username);
        }

        function createUser(user){

            return $http.post("/api/project/user",user);
        }

        function deleteUserById(userId) {

            return $http.delete("/api/project/user/"+userId);
        }

        function updateUser(userId, user){

            return $http.put("/api/project/user/"+userId, user);
        }
        function findUserById(userId){

            return $http.get("/api/project/user/"+userId);
        }

        function findNoteLikes(userId){

            return $http.get("/api/project/user/"+userId+"/notes", findNoteLikes);
        }

        function login(user) {

            return $http.post("/api/project/login", user);
        }

        function logout(){

            return $http.post("/api/project/user/logout")
        }



    }
})();
