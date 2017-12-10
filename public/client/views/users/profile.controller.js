/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("NoteSpace")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, $rootScope) {


        var vm = this;

        var user ;

        function init() {

            UserService
                .findUserById($rootScope.currentUser._id)
                .then(function (response) {

                    user = response.data;

                    vm.user = response.data;
                    vm.user.emails = vm.user.emails.join(response.emails);
                    vm.user.phones = vm.user.phones.join(response.phones);

                });

        }


        init();

        vm.update = update;


        function update(user) {

            var updatedContent = {

                _id: $rootScope.currentUser._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                emails : user.emails.trim().split(","),
                phones : user.phones.trim().split(",")

            };


            UserService.updateUser($rootScope.currentUser._id, updatedContent)

                .then(function (user){

                    $rootScope.currentUser = user.config.data;
                });
        }
    }
})();