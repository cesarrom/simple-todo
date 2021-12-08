"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const base_model_1 = require("./base.model");
class User extends base_model_1.BaseModel {
    constructor(params = {}) {
        super(params, User.tableName);
    }
}
exports.User = User;
User.tableName = "users";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdXNlci5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBaUQ7QUFxQmpELE1BQWEsSUFBSyxTQUFRLHNCQUFTO0lBR2pDLFlBQVksU0FBMEMsRUFBRTtRQUN0RCxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxDQUFDOztBQUxILG9CQVVDO0FBVGUsY0FBUyxHQUFHLE9BQU8sQ0FBQyJ9