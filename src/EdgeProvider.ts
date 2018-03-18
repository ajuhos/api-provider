import {Api,ApiEdgeDefinition} from "api-core";
const requireDirectory = require("require-directory");

export class EdgeProvider {

    private api: Api;

    constructor(api: Api) {
        this.api = api
    }

    async include(edge: ApiEdgeDefinition|Promise<ApiEdgeDefinition>) {
        if(edge instanceof Promise) {
            const resolvedEdge = await edge;
            this.api.edge(resolvedEdge)
        }
        else {
            this.api.edge(edge)
        }
    }

    async includeDir(path: string) {
        const hash = requireDirectory(module, path, {
            include: '/.js$/'
        });

        const keys = Object.keys(hash);
        for(let key of keys) {
            await this.include(hash[key])
        }
    }

}
