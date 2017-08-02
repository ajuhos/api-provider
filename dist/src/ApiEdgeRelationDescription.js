"use strict";
(function (ApiEdgeRelationType) {
    ApiEdgeRelationType[ApiEdgeRelationType["OneToOne"] = 0] = "OneToOne";
    ApiEdgeRelationType[ApiEdgeRelationType["OneToMany"] = 1] = "OneToMany";
    ApiEdgeRelationType[ApiEdgeRelationType["ManyToMany"] = 2] = "ManyToMany";
})(exports.ApiEdgeRelationType || (exports.ApiEdgeRelationType = {}));
var ApiEdgeRelationType = exports.ApiEdgeRelationType;
class ApiEdgeRelationDescription {
    constructor(type, fromName, toName, twoWay) {
        this.fromName = fromName;
        this.toName = toName;
        this.twoWay = twoWay;
        this.type = type;
    }
}
exports.ApiEdgeRelationDescription = ApiEdgeRelationDescription;
//# sourceMappingURL=ApiEdgeRelationDescription.js.map