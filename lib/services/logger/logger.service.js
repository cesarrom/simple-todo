"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const models = __importStar(require("../../models"));
const lodash_1 = require("lodash");
const repositories_1 = require("../../repositories");
const logger_client_1 = require("../../clients/logger.client");
const transactional_service_annotation_1 = require("../../annotations/transactional-service.annotation");
const common_1 = require("@tsed/common");
const async_hook_context_1 = require("@tsed/async-hook-context");
let LoggerService = class LoggerService {
    constructor(auditTrailRepository, logger) {
        this.auditTrailRepository = auditTrailRepository;
        this.logger = logger;
    }
    log(params) {
        var _a;
        const request = (_a = this.$ctx) === null || _a === void 0 ? void 0 : _a.request.getRequest();
        const timestamp = new Date();
        const payload = {
            ...(!!params.payload && params.payload),
            ...(!!request && { requestId: request.id }),
        };
        this.logger[params.level](`[${lodash_1.toUpper(params.location)}] ${params.message}`, payload);
        this.auditTrailRepository.create(new models.AuditTrail({
            ...params,
            timestamp: timestamp.getTime(),
            location: lodash_1.toUpper(params.location || "system"),
            level: lodash_1.toUpper(params.level),
            payload,
        }));
    }
    info(params) {
        this.log({
            ...params,
            level: "info",
        });
    }
    debug(params) {
        this.log({
            ...params,
            level: "debug",
        });
    }
    error(params) {
        this.log({
            ...params,
            level: "error",
        });
    }
    warn(params) {
        this.log({
            ...params,
            level: "warn",
        });
    }
};
__decorate([
    async_hook_context_1.InjectContext(),
    __metadata("design:type", common_1.PlatformContext)
], LoggerService.prototype, "$ctx", void 0);
LoggerService = __decorate([
    transactional_service_annotation_1.Transactional(),
    __metadata("design:paramtypes", [repositories_1.AuditTrailRepository,
        logger_client_1.AppLogger])
], LoggerService);
exports.LoggerService = LoggerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvbG9nZ2VyL2xvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBdUM7QUFDdkMsbUNBQWlDO0FBQ2pDLHFEQUEwRDtBQUMxRCwrREFBd0Q7QUFDeEQseUdBQW1GO0FBQ25GLHlDQUErQztBQUUvQyxpRUFBeUQ7QUFLekQsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUl4QixZQUNVLG9CQUEwQyxFQUMxQyxNQUFpQjtRQURqQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLFdBQU0sR0FBTixNQUFNLENBQVc7SUFDeEIsQ0FBQztJQUVKLEdBQUcsQ0FBQyxNQUtIOztRQUNDLE1BQU0sT0FBTyxHQUFHLE1BQUEsSUFBSSxDQUFDLElBQUksMENBQUUsT0FBTyxDQUFDLFVBQVUsRUFBYyxDQUFDO1FBRTVELE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDN0IsTUFBTSxPQUFPLEdBQUc7WUFDZCxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUN2QyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUM7U0FDNUMsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUN2QixJQUFJLGdCQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFDakQsT0FBTyxDQUNSLENBQUM7UUFFRixJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUM5QixJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDcEIsR0FBRyxNQUFNO1lBQ1QsU0FBUyxFQUFFLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDOUIsUUFBUSxFQUFFLGdCQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUM7WUFDOUMsS0FBSyxFQUFFLGdCQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUM1QixPQUFPO1NBQ1IsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxDQUFDLE1BQTREO1FBQy9ELElBQUksQ0FBQyxHQUFHLENBQUM7WUFDUCxHQUFHLE1BQU07WUFDVCxLQUFLLEVBQUUsTUFBTTtTQUNkLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBNEQ7UUFDaEUsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNQLEdBQUcsTUFBTTtZQUNULEtBQUssRUFBRSxPQUFPO1NBQ2YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUE0RDtRQUNoRSxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ1AsR0FBRyxNQUFNO1lBQ1QsS0FBSyxFQUFFLE9BQU87U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSSxDQUFDLE1BQTREO1FBQy9ELElBQUksQ0FBQyxHQUFHLENBQUM7WUFDUCxHQUFHLE1BQU07WUFDVCxLQUFLLEVBQUUsTUFBTTtTQUNkLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFBO0FBL0RDO0lBREMsa0NBQWEsRUFBRTs4QkFDVCx3QkFBZTsyQ0FBQztBQUZaLGFBQWE7SUFEekIsZ0RBQWEsRUFBRTtxQ0FNa0IsbUNBQW9CO1FBQ2xDLHlCQUFTO0dBTmhCLGFBQWEsQ0FpRXpCO0FBakVZLHNDQUFhIn0=