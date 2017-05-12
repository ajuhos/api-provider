import { ApiVersionProvider } from "./ApiVersionProvider";
export declare class ApiProvider {
    private apis;
    version(version: string): ApiVersionProvider;
    provide(provider: any): any;
}
