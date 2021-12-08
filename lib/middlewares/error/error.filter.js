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
exports.ErrorFilter = void 0;
const common_1 = require("@tsed/common");
const logger_1 = require("../../services/logger");
const location = "Error Filter";
let ErrorFilter = class ErrorFilter {
    constructor(log) {
        this.log = log;
    }
    catch(exception, ctx) {
        this.log.info({
            location,
            message: "handling error",
            payload: {
                exception,
            },
        });
        const { response } = ctx;
        const error = this.mapError(exception);
        const headers = this.getHeaders(exception);
        this.log.error({
            location,
            message: error.message
        });
        response
            .setHeaders(headers)
            .status(error.status || 500)
            .body(error);
    }
    mapError(error) {
        var _a;
        return {
            name: ((_a = error.origin) === null || _a === void 0 ? void 0 : _a.name) || error.name,
            message: error.message,
            status: error.status || 500,
            errors: this.getErrors(error),
        };
    }
    getErrors(error) {
        return [error, error.origin]
            .filter(Boolean)
            .reduce((errs, { errors }) => {
            return [...errs, ...(errors || [])];
        }, []);
    }
    getHeaders(error) {
        return [error, error.origin]
            .filter(Boolean)
            .reduce((obj, { headers }) => {
            return {
                ...obj,
                ...(headers || {}),
            };
        }, {});
    }
};
ErrorFilter = __decorate([
    common_1.Catch(Error),
    __metadata("design:paramtypes", [logger_1.LoggerService])
], ErrorFilter);
exports.ErrorFilter = ErrorFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21pZGRsZXdhcmVzL2Vycm9yL2Vycm9yLmZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FLc0I7QUFFdEIsa0RBQXNEO0FBRXRELE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQztBQUdoQyxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBQ3RCLFlBQW9CLEdBQWtCO1FBQWxCLFFBQUcsR0FBSCxHQUFHLENBQWU7SUFBRyxDQUFDO0lBRTFDLEtBQUssQ0FBQyxTQUFvQixFQUFFLEdBQW9CO1FBQzlDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ1osUUFBUTtZQUNSLE9BQU8sRUFBRSxnQkFBZ0I7WUFDekIsT0FBTyxFQUFFO2dCQUNQLFNBQVM7YUFDVjtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDekIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTNDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ2IsUUFBUTtZQUNSLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztTQUN2QixDQUFDLENBQUE7UUFFRixRQUFRO2FBQ0wsVUFBVSxDQUFDLE9BQU8sQ0FBQzthQUNuQixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUM7YUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBVTs7UUFDakIsT0FBTztZQUNMLElBQUksRUFBRSxDQUFBLE1BQUEsS0FBSyxDQUFDLE1BQU0sMENBQUUsSUFBSSxLQUFJLEtBQUssQ0FBQyxJQUFJO1lBQ3RDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztZQUN0QixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sSUFBSSxHQUFHO1lBQzNCLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztTQUM5QixDQUFDO0lBQ0osQ0FBQztJQUVTLFNBQVMsQ0FBQyxLQUFVO1FBQzVCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQzthQUN6QixNQUFNLENBQUMsT0FBTyxDQUFDO2FBQ2YsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUF1QixFQUFFLEVBQUU7WUFDaEQsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRVMsVUFBVSxDQUFDLEtBQVU7UUFDN0IsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDO2FBQ3pCLE1BQU0sQ0FBQyxPQUFPLENBQUM7YUFDZixNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQXVCLEVBQUUsRUFBRTtZQUNoRCxPQUFPO2dCQUNMLEdBQUcsR0FBRztnQkFDTixHQUFHLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQzthQUNuQixDQUFDO1FBQ0osQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztDQUNGLENBQUE7QUF0RFksV0FBVztJQUR2QixjQUFLLENBQUMsS0FBSyxDQUFDO3FDQUVjLHNCQUFhO0dBRDNCLFdBQVcsQ0FzRHZCO0FBdERZLGtDQUFXIn0=