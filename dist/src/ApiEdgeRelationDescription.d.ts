export declare enum ApiEdgeRelationType {
    OneToOne = 0,
    OneToMany = 1,
}
export declare class ApiEdgeRelationDescription {
    relationName: string;
    relatedName: string;
    relationId: string;
    relatedId: string;
    fromName: string;
    toName: string;
    type: ApiEdgeRelationType;
    twoWay: boolean;
    constructor(type: ApiEdgeRelationType, fromName: string, toName: string, twoWay: boolean);
}
