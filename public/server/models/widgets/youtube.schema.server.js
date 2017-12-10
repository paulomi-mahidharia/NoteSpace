/**
 * Created by paulomimahidharia on 4/8/16.
 */
module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var YoutubeSchema = mongoose.Schema({
        keyword : String,
        url: String
        // collection property sets
        // collection name to 'user'
    }, {collection: 'project.youtube'});

    return YoutubeSchema;
};