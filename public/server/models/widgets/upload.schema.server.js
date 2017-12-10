/**
 * Created by paulomimahidharia on 4/8/16.
 */
module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UploadSchema = mongoose.Schema({
        url: String,
        name : String
        // collection property sets
        // collection name to 'user'
    }, {collection: 'project.upload'});

    return UploadSchema;
};
