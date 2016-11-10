import {Api,ApiEdgeDefinition} from "api-core";
const requireDirectory = require("require-directory");

export class EdgeProvider {

    private api: Api;

    constructor(api: Api) {
        this.api = api
    }

    include(edge: ApiEdgeDefinition) {
        this.api.edge(edge)
    }

    includeDir(path: string) {
        requireDirectory(module, path, {
            include: '/.js$/',
            visit: (edge: ApiEdgeDefinition) => {
                this.include(edge)
            }
        });
    }

}
