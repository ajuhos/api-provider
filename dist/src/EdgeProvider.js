"use strict";
const requireDirectory = require("require-directory");
class EdgeProvider {
    constructor(api) {
        this.api = api;
    }
    include(edge) {
        this.api.edge(edge);
    }
    includeDir(path) {
        requireDirectory(module, path, {
            include: '/.js$/',
            visit: (edge) => {
                this.include(edge);
            }
        });
    }
}
exports.EdgeProvider = EdgeProvider;
//# sourceMappingURL=EdgeProvider.js.map