/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("NoteSpace")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService, $rootScope){
        var vm = this;

        vm.logout = logout;

        function init() {
            vm.$location = $location;

          //  vm.currentUser = $rootScope.currentUser;

            /*if($rootScope.currentUser.firstName){
                vm.user = $rootScope.currentUser.firstName;
            }
            else{
                vm.user = $rootScope.currentUser.username;
            }*/
        }
        init();

        function logout() {

            UserService
                .logout()
                .then(function(user){
                    UserService.setCurrentUser(null);
                   vm.currentUser = null;
                    $location.url("/home");
                });

        }
    }
})();