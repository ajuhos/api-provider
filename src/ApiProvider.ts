import {Api,ApiEdgeDefinition} from "api-core";
import {ApiVersionProvider} from "./ApiVersionProvider";

export class ApiProvider {

    private apis: Api[] = [];
    private providers: ApiVersionProvider[] = [];

    version(version: string): ApiVersionProvider {
        const api = new Api(version);
        this.apis.push(api);

        const provider = new ApiVersionProvider(api);
        this.providers.push(provider);

        return provider;
    }

    async provide(provider: any) {
        for(let provider of this.providers) {
            await provider.prepare()
        }

        return new provider(this.apis);
    }

}
