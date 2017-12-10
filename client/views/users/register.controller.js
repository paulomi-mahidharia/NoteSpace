/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("NoteSpace")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService){

        var vm = this;
        vm.register = register;

        function register(user) {

           if (user) {

               user.emails = contructArrayOfEmails(user.emails);

                UserService.createUser(user)
                    .then(function (newUser) {

                        var currentUser = newUser.config.data;

                        if(currentUser!=null){

                            UserService.setCurrentUser(currentUser);
                            $location.url("/profile/");
                        }
                    });
            }
            else {

                alert("Please fill the required fields!");
            }
        }

        function contructArrayOfEmails(emails){

            return emails.trim().split(",");
        }
    }
})();