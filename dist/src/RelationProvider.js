"use strict";
const api_core_1 = require("api-core");
const ApiEdgeRelationDescription_1 = require("./ApiEdgeRelationDescription");
const requireDirectory = require("require-directory");
class RelationProvider {
    constructor(api) {
        this.api = api;
    }
    processEdgeName(edgeName) {
        const edge = this.api.edges.find((edge) => edge.name == edgeName);
        if (!edge)
            throw "Missing Edge: " + edgeName;
        return edge;
    }
    processRelationDescription(description) {
        let relations = [];
        const from = this.processEdgeName(description.fromName), to = this.processEdgeName(description.toName);
        switch (description.type) {
            case ApiEdgeRelationDescription_1.ApiEdgeRelationType.OneToOne:
                relations.push(new api_core_1.OneToOneRelation(from, to, {
                    relationId: description.relationId,
                    relatedId: description.relatedId,
                    name: description.relatedName
                }));
                break;
            case ApiEdgeRelationDescription_1.ApiEdgeRelationType.OneToMany:
            case ApiEdgeRelationDescription_1.ApiEdgeRelationType.ManyToMany:
                relations.push(new api_core_1.OneToManyRelation(from, to, {
                    relationId: description.relationId,
                    relatedId: description.relatedId,
                    name: description.relatedName
                }));
                break;
            default:
                throw "Unsupported Description Type";
        }
        if (description.twoWay) {
            if (description.type === ApiEdgeRelationDescription_1.ApiEdgeRelationType.ManyToMany) {
                relations.push(new api_core_1.OneToManyRelation(to, from, {
                    relatedId: description.relationId,
                    relationId: description.relatedId,
                    name: description.relationName
                }));
            }
            else {
                relations.push(new api_core_1.OneToOneRelation(to, from, {
                    relatedId: description.relationId,
                    relationId: description.relatedId,
                    name: description.relationName
                }));
            }
        }
        return relations;
    }
    include(relation) {
        if (relation instanceof ApiEdgeRelationDescription_1.ApiEdgeRelationDescription) {
            this.processRelationDescription(relation)
                .forEach((relation) => this.api.relation(relation));
        }
        else {
            this.api.relation(relation);
        }
    }
    includeDir(path) {
        requireDirectory(module, path, {
            include: '/.js$/',
            visit: (relation) => {
                this.include(relation);
            }
        });
    }
}
exports.RelationProvider = RelationProvider;
//# sourceMappingURL=RelationProvider.js.map