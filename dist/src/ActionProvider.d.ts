import { Api, ApiAction } from "api-core";
export declare class ActionProvider {
    private api;
    constructor(api: Api);
    include(action: ApiAction): void;
    includeDir(path: string): void;
}
