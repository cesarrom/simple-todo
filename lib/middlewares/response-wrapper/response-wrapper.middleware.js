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
exports.WrapperResponseFilter = void 0;
const common_1 = require("@tsed/common");
const logger_1 = require("../../services/logger");
const entity_utils_1 = require("../../utils/entity-utils");
const location = "Wrapper Response Filter";
let WrapperResponseFilter = class WrapperResponseFilter {
    constructor(log) {
        this.log = log;
    }
    transform(data, ctx) {
        this.log.info({
            location,
            message: "post processing response before sending it"
        });
        if (typeof data !== "object")
            return data;
        const result = JSON.parse(JSON.stringify(data));
        if ("_refId" in result) {
            result.id = entity_utils_1.extractId(result);
        }
        return result;
    }
};
WrapperResponseFilter = __decorate([
    common_1.ResponseFilter("*/*"),
    __metadata("design:paramtypes", [logger_1.LoggerService])
], WrapperResponseFilter);
exports.WrapperResponseFilter = WrapperResponseFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2Utd3JhcHBlci5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21pZGRsZXdhcmVzL3Jlc3BvbnNlLXdyYXBwZXIvcmVzcG9uc2Utd3JhcHBlci5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUE4RTtBQUM5RSxrREFBc0Q7QUFDdEQsMkRBQXFEO0FBRXJELE1BQU0sUUFBUSxHQUFHLHlCQUF5QixDQUFBO0FBRzFDLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBQ2hDLFlBQW9CLEdBQWtCO1FBQWxCLFFBQUcsR0FBSCxHQUFHLENBQWU7SUFBRyxDQUFDO0lBQzFDLFNBQVMsQ0FBQyxJQUFTLEVBQUUsR0FBWTtRQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNaLFFBQVE7WUFDUixPQUFPLEVBQUUsNENBQTRDO1NBQ3RELENBQUMsQ0FBQztRQUVILElBQUksT0FBTyxJQUFJLEtBQUssUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRTFDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWhELElBQUksUUFBUSxJQUFJLE1BQU0sRUFBRTtZQUN0QixNQUFNLENBQUMsRUFBRSxHQUFHLHdCQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0I7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0YsQ0FBQTtBQWxCWSxxQkFBcUI7SUFEakMsdUJBQWMsQ0FBQyxLQUFLLENBQUM7cUNBRUssc0JBQWE7R0FEM0IscUJBQXFCLENBa0JqQztBQWxCWSxzREFBcUIifQ==