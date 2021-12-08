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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthenticationController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const common_1 = require("@tsed/common");
const middlewares_1 = require("../middlewares");
const services_1 = require("../services");
const crypto_1 = require("../utils/crypto");
const schema_1 = require("@tsed/schema");
const user_sign_up_request_1 = require("./requests/user-sign-up.request");
const swagger_1 = require("@tsed/swagger");
const user_login_request_1 = require("./requests/user-login.request");
let AuthenticationController = AuthenticationController_1 = class AuthenticationController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(userInformation) {
        return this.authService.signUp(userInformation);
    }
    async refreshSession(authorizationToken) {
        return { jwt: crypto_1.renewJwt(authorizationToken.replace("Bearer ", "")) };
    }
    async login(body) {
        const session = await this.authService.generateUserSession(body.email, body.password);
        return {
            jwt: this.authService.sessionToToken(session),
            user: session.user,
        };
    }
};
AuthenticationController.BASE_PATH = "/auth";
AuthenticationController.REFRESH_SESSION_PATH = "/refresh";
AuthenticationController.LOGIN_PATH = "/login";
AuthenticationController.SIGN_UP_PATH = "/sign-up";
__decorate([
    common_1.Post(AuthenticationController_1.SIGN_UP_PATH),
    schema_1.Status(201),
    __param(0, common_1.BodyParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_sign_up_request_1.UserSignUpRequest]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "signUp", null);
__decorate([
    common_1.Get(AuthenticationController_1.REFRESH_SESSION_PATH),
    __param(0, common_1.HeaderParams("Authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "refreshSession", null);
__decorate([
    common_1.Post(AuthenticationController_1.LOGIN_PATH),
    __param(0, common_1.BodyParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_request_1.UserLoginRequest]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "login", null);
AuthenticationController = AuthenticationController_1 = __decorate([
    common_1.Controller(AuthenticationController_1.BASE_PATH),
    swagger_1.Docs("api-v3"),
    middlewares_1.CommitTransactionAfter(),
    __metadata("design:paramtypes", [services_1.AuthenticationService])
], AuthenticationController);
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9hdXRoZW50aWNhdGlvbi5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBK0U7QUFDL0UsZ0RBQThEO0FBQzlELDBDQUFvRDtBQUNwRCw0Q0FBMkM7QUFDM0MseUNBQXNDO0FBQ3RDLDBFQUFvRTtBQUNwRSwyQ0FBcUM7QUFDckMsc0VBQWlFO0FBS2pFLElBQWEsd0JBQXdCLGdDQUFyQyxNQUFhLHdCQUF3QjtJQU1uQyxZQUFvQixXQUFrQztRQUFsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBdUI7SUFBRyxDQUFDO0lBRzFELEtBQUssQ0FBQyxNQUFNLENBQWUsZUFBa0M7UUFDM0QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBR0QsS0FBSyxDQUFDLGNBQWMsQ0FDYSxrQkFBMEI7UUFFekQsT0FBTyxFQUFFLEdBQUcsRUFBRSxpQkFBUSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3RFLENBQUM7SUFHRCxLQUFLLENBQUMsS0FBSyxDQUFlLElBQXNCO1FBQzlDLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FDeEQsSUFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsUUFBUSxDQUNkLENBQUM7UUFFRixPQUFPO1lBQ0wsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztZQUM3QyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7U0FDbkIsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBL0J3QixrQ0FBUyxHQUFHLE9BQU8sQ0FBQztBQUNwQiw2Q0FBb0IsR0FBRyxVQUFVLENBQUM7QUFDbEMsbUNBQVUsR0FBRyxRQUFRLENBQUM7QUFDdEIscUNBQVksR0FBRyxVQUFVLENBQUM7QUFLakQ7SUFGQyxhQUFJLENBQUMsMEJBQXdCLENBQUMsWUFBWSxDQUFDO0lBQzNDLGVBQU0sQ0FBQyxHQUFHLENBQUM7SUFDRSxXQUFBLG1CQUFVLEVBQUUsQ0FBQTs7cUNBQWtCLHdDQUFpQjs7c0RBRTVEO0FBR0Q7SUFEQyxZQUFHLENBQUMsMEJBQXdCLENBQUMsb0JBQW9CLENBQUM7SUFFaEQsV0FBQSxxQkFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFBOzs7OzhEQUcvQjtBQUdEO0lBREMsYUFBSSxDQUFDLDBCQUF3QixDQUFDLFVBQVUsQ0FBQztJQUM3QixXQUFBLG1CQUFVLEVBQUUsQ0FBQTs7cUNBQU8scUNBQWdCOztxREFVL0M7QUEvQlUsd0JBQXdCO0lBSHBDLG1CQUFVLENBQUMsMEJBQXdCLENBQUMsU0FBUyxDQUFDO0lBQzlDLGNBQUksQ0FBQyxRQUFRLENBQUM7SUFDZCxvQ0FBc0IsRUFBRTtxQ0FPVSxnQ0FBcUI7R0FOM0Msd0JBQXdCLENBZ0NwQztBQWhDWSw0REFBd0IifQ==