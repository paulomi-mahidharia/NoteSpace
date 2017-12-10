/**
 * Created by paulomimahidharia on 4/6/16.
 */
module.exports = function(mongoose) {

    var WidgetSchema = require("../widgets/widget.schema.server.js")(mongoose);

    //var NotebookSchema = require("../notebook/notebook.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var NoteSchema = mongoose.Schema({
        title: String,
        notebook: String,
        notebookId : String,
        createdBy: String,

        // ids of users that receive this note
        receives: [String],

        // ids of users that like this note
        likes: [String],
        createdDate: String,
        updatedDate: String,
        widgets: [WidgetSchema]

        // collection property sets
        // collection name to 'user'
    }, {collection: 'project.note'});

    return NoteSchema;
};