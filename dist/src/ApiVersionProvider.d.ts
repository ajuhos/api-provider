import { Api, ApiEdgeDefinition, ApiEdgeRelation, ApiAction } from "api-core";
export declare class ApiVersionProvider {
    private api;
    private edgeProvider;
    private relationProvider;
    private actionProvider;
    constructor(api: Api);
    edge(edge: ApiEdgeDefinition): ApiVersionProvider;
    edgeDir(path: string): ApiVersionProvider;
    relation(relation: ApiEdgeRelation): ApiVersionProvider;
    relationDir(path: string): ApiVersionProvider;
    action(action: ApiAction): ApiVersionProvider;
    actionDir(path: string): ApiVersionProvider;
}
