import { Api, ApiEdgeRelation } from "api-core";
import { ApiEdgeRelationDescription } from "./ApiEdgeRelationDescription";
export declare class RelationProvider {
    private api;
    constructor(api: Api);
    private processEdgeName(edgeName);
    private processRelationDescription(description);
    include(relation: ApiEdgeRelation | ApiEdgeRelationDescription): void;
    includeDir(path: string): void;
}
