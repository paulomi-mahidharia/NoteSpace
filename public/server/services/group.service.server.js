/**
 * Created by anvitasurapaneni on 4/15/16.
 */

module.exports = function(app, GroupModel, UserModel, uuid){

    app.post("/api/project/group/user/:userId", createGroupForUser);
    app.post("/api/project/group/:groupId/user/:userId", addMemberToGroup);
    app.get("/api/project/group/:groupId", findGroupById);
    app.delete("/api/project/group/:groupId/user/:userId", deleteMemberFromGroup);
    app.get("/api/project/group", findAllGroups);
    app.get("/api/project/group/admin/:userId", getAdminGroups);
    app.get("/api/project/group/member/:userId", getMemberGroups);
    app.delete("/api/project/group/:groupId/unfollow/user/:userId", deleteCurrentMemberFromGroup);
    app.delete("/api/project/group/:id", deleteGroupById);
    app.delete("/api/project/group/:groupId/unfollow1/user/:userId", deleteGroupFromCurrentMember);
    app.get("/api/project/group/members/:groupId", getMembersOfGroup);
    app.put("/api/project/group/:groupId/title/:title", renameGroup);
    app.delete("/api/project/group/:groupId/note/:noteId", deleteNoteFromGroup);


    //share note
    app.post("/api/project/user/group/share/:groupId/note", shareNoteWithGroup);





    function deleteNoteFromGroup(req, res){

        var noteId = req.params.noteId;
        var groupId = req.params.groupId;
        //  console.log(groupId);

        GroupModel.deleteNoteFromGroup(noteId, groupId)
            .then (
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function shareNoteWithGroup(req, res){
        var note = req.body;
        var groupId = req.params.groupId;
        var group =  GroupModel.findGroupById(groupId);

        GroupModel.shareNoteWithGroup(note, groupId)
            .then (
                function (group) {
                    //   console.log(form);
                    res.json (group);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function renameGroup(req,res){
        var groupId = req.params.groupId;
        var title = req.params.title;

        var renameGroup = GroupModel.renameGroup(groupId, title)
            .then(
                function (doc) {

                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {

                    res.status(400).send(err);
                });
    }



    function getMembersOfGroup(req,res){
        var groupId = req.params.groupId;
        var group = null;
        GroupModel.findGroupById(groupId)
            .then(

                // first retrieve the user by user id
                function (doc) {

                    group = doc;
                    GroupModel.getMembersByGroupMemberIds(doc.members)
                        .then(function(response){
                                res.json(response);
                                console.log(response);
                            },
                            function (err){
                                res.status(400).send(err);
                            })
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )

    }




    function deleteGroupById(req, res){

        var groupId = req.params.id;

        group = GroupModel.deleteGroupById(groupId)
            .then(
                function (doc) {

                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {

                    res.status(400).send(err);

                }
            );
    }


    function deleteGroupFromCurrentMember(req, res){

        var userId = req.params.userId;
        var groupId = req.params.groupId;
        console.log(groupId);

        GroupModel.deleteGroupFromCurrentMember(groupId, userId)
            .then (
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    console.log("error deleting1");
                    res.status(400).send(err);
                }
            );
    }



    //  ("/api/project/user/"+userId+"/unfollow/group/"+GroupId)
    function deleteCurrentMemberFromGroup(req, res){

        var userId = req.params.userId;
        var groupId = req.params.groupId;
        //  console.log(groupId);

        GroupModel.deleteCurrentMemberFromGroup(userId, groupId)
            .then (
                function (stats) {
                    console.log("one way server side deleted");
                    res.send(200);
                },
                function (err) {
                    console.log("error deleting");
                    res.status(400).send(err);
                }
            );
    }


    function getMemberGroups(req, res){
        var userId = req.params.userId;
        var user = null;
        console.log("user");
        console.log(userId);
        UserModel.findUserById(userId)
            .then(

                // first retrieve the user by user id
                function (doc) {

                    user = doc;


                    // fetch movies this user likes
                    GroupModel.findGroupsByGroupIDs(doc.userIsMemberOfGroup)
                        .then(function(response){
                                res.json(response);
                                console.log(response);
                            },
                            function (err){
                                res.status(400).send(err);
                            })
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )

    }




    function  getAdminGroups(req, res){
        var userId = req.params.userId;
        var user = null;
        console.log("user");
        console.log(userId);
        UserModel.findUserById(userId)
            .then(

                // first retrieve the user by user id
                function (doc) {

                    user = doc;

                    console.log("console groups "+doc.userIsAdminOfGroup);
                    // fetch movies this user likes
                    GroupModel.findGroupsByGroupIDs(doc.userIsAdminOfGroup)
                        .then(function(response){
                                res.json(response);
                                console.log(response);
                            },
                            function (err){
                                res.status(400).send(err);
                            })
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )

    }


    function findAllGroups(req, res){
        GroupModel.findAllGroups()
            .then(
                function (doc) {

                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteMemberFromGroup(req, res){

        var userId = req.params.userId;
        var groupId = req.params.groupId;

        GroupModel.deleteMemberFromGroup(userId, groupId)
            .then (
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );


    }



    function findGroupById(req, res){

        var groupId = req.params.groupId;
        GroupModel.findGroupById(groupId)
            .then(
                function (doc) {

                    res.json(doc);
                },

                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function addMemberToGroup(req, res) {

        console.log("addMemberToGroup server1");

        var userId = req.params.userId;
        var groupId = req.params.groupId;

        GroupModel
            .addMemberToGroup(userId, groupId)
            .then(
                function (doc) {
                    groupId = doc._id;

                    editedGroup = doc;

                    return GroupModel.userIsMemberOfGroup(userId);

                }
            )
            .then(
                function (user) {

                    user.userIsMemberOfGroup.push(groupId);

                    user.save();

                    res.json(editedGroup);
                }
            );
    }






    /*    .then(
                     function (doc) {
                         console.log(doc);
                         doc.members.push(userId);
                         doc.save();

                         console.log(doc);
                         res.json(doc);
                     },

                     // send error if promise rejected
                     function ( err ) {

                         res.status(400).send(err);
                     }
             );




         } */


    function createGroupForUser(req,res){

        var group = req.body;

        var userId = req.params.userId;

        var groupId;

        var createdGroup;


        GroupModel.createGroupForUser(group)
            .then(
                function (doc) {
                    groupId = doc._id;

                    createdGroup = doc;

                    return GroupModel.userIsAdminOfGroup(userId);

                }
            )
            .then(
                function (user) {

                    user.userIsAdminOfGroup.push(groupId);

                    user.save();

                    res.json(createdGroup);
                }
            );

    }


};