import {Api,ApiInfo,ApiEdgeDefinition,ApiEdgeRelation,ApiAction} from "api-core";
import {RelationProvider} from "./RelationProvider";
import {EdgeProvider} from "./EdgeProvider";
import {ActionProvider} from "./ActionProvider";

export class ApiVersionProvider {

    private api: Api;
    private edgeProvider: EdgeProvider;
    private relationProvider: RelationProvider;
    private actionProvider: ActionProvider;
    private queue: (() => Promise<void>)[] = [];

    constructor(api: Api) {
        this.api = api;
        this.edgeProvider = new EdgeProvider(api);
        this.relationProvider = new RelationProvider(api);
        this.actionProvider = new ActionProvider(api)
    }

    url(url: string): ApiVersionProvider {
        this.api.url = url;
        return this
    }

    info(info: ApiInfo): ApiVersionProvider {
        this.api.info = info;
        return this
    }

    edge(edge: ApiEdgeDefinition|Promise<ApiEdgeDefinition>): ApiVersionProvider {
        this.queue.push(async () => await this.edgeProvider.include(edge));
        return this
    }

    edgeDir(path: string): ApiVersionProvider {
        this.queue.push(async () => await this.edgeProvider.includeDir(path));
        return this
    }

    relation(relation: ApiEdgeRelation): ApiVersionProvider {
        this.queue.push(async () => this.relationProvider.include(relation));
        return this
    }

    relationDir(path: string): ApiVersionProvider {
        this.queue.push(async () => this.relationProvider.includeDir(path));
        return this
    }

    action(action: ApiAction): ApiVersionProvider {
        this.queue.push(async () => this.actionProvider.include(action));
        return this
    }

    actionDir(path: string): ApiVersionProvider {
        this.queue.push(async () => this.actionProvider.includeDir(path));
        return this
    }

    async prepare() {
        while(this.queue.length) {
            const task = this.queue.shift();
            if(task) await task()
        }
        await this.api.prepare();
    }
}
