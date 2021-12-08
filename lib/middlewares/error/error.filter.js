"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorFilter = void 0;
const common_1 = require("@tsed/common");
let ErrorFilter = class ErrorFilter {
    catch(exception, ctx) {
        const { response } = ctx;
        const error = this.mapError(exception);
        const headers = this.getHeaders(exception);
        console.trace(exception);
        console.trace(error);
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
    common_1.Catch(Error)
], ErrorFilter);
exports.ErrorFilter = ErrorFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21pZGRsZXdhcmVzL2Vycm9yL2Vycm9yLmZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Q0FLc0I7QUFJdEIsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQUN0QixLQUFLLENBQUMsU0FBb0IsRUFBRSxHQUFvQjtRQUM5QyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUzQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckIsUUFBUTthQUNMLFVBQVUsQ0FBQyxPQUFPLENBQUM7YUFDbkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDO2FBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQVU7O1FBQ2pCLE9BQU87WUFDTCxJQUFJLEVBQUUsQ0FBQSxNQUFBLEtBQUssQ0FBQyxNQUFNLDBDQUFFLElBQUksS0FBSSxLQUFLLENBQUMsSUFBSTtZQUN0QyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87WUFDdEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLElBQUksR0FBRztZQUMzQixNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDOUIsQ0FBQztJQUNKLENBQUM7SUFFUyxTQUFTLENBQUMsS0FBVTtRQUM1QixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUM7YUFDekIsTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUNmLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBdUIsRUFBRSxFQUFFO1lBQ2hELE9BQU8sQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVTLFVBQVUsQ0FBQyxLQUFVO1FBQzdCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQzthQUN6QixNQUFNLENBQUMsT0FBTyxDQUFDO2FBQ2YsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUF1QixFQUFFLEVBQUU7WUFDaEQsT0FBTztnQkFDTCxHQUFHLEdBQUc7Z0JBQ04sR0FBRyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7YUFDbkIsQ0FBQztRQUNKLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNYLENBQUM7Q0FDRixDQUFBO0FBMUNZLFdBQVc7SUFEdkIsY0FBSyxDQUFDLEtBQUssQ0FBQztHQUNBLFdBQVcsQ0EwQ3ZCO0FBMUNZLGtDQUFXIn0=