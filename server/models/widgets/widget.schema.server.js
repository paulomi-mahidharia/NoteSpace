/**
 * Created by paulomimahidharia on 4/8/16.
 */
module.exports = function(mongoose) {

    var TextSchema = require("./text.schema.server.js")(mongoose);
    var MapSchema = require("./map.schema.server.js")(mongoose);
    var ImageSchema = require("./image.schema.server.js")(mongoose);
    var YoutubeSchema = require("./youtube.schema.server.js")(mongoose);
    var UploadSchema = require("./upload.schema.server.js")(mongoose);
    var TodoSchema = require("./todo.schema.server.js")(mongoose);


    // use mongoose to declare a user schema
    var WidgetSchema = mongoose.Schema({

        widgetType: {
            type: String,
            enum: ['TEXT', 'MAP', 'IMAGE', 'YOUTUBE', 'UPLOAD', 'TODO']},
        html:TextSchema,
        map:MapSchema,
        image:ImageSchema,
        youtube: YoutubeSchema,
        upload: UploadSchema,
        todo:TodoSchema
        // collection property sets
        // collection name to 'user'
    }, {collection: 'project.widget'});

    return WidgetSchema;
};