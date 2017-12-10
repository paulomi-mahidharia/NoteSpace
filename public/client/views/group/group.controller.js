/**
 * Created by anvitasurapaneni on 4/15/16.
 */


(function(){
    angular
        .module("NoteSpace")
        .controller("GroupController", GroupController);

    function GroupController(GroupService, $rootScope, $location, $routeParams, UserService){

        var vm = this;
        vm. userToComapreId = 1;
        vm.createGroupForUser = createGroupForUser;
        vm.addMemberToGroup = addMemberToGroup;
        vm.deleteMemberFromGroup = deleteMemberFromGroup;
        vm.LeaveGroup = LeaveGroup;
        vm.deleteGroup = deleteGroup;
        vm.renameGroup = renameGroup;
        vm.addAdminToGroup = addAdminToGroup;
        vm.deleteNoteFromGroup = deleteNoteFromGroup;

        vm.UserNames = {};
        vm.GroupToEditId = $routeParams.groupId;
        vm.GroupToView = $routeParams.groupIdV;
        vm.currentUser = $rootScope.currentUser;
        var currentGroupAdminId;


        var groupId;
        var userIsAdminGroup1 = {};


        function init() {


            GroupService.getAdminGroups($rootScope.currentUser._id)

                .then(function (allAdminGroups){

                    vm.AdminGroups = allAdminGroups.data;
                });

            GroupService.getMemberGroups($rootScope.currentUser._id)

                .then(function (allMemberGroups){

                    vm.MemberGroups = allMemberGroups.data;

                });



            UserService.findAllUsers()

                .then(function (allUsers){

                    vm.allusers =  allUsers.data;

                    vm.$location = $location;
                });


            if(vm.GroupToEditId != null){

                GroupService.getGroupById(vm.GroupToEditId)

                    .then(function (response) {

                        vm.currentGroup = response.data;

                        $rootScope.currentGroup = response.data;

                        getCurrentGroup();
                    });
            }

            if(vm.GroupToView != null){

                GroupService.getGroupById(vm.GroupToView)

                    .then(function (response) {

                        vm.currentGroup = response.data;

                        $rootScope.currentGroup = response.data;

                        getCurrentGroup();
                    });
            }

        }
        init();

        function deleteNoteFromGroup($index){

            var noteId = vm.currentGroup.receivesNotes[$index]._id;
            var groupId = $rootScope.currentGroup._id;

            GroupService.deleteNoteFromGroup(noteId, groupId)

                .then(function (response) {

                    init();
                });
        }


        function getCurrentGroup(){

            GroupService
                .getGroupById($rootScope.currentGroup._id)

                .then(function (response) {

                    vm.currentGroup = response.data;

                    GroupService
                        .getMembersOfGroup(vm.currentGroup._id)
                        .then(function (response) {

                            vm.usersOfCurrentGroup = response.data;

                        });

                })

        }

        function renameGroup(title){

            GroupService
                .renameGroup($rootScope.currentGroup._id, title)

                .then(function (response) {

                    getCurrentGroup();
            });
        }




        function deleteGroup($index){

            var group = vm.AdminGroups[$index];

            var groupId = group._id;

            GroupService
                .deleteGroupById(groupId)

                .then(function (response) {

                    init();
                });

        }



        function LeaveGroup($index) {

            var group = vm.MemberGroups[$index];
            var userId = $rootScope.currentUser._id;

            var groupId = group._id;

            GroupService
                .deleteCurrentMemberFromGroup(userId, groupId)

                .then(function (response) {
                });


            GroupService
                .deleteGroupFromCurrentMember(groupId, userId)

                .then(function (response) {
                });

                init();
        }


        function deleteMemberFromGroup($index) {


             var userId = vm.currentGroup.members[$index];

             var groupId = $rootScope.currentGroup._id;

                GroupService
                    .deleteCurrentMemberFromGroup(userId, groupId)

                    .then(function (response) {
                });


            GroupService
                .deleteGroupFromCurrentMember(groupId, userId)

                .then(function (response) {

                    getCurrentGroup();
                });
        }

        function addMemberToGroup(user){

            var userId = user._id;

            var groupId = $rootScope.currentGroup._id;

            if(!(vm.currentGroup.members.indexOf(user._id) == -1)) {

                alert("can not add same user again");
            }

            else{

                GroupService
                    .addMemberToGroup(userId, groupId)

                    .then(
                        function (response){

                            getCurrentGroup();
                        }
                    );}




        }


        function createGroupForUser(group){

            if (group != -1){

                var newGroup = {

                    "title": group.title,
                    "adminId": $rootScope.currentUser._id
                };

                GroupService
                    .createGroupForUser($rootScope.currentUser._id, newGroup)

                    .then(function (response) {

                        if(response) {

                            vm.currentGroup = response.data;
                            $rootScope.currentGroup = response.data;

                            init();
                            getCurrentGroup();
                        }
                });
            }
        }

        function addAdminToGroup(){

              var currentUserId = $rootScope.currentUser._id;
              var currentGroupId = $rootScope.currentGroup._id;

            GroupService
                .addMemberToGroup(currentUserId, currentGroupId)

                .then(
                    function (response){

                        getCurrentGroup();
                    }
                );

        }






    }
})();

