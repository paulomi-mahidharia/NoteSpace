/**
 * Created by paulomimahidharia on 3/30/16.
 */
module.exports = function(mongoose) {

    var NoteSchema = require("../note/note.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        photo : String,
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],

        // note ids of notes this user likes
        likes: [String],
        facebook:   {
            id:    String,
            token: String
        },
        // movies this user likes
        likesNotes: [NoteSchema],

        //NodeIds of received notes
        receives: [String],

        //GroupIds for which the user is an admin
        userIsAdminOfGroup:[String],

        //GroupIds for which the user is a member
        userIsMemberOfGroup:[String],

        //Notes received by the user
        receivesNotes:[NoteSchema]

        // collection property sets
        // collection name to 'user'
    }, {collection: 'project.user'});

    return UserSchema;
};