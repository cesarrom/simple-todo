"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskRequest = void 0;
const schema_1 = require("@tsed/schema");
const constants_1 = require("../../constants");
const base_request_1 = require("./base.request");
class UpdateTaskRequest extends base_request_1.BaseRequest {
}
__decorate([
    schema_1.Optional(),
    schema_1.MinLength(2),
    __metadata("design:type", String)
], UpdateTaskRequest.prototype, "title", void 0);
__decorate([
    schema_1.Optional(),
    __metadata("design:type", String)
], UpdateTaskRequest.prototype, "description", void 0);
__decorate([
    schema_1.Required(),
    schema_1.Enum(constants_1.TASK_STATUSES),
    __metadata("design:type", String)
], UpdateTaskRequest.prototype, "state", void 0);
exports.UpdateTaskRequest = UpdateTaskRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXRhc2sucmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9yZXF1ZXN0cy91cGRhdGUtdGFzay5yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFtRTtBQUNuRSwrQ0FBZ0Q7QUFDaEQsaURBQTZDO0FBRTdDLE1BQWEsaUJBQWtCLFNBQVEsMEJBQThCO0NBU3BFO0FBTkM7SUFGQyxpQkFBUSxFQUFFO0lBQ1Ysa0JBQVMsQ0FBQyxDQUFDLENBQUM7O2dEQUNDO0FBRWQ7SUFEQyxpQkFBUSxFQUFFOztzREFDUztBQUdwQjtJQUZDLGlCQUFRLEVBQUU7SUFDVixhQUFJLENBQUMseUJBQWEsQ0FBQzs7Z0RBQ0E7QUFSdEIsOENBU0MifQ==