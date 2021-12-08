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
exports.UserSignUpRequest = void 0;
const schema_1 = require("@tsed/schema");
const base_request_1 = require("./base.request");
class UserSignUpRequest extends base_request_1.BaseRequest {
}
__decorate([
    schema_1.Required(),
    schema_1.Email(),
    __metadata("design:type", String)
], UserSignUpRequest.prototype, "email", void 0);
__decorate([
    schema_1.Required(),
    schema_1.MinLength(1),
    __metadata("design:type", String)
], UserSignUpRequest.prototype, "name", void 0);
__decorate([
    schema_1.Required(),
    schema_1.MinLength(6),
    __metadata("design:type", String)
], UserSignUpRequest.prototype, "password", void 0);
exports.UserSignUpRequest = UserSignUpRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1zaWduLXVwLnJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvcmVxdWVzdHMvdXNlci1zaWduLXVwLnJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQTBEO0FBQzFELGlEQUE2QztBQUU3QyxNQUFhLGlCQUFrQixTQUFRLDBCQUE4QjtDQVVwRTtBQVBDO0lBRkMsaUJBQVEsRUFBRTtJQUNWLGNBQUssRUFBRTs7Z0RBQ007QUFHZDtJQUZDLGlCQUFRLEVBQUU7SUFDVixrQkFBUyxDQUFDLENBQUMsQ0FBQzs7K0NBQ0E7QUFHYjtJQUZDLGlCQUFRLEVBQUU7SUFDVixrQkFBUyxDQUFDLENBQUMsQ0FBQzs7bURBQ0k7QUFUbkIsOENBVUMifQ==