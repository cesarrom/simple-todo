"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const uuid_1 = require("uuid");
class Session {
    constructor(param) {
        Object.assign(this, { ...param, requestId: uuid_1.v4() });
    }
}
exports.Session = Session;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvc2Vzc2lvbi5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwrQkFBa0M7QUFPbEMsTUFBYSxPQUFPO0lBRWxCLFlBQVksS0FBNEM7UUFDdEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Q0FJRjtBQVJELDBCQVFDIn0=