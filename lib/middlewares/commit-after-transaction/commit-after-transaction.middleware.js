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
exports.CommitTransactionAfter = exports.CommitAfterTransactionMiddleware = void 0;
const common_1 = require("@tsed/common");
const core_1 = require("@tsed/core");
const transactional_service_annotation_1 = require("../../annotations/transactional-service.annotation");
const database_client_1 = require("../../clients/database.client");
let CommitAfterTransactionMiddleware = class CommitAfterTransactionMiddleware {
    constructor(transaction) {
        this.transaction = transaction;
    }
    async use(next) {
        await this.transaction.saveAndClose();
        return next();
    }
};
__decorate([
    __param(0, common_1.Next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommitAfterTransactionMiddleware.prototype, "use", null);
CommitAfterTransactionMiddleware = __decorate([
    transactional_service_annotation_1.Transactional(common_1.Middleware),
    __metadata("design:paramtypes", [database_client_1.DatabaseClient])
], CommitAfterTransactionMiddleware);
exports.CommitAfterTransactionMiddleware = CommitAfterTransactionMiddleware;
const CommitTransactionAfter = () => {
    return core_1.useDecorators(common_1.UseAfter(CommitAfterTransactionMiddleware), common_1.Scope(common_1.ProviderScope.REQUEST));
};
exports.CommitTransactionAfter = CommitTransactionAfter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWl0LWFmdGVyLXRyYW5zYWN0aW9uLm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWlkZGxld2FyZXMvY29tbWl0LWFmdGVyLXRyYW5zYWN0aW9uL2NvbW1pdC1hZnRlci10cmFuc2FjdGlvbi5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQU9zQjtBQUN0QixxQ0FBMkM7QUFDM0MseUdBQW1GO0FBQ25GLG1FQUErRDtBQUcvRCxJQUFhLGdDQUFnQyxHQUE3QyxNQUFhLGdDQUFnQztJQUUzQyxZQUNVLFdBQTJCO1FBQTNCLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtJQUVyQyxDQUFDO0lBRU0sS0FBSyxDQUFDLEdBQUcsQ0FDTixJQUFzQjtRQUU5QixNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUE7UUFFckMsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0NBQ0YsQ0FBQTtBQVBDO0lBQ0csV0FBQSxhQUFJLEVBQUUsQ0FBQTs7OzsyREFLUjtBQWJVLGdDQUFnQztJQUQ1QyxnREFBYSxDQUFDLG1CQUFVLENBQUM7cUNBSUQsZ0NBQWM7R0FIMUIsZ0NBQWdDLENBYzVDO0FBZFksNEVBQWdDO0FBZ0J0QyxNQUFNLHNCQUFzQixHQUFHLEdBQUcsRUFBRTtJQUN6QyxPQUFPLG9CQUFhLENBQ2xCLGlCQUFRLENBQUMsZ0NBQWdDLENBQUMsRUFDMUMsY0FBSyxDQUFDLHNCQUFhLENBQUMsT0FBTyxDQUFDLENBQzdCLENBQUM7QUFDSixDQUFDLENBQUE7QUFMWSxRQUFBLHNCQUFzQiwwQkFLbEMifQ==