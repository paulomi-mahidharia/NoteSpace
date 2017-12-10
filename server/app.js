module.exports = function(app, uuid, db, mongoose) {

    //Models

    var UserModel   = require("./models/user/user.model.js")(db, mongoose);

    var NotebookModel = require("./models/notebook/notebook.model.js")(db, mongoose);

    var NoteModel = require("./models/note/note.model.js")(db, mongoose, UserModel, NotebookModel);

    var WidgetModel = require("./models/widgets/widget.model.server.js")(db, mongoose, NoteModel);

    var GroupModel   = require("./models/group/group.model.js")(db, mongoose, UserModel);

    //Services

    var UserService = require("./services/user.service.server.js")(app, UserModel, NoteModel, uuid);

    var NoteService = require("./services/note.service.server.js")(app, NoteModel, NotebookModel, UserModel, uuid);

    var WidgetService = require("./services/widget.service.server.js")(app, WidgetModel, uuid);

    var GroupService = require("./services/group.service.server.js")(app, GroupModel, UserModel, NoteModel, uuid);



};