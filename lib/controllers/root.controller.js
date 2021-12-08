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
var BaseController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const common_1 = require("@tsed/common");
const swagger_1 = require("@tsed/swagger");
let BaseController = BaseController_1 = class BaseController {
    async heartBeat() {
        return "OK";
    }
};
BaseController.BASE_PATH = "";
BaseController.HEART_BEAT_PATH = "/heart-beat";
__decorate([
    common_1.Get(BaseController_1.HEART_BEAT_PATH),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "heartBeat", null);
BaseController = BaseController_1 = __decorate([
    common_1.Controller(BaseController_1.BASE_PATH),
    swagger_1.Docs("api-v3")
], BaseController);
exports.BaseController = BaseController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL3Jvb3QuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEseUNBQStDO0FBQy9DLDJDQUFxQztBQUlyQyxJQUFhLGNBQWMsc0JBQTNCLE1BQWEsY0FBYztJQU16QixLQUFLLENBQUMsU0FBUztRQUNiLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGLENBQUE7QUFQZSx3QkFBUyxHQUFHLEVBQUUsQ0FBQztBQUNmLDhCQUFlLEdBQUcsYUFBYSxDQUFDO0FBRzlDO0lBREMsWUFBRyxDQUFDLGdCQUFjLENBQUMsZUFBZSxDQUFDOzs7OytDQUduQztBQVJVLGNBQWM7SUFGMUIsbUJBQVUsQ0FBQyxnQkFBYyxDQUFDLFNBQVMsQ0FBQztJQUNwQyxjQUFJLENBQUMsUUFBUSxDQUFDO0dBQ0YsY0FBYyxDQVMxQjtBQVRZLHdDQUFjIn0=