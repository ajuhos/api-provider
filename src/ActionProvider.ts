import {Api,ApiAction} from "api-core";
const requireDirectory = require("require-directory");

export class ActionProvider {

    private api: Api;

    constructor(api: Api) {
        this.api = api
    }

    include(action: ApiAction) {
        this.api.actions.unshift(action)
    }

    includeDir(path: string) {
        requireDirectory(module, path, {
            include: '/.js$/',
            visit: (action: ApiAction) => {
                this.include(action)
            }
        });
    }

}
