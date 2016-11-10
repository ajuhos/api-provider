import {Api,ApiEdgeDefinition,ApiEdgeRelation,ApiAction} from "api-core";
import {RelationProvider} from "./RelationProvider";
import {EdgeProvider} from "./EdgeProvider";
import {ActionProvider} from "./ActionProvider";

export class ApiVersionProvider {

    private api: Api;
    private edgeProvider: EdgeProvider;
    private relationProvider: RelationProvider;
    private actionProvider: ActionProvider;

    constructor(api: Api) {
        this.api = api;
        this.edgeProvider = new EdgeProvider(api);
        this.relationProvider = new RelationProvider(api);
        this.actionProvider = new ActionProvider(api)
    }

    edge(edge: ApiEdgeDefinition): ApiVersionProvider {
        this.edgeProvider.include(edge);
        return this
    }

    edgeDir(path: string): ApiVersionProvider {
        this.edgeProvider.includeDir(path);
        return this
    }

    relation(relation: ApiEdgeRelation): ApiVersionProvider {
        this.relationProvider.include(relation);
        return this
    }

    relationDir(path: string): ApiVersionProvider {
        this.relationProvider.includeDir(path);
        return this
    }

    action(action: ApiAction): ApiVersionProvider {
        this.actionProvider.include(action);
        return this
    }

    actionDir(path: string): ApiVersionProvider {
        this.actionProvider.includeDir(path);
        return this
    }
}
