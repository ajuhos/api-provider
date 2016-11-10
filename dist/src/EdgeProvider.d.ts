import { Api, ApiEdgeDefinition } from "api-core";
export declare class EdgeProvider {
    private api;
    constructor(api: Api);
    include(edge: ApiEdgeDefinition): void;
    includeDir(path: string): void;
}
