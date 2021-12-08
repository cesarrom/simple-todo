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
const logger_1 = require("../../services/logger");
const location = "Commit After Transaction Middleware";
let CommitAfterTransactionMiddleware = class CommitAfterTransactionMiddleware {
    constructor(transaction, log) {
        this.transaction = transaction;
        this.log = log;
    }
    async use(next) {
        this.log.info({
            location,
            message: 'Committing all DB changes for this request'
        });
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
    __metadata("design:paramtypes", [database_client_1.DatabaseClient,
        logger_1.LoggerService])
], CommitAfterTransactionMiddleware);
exports.CommitAfterTransactionMiddleware = CommitAfterTransactionMiddleware;
const CommitTransactionAfter = () => {
    return core_1.useDecorators(common_1.UseAfter(CommitAfterTransactionMiddleware), common_1.Scope(common_1.ProviderScope.REQUEST));
};
exports.CommitTransactionAfter = CommitTransactionAfter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWl0LWFmdGVyLXRyYW5zYWN0aW9uLm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWlkZGxld2FyZXMvY29tbWl0LWFmdGVyLXRyYW5zYWN0aW9uL2NvbW1pdC1hZnRlci10cmFuc2FjdGlvbi5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQU9zQjtBQUN0QixxQ0FBMkM7QUFDM0MseUdBQW1GO0FBQ25GLG1FQUErRDtBQUMvRCxrREFBc0Q7QUFFdEQsTUFBTSxRQUFRLEdBQUcscUNBQXFDLENBQUM7QUFHdkQsSUFBYSxnQ0FBZ0MsR0FBN0MsTUFBYSxnQ0FBZ0M7SUFFM0MsWUFDVSxXQUEyQixFQUMzQixHQUFrQjtRQURsQixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFDM0IsUUFBRyxHQUFILEdBQUcsQ0FBZTtJQUU1QixDQUFDO0lBRU0sS0FBSyxDQUFDLEdBQUcsQ0FDTixJQUFzQjtRQUU5QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNaLFFBQVE7WUFDUixPQUFPLEVBQUUsNENBQTRDO1NBQ3RELENBQUMsQ0FBQztRQUVILE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUVyQyxPQUFPLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7Q0FDRixDQUFBO0FBWkM7SUFDRyxXQUFBLGFBQUksRUFBRSxDQUFBOzs7OzJEQVVSO0FBbkJVLGdDQUFnQztJQUQ1QyxnREFBYSxDQUFDLG1CQUFVLENBQUM7cUNBSUQsZ0NBQWM7UUFDdEIsc0JBQWE7R0FKakIsZ0NBQWdDLENBb0I1QztBQXBCWSw0RUFBZ0M7QUFzQnRDLE1BQU0sc0JBQXNCLEdBQUcsR0FBRyxFQUFFO0lBQ3pDLE9BQU8sb0JBQWEsQ0FDbEIsaUJBQVEsQ0FBQyxnQ0FBZ0MsQ0FBQyxFQUMxQyxjQUFLLENBQUMsc0JBQWEsQ0FBQyxPQUFPLENBQUMsQ0FDN0IsQ0FBQztBQUNKLENBQUMsQ0FBQTtBQUxZLFFBQUEsc0JBQXNCLDBCQUtsQyJ9