"use strict";
const api_core_1 = require("api-core");
const ApiVersionProvider_1 = require("./ApiVersionProvider");
class ApiProvider {
    constructor() {
        this.apis = [];
    }
    version(version) {
        const api = new api_core_1.Api(version);
        this.apis.push(api);
        return new ApiVersionProvider_1.ApiVersionProvider(api);
    }
    provide(provider) {
        return new provider(this.apis);
    }
}
exports.ApiProvider = ApiProvider;
//# sourceMappingURL=ApiProvider.js.map