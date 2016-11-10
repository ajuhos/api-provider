import {Api,ApiEdgeDefinition} from "api-core";
import {ApiVersionProvider} from "./ApiVersionProvider";

export class ApiProvider {

    private apis: Api[] = [];

    version(version: string): ApiVersionProvider {
        const api = new Api(version);
        this.apis.push(api);
        return new ApiVersionProvider(api)
    }

    provide(provider: any) {
        return new provider(this.apis);
    }

}
