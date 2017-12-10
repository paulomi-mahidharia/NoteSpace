/**
 * Created by paulomimahidharia on 4/8/16.
 */
module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var TodoSchema = mongoose.Schema({
        title : String,
        tasks: [String]
        // collection property sets
        // collection name to 'user'
    }, {collection: 'project.todo'});

    return TodoSchema;
};
