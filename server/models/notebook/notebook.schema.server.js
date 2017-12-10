/**
 * Created by anvitasurapaneni on 4/11/16.
 */

module.exports = function(mongoose) {

    var NoteSchema = require("../note/note.schema.server.js")(mongoose);
   // var UserSchema = require("../user/user.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var NotebookSchema = mongoose.Schema({
        name: String,
        description: String,
        notes: [String],
        createdBy: String,
        createdDate: String
        // collection property set
        // collection name to 'user'
    }, {collection: 'project.notebook'});
    return NotebookSchema;
};

