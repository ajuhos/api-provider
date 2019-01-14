import {Api, ApiEdgeDefinition, ApiEdgeRelation, OneToManyRelation, OneToOneRelation} from "api-core";
import {ApiEdgeRelationDescription, ApiEdgeRelationType} from "./ApiEdgeRelationDescription";

const requireDirectory = require("require-directory");

export class RelationProvider {

    private api: Api;

    constructor(api: Api) {
        this.api = api
    }

    private processEdgeName(edgeName: string): ApiEdgeDefinition {
        const edge: ApiEdgeDefinition|undefined =
            this.api.edges.find((edge: ApiEdgeDefinition) => edge.name == edgeName);

        if(!edge) throw "Missing Edge: " + edgeName;
        return edge
    }

    private processRelationDescription(description: ApiEdgeRelationDescription): ApiEdgeRelation[] {
        let relations: ApiEdgeRelation[] = [];

        const from = this.processEdgeName(description.fromName),
            to = this.processEdgeName(description.toName);

        const hasPair = description.type === ApiEdgeRelationType.ManyToMany;

        switch(description.type) {
            case ApiEdgeRelationType.OneToOne:
                relations.push(new OneToOneRelation(from, to, {
                    relationId: description.relationId,
                    relatedId: description.relatedId,
                    name: description.relatedName
                }));
                break;
            case ApiEdgeRelationType.OneToMany:
            case ApiEdgeRelationType.ManyToMany:
                relations.push(new OneToManyRelation(from, to, {
                    relationId: description.relationId,
                    relatedId: description.relatedId,
                    name: description.relatedName,
                    hasPair
                }));
                break;
            default:
                throw "Unsupported Description Type";
        }

        if(description.twoWay) {
            if(description.type === ApiEdgeRelationType.ManyToMany) {
                relations.push(new OneToManyRelation(to, from, {
                    relatedId: description.relationId,
                    relationId: description.relatedId,
                    name: description.relationName,
                    hasPair
                }));
            }
            else {
                relations.push(new OneToOneRelation(to, from, {
                    relatedId: description.relationId,
                    relationId: description.relatedId,
                    name: description.relationName
                }));
            }
        }

        return relations
    }

    include(relation: ApiEdgeRelation|ApiEdgeRelationDescription) {
        if(relation instanceof ApiEdgeRelationDescription) {
            this.processRelationDescription(relation)
                .forEach((relation: ApiEdgeRelation) => this.api.relation(relation))
        }
        else {
            this.api.relation(relation)
        }
    }

    includeDir(path: string) {
        requireDirectory(module, path, {
            include: '/.js$/',
            visit: (relation: ApiEdgeRelation|ApiEdgeRelationDescription) => {
                this.include(relation)
            }
        });
    }

}
