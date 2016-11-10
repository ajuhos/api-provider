export enum ApiEdgeRelationType {
    OneToOne,
    OneToMany
}

export class ApiEdgeRelationDescription {
    relationName: string;
    relatedName: string;
    relationId: string;
    relatedId: string;
    fromName: string;
    toName: string;
    type: ApiEdgeRelationType;
    twoWay: boolean;

    constructor(type: ApiEdgeRelationType, fromName: string, toName: string, twoWay: boolean) {
        this.fromName = fromName;
        this.toName = toName;
        this.twoWay = twoWay;
        this.type = type;
    }
}