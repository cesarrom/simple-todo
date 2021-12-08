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
exports.UserLoginRequest = void 0;
const schema_1 = require("@tsed/schema");
const base_request_1 = require("./base.request");
class UserLoginRequest extends base_request_1.BaseRequest {
}
__decorate([
    schema_1.Required(),
    schema_1.Email(),
    __metadata("design:type", String)
], UserLoginRequest.prototype, "email", void 0);
__decorate([
    schema_1.Required(),
    schema_1.MinLength(6),
    __metadata("design:type", String)
], UserLoginRequest.prototype, "password", void 0);
exports.UserLoginRequest = UserLoginRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1sb2dpbi5yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXJzL3JlcXVlc3RzL3VzZXItbG9naW4ucmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBMEQ7QUFDMUQsaURBQTZDO0FBRTdDLE1BQWEsZ0JBQWlCLFNBQVEsMEJBQTZCO0NBT2xFO0FBSkM7SUFGQyxpQkFBUSxFQUFFO0lBQ1YsY0FBSyxFQUFFOzsrQ0FDTTtBQUdkO0lBRkMsaUJBQVEsRUFBRTtJQUNWLGtCQUFTLENBQUMsQ0FBQyxDQUFDOztrREFDSTtBQU5uQiw0Q0FPQyJ9