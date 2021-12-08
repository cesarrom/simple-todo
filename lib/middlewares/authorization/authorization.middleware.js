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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.AuthorizationMiddleware = void 0;
const common_1 = require("@tsed/common");
const core_1 = require("@tsed/core");
const services_1 = require("../../services");
const transactional_service_annotation_1 = require("../../annotations/transactional-service.annotation");
const exceptions_1 = require("@tsed/exceptions");
const schema_1 = require("@tsed/schema");
const logger_1 = require("../../services/logger");
const location = "Authorization Middleware";
let AuthorizationMiddleware = class AuthorizationMiddleware {
    constructor(authenticationService, log) {
        this.authenticationService = authenticationService;
        this.log = log;
    }
    async use(req, res, next) {
        this.log.info({
            location,
            message: 'Verifying request authorization'
        });
        const { authorization = "" } = req.headers;
        if (!authorization) {
            throw new exceptions_1.Exception(401, "Not Authorized");
        }
        const token = authorization.replace("Bearer ", "");
        if (!token) {
            return res
                .status(401)
                .json({ message: "Authorization token not provided" })
                .end();
        }
        const session = await this.authenticationService.tokenToSession(token);
        Object.assign(req, {
            session,
        });
        return next();
    }
};
__decorate([
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __param(2, common_1.Next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthorizationMiddleware.prototype, "use", null);
AuthorizationMiddleware = __decorate([
    transactional_service_annotation_1.Transactional(common_1.Middleware),
    __metadata("design:paramtypes", [services_1.AuthenticationService, logger_1.LoggerService])
], AuthorizationMiddleware);
exports.AuthorizationMiddleware = AuthorizationMiddleware;
function Auth() {
    return core_1.useDecorators(common_1.UseAuth(AuthorizationMiddleware), schema_1.In("authorization").Type(String).Description("Bearer authorization"), schema_1.Security("oidc"));
}
exports.Auth = Auth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbi5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21pZGRsZXdhcmVzL2F1dGhvcml6YXRpb24vYXV0aG9yaXphdGlvbi5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFnRjtBQUNoRixxQ0FBMkM7QUFFM0MsNkNBQXVEO0FBQ3ZELHlHQUFtRjtBQUNuRixpREFBNkM7QUFDN0MseUNBQTRDO0FBQzVDLGtEQUFzRDtBQUV0RCxNQUFNLFFBQVEsR0FBRywwQkFBMEIsQ0FBQztBQUc1QyxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQUNsQyxZQUFvQixxQkFBNEMsRUFBVSxHQUFrQjtRQUF4RSwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBZTtJQUFHLENBQUM7SUFDekYsS0FBSyxDQUFDLEdBQUcsQ0FDUCxHQUFlLEVBQ2YsR0FBZ0IsRUFDZixJQUFnQjtRQUV4QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNaLFFBQVE7WUFDUixPQUFPLEVBQUUsaUNBQWlDO1NBQzNDLENBQUMsQ0FBQztRQUVILE1BQU0sRUFBRSxhQUFhLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUUzQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxzQkFBUyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1NBQzVDO1FBRUQsTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFbkQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU8sR0FBRztpQkFDUCxNQUFNLENBQUMsR0FBRyxDQUFDO2lCQUNYLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxDQUFDO2lCQUNyRCxHQUFHLEVBQUUsQ0FBQztTQUNWO1FBRUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZFLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ2pCLE9BQU87U0FDUixDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7Q0FDRixDQUFBO0FBakNDO0lBQ0csV0FBQSxZQUFHLEVBQUUsQ0FBQTtJQUNMLFdBQUEsWUFBRyxFQUFFLENBQUE7SUFDTCxXQUFBLGFBQUksRUFBRSxDQUFBOzs7O2tEQTZCUjtBQWxDVSx1QkFBdUI7SUFEbkMsZ0RBQWEsQ0FBQyxtQkFBVSxDQUFDO3FDQUVtQixnQ0FBcUIsRUFBZSxzQkFBYTtHQURqRix1QkFBdUIsQ0FtQ25DO0FBbkNZLDBEQUF1QjtBQW9DcEMsU0FBZ0IsSUFBSTtJQUNsQixPQUFPLG9CQUFhLENBQ2xCLGdCQUFPLENBQUMsdUJBQXVCLENBQUMsRUFDaEMsV0FBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsRUFDcEUsaUJBQVEsQ0FBQyxNQUFNLENBQUMsQ0FDakIsQ0FBQztBQUNKLENBQUM7QUFORCxvQkFNQyJ9