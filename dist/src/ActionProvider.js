"use strict";
const requireDirectory = require("require-directory");
class ActionProvider {
    constructor(api) {
        this.api = api;
    }
    include(action) {
        this.api.actions.unshift(action);
    }
    includeDir(path) {
        requireDirectory(module, path, {
            include: '/.js$/',
            visit: (action) => {
                this.include(action);
            }
        });
    }
}
exports.ActionProvider = ActionProvider;
//# sourceMappingURL=ActionProvider.js.map