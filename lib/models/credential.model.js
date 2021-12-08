"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credential = void 0;
const base_model_1 = require("./base.model");
class Credential extends base_model_1.BaseModel {
    constructor(params = {}) {
        super(params, Credential.tableName);
    }
}
exports.Credential = Credential;
Credential.tableName = "credentials";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlZGVudGlhbC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvY3JlZGVudGlhbC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2Q0FBaUQ7QUFVakQsTUFBYSxVQUNYLFNBQVEsc0JBQVM7SUFRakIsWUFBWSxTQUFzRCxFQUFFO1FBQ2xFLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7O0FBWEgsZ0NBWUM7QUFKZSxvQkFBUyxHQUFHLGFBQWEsQ0FBQyJ9