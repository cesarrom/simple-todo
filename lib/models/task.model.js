"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const base_model_1 = require("./base.model");
class Task extends base_model_1.BaseModel {
    constructor(params = {}) {
        super(params, Task.tableName);
    }
}
exports.Task = Task;
Task.tableName = "tasks";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdGFzay5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2Q0FBa0Q7QUFVbEQsTUFBYSxJQUFLLFNBQVEsc0JBQVM7SUFHakMsWUFBWSxTQUEwQyxFQUFFO1FBQ3RELEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7O0FBTEgsb0JBVUM7QUFUZSxjQUFTLEdBQUcsT0FBTyxDQUFDIn0=