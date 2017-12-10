/**
 * Created by anvitasurapaneni on 4/15/16.
 */


var q = require("q");

module.exports = function(db, mongoose, UserModel) {

    var GroupSchema = require("./group.schema.server.js")(mongoose);
    var Group = mongoose.model('Group', GroupSchema);

    var User = UserModel.getMongooseModel();

    var api = {

        createGroupForUser: createGroupForUser,
        findGroupById :findGroupById,
        addMemberToGroup: addMemberToGroup,
        deleteMemberFromGroup: deleteMemberFromGroup,
        findAllGroups: findAllGroups,
        userIsAdminOfGroup: userIsAdminOfGroup,
        findGroupsByGroupIDs: findGroupsByGroupIDs,
        userIsMemberOfGroup: userIsMemberOfGroup,
        deleteCurrentMemberFromGroup: deleteCurrentMemberFromGroup,
        deleteGroupById: deleteGroupById,
        deleteGroupFromCurrentMember: deleteGroupFromCurrentMember,
        getMembersByGroupMemberIds: getMembersByGroupMemberIds,
        renameGroup: renameGroup,
        shareNoteWithGroup: shareNoteWithGroup,
        deleteNoteFromGroup: deleteNoteFromGroup

    };

    return api;

    function deleteNoteFromGroup(noteId, groupId){

        return Group.update(
            { _id: groupId },
            { $pull: { 'receivesNotes': { _id : noteId } } }
        );
    }

    function shareNoteWithGroup(note, groupId){

        return Group.findById(groupId)
            .then(
                function(group){
                    group.receivesNotes.push(note);
                    return group.save();

                }
            );
    }

    function renameGroup(groupId, newTitle) {

        var deferred = q.defer();

        return Group.update(
            {_id: groupId},
            {
                title: newTitle
            }
        );
    }

    function getMembersByGroupMemberIds(userIds){

        var deferred = q.defer();

        User.find({
            _id: {$in: userIds}
        },
            function (err, users) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }
        });

        return deferred.promise;
    }

    function deleteGroupById(groupId){

        var deferred = q.defer();

        Group.findByIdAndRemove(groupId, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findGroupsByGroupIDs (groupIDs) {

        console.log(" in find groups model");
        console.log(groupIDs);
        var deferred = q.defer();

        // find all movies
        // whose imdb IDs
        // are in imdbIDs array
        Group.find({
            _id: {$in: groupIDs}
        }, function (err, groups) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(groups);
                console.log("server side last step");
                console.log(groups);
            }
        });
        return deferred.promise;
    }

    function userIsAdminOfGroup(adminId){

        return User.findById(adminId);
    }

    function userIsMemberOfGroup(memberId){

        return User.findById(memberId);
    }

    function findAllGroups(){

        return Group.find();
    }

    function deleteGroupFromCurrentMember(groupId, userId){
        console.log("c2");
        return User.update(
            { '_id': userId },
            { '$pull': { 'userIsMemberOfGroup': { '$in' : [groupId] } } }
        );

    }


    function deleteCurrentMemberFromGroup(userId, groupId) {
        console.log("c1");
        return Group.update(
            { '_id': groupId },
            { '$pull': { 'members': { '$in' : [userId] } } }
        );
    }


    function deleteMemberFromGroup(userId, groupId) {
        User.update(
            { _id: userId },
            { $pull: { 'userIsMemberOfGroup': { $in : [groupId] } } }
        );

        return Group.update(
            { _id: groupId },
            { $pull: { 'members': { $in : userId } } }
        );
    }

    function addMemberToGroup(userId, groupId){

        console.log("server group model step2");
        console.log(userId);
        console.log(groupId);

        return   Group.findById(groupId)
            .then(
                function(group){
                    group.members.push(userId);

                    console.log("member pushed");

                    return group.save();

                }
            );
    }




    function findGroupById(groupId){

        var deferred = q.defer();

        Group.findById(groupId, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }



    function createGroupForUser(group) {
        var deferred = q.defer();
         Group.create(group, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

};
