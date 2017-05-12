"use strict";
const RelationProvider_1 = require("./RelationProvider");
const EdgeProvider_1 = require("./EdgeProvider");
const ActionProvider_1 = require("./ActionProvider");
class ApiVersionProvider {
    constructor(api) {
        this.api = api;
        this.edgeProvider = new EdgeProvider_1.EdgeProvider(api);
        this.relationProvider = new RelationProvider_1.RelationProvider(api);
        this.actionProvider = new ActionProvider_1.ActionProvider(api);
    }
    edge(edge) {
        this.edgeProvider.include(edge);
        return this;
    }
    edgeDir(path) {
        this.edgeProvider.includeDir(path);
        return this;
    }
    relation(relation) {
        this.relationProvider.include(relation);
        return this;
    }
    relationDir(path) {
        this.relationProvider.includeDir(path);
        return this;
    }
    action(action) {
        this.actionProvider.include(action);
        return this;
    }
    actionDir(path) {
        this.actionProvider.includeDir(path);
        return this;
    }
}
exports.ApiVersionProvider = ApiVersionProvider;
//# sourceMappingURL=ApiVersionProvider.js.map