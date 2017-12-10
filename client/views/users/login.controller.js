/**
 * Created by paulomimahidharia on 2/19/16.
 */
"use strict";
(function(){
    angular
        .module("NoteSpace")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService){

        var vm = this;

        vm.login = login;

        function init(){

        }

        function login(user) {

            if (user) {

                UserService.login(user)
                    .then(function (response) {

                        // Error alert if the user does not exist in database OR
                        // Credentials entered are invalid and do not match with any entry in the database

                        if(response.data == null){

                            user.username = null;
                            user.password = null;
                            alert("Invalide credentials! Try again");
                        }

                        // When the response has a valid user data existing in the database

                        else if (response) {

                            UserService.setCurrentUser(response.data);
                            $location.url("/profile");
                        }

                    },
                    function(err){

                        alert("Invalid credentials entered OR You are not a member of NoteSpace. Create Account to continue!");
                        $location.url("/register");
                    });
            }
            else {

                alert("Enter required fields!");
            }


        }
    }
})();