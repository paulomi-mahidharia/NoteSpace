/**
 * Created by anvitasurapaneni on 4/15/16.
 */
module.exports = function(mongoose) {

    var UserSchema = require("../user/user.schema.server.js")(mongoose);
    var NoteSchema = require("../note/note.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var GroupSchema = mongoose.Schema({
        title: String,
        adminId: String,
        members: [String],
        receivesNotes:[NoteSchema]

    }, {collection: 'project.group'});

    return GroupSchema;
};
