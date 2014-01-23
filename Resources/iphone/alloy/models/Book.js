exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            title: "TEXT",
            subtitle: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "info",
            idAttribute: "id"
        }
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("book", exports.definition, []);

collection = Alloy.C("book", exports.definition, model);

exports.Model = model;

exports.Collection = collection;