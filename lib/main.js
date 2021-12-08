"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.p = exports.bootstrap = exports.bootstrapTsEd = exports.Server = void 0;
const common_1 = require("@tsed/common");
const platform_express_1 = require("@tsed/platform-express");
require("@tsed/ajv");
require("@tsed/swagger");
require("eventemitter2");
require("@tsed/event-emitter");
const server_config_1 = __importDefault(require("./server-config"));
let Server = class Server {
};
Server = __decorate([
    common_1.Configuration(server_config_1.default(__dirname))
], Server);
exports.Server = Server;
const bootstrapTsEd = async () => {
    console.log("starting TS.ED strategy");
    const platform = await platform_express_1.PlatformExpress.bootstrap(Server);
    await platform.listen();
};
exports.bootstrapTsEd = bootstrapTsEd;
const bootstrap = () => {
    const handleError = (err) => {
        console.error(err);
        throw err;
    };
    try {
        return exports.bootstrapTsEd().catch(handleError);
    }
    catch (e) {
        handleError(e);
    }
};
exports.bootstrap = bootstrap;
exports.p = exports.bootstrap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUE2QztBQUM3Qyw2REFBeUQ7QUFDekQscUJBQW1CO0FBQ25CLHlCQUF1QjtBQUN2Qix5QkFBdUI7QUFDdkIsK0JBQTZCO0FBRzdCLG9FQUEyQztBQUczQyxJQUFhLE1BQU0sR0FBbkIsTUFBYSxNQUFNO0NBQUcsQ0FBQTtBQUFULE1BQU07SUFEbEIsc0JBQWEsQ0FBQyx1QkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0dBQzFCLE1BQU0sQ0FBRztBQUFULHdCQUFNO0FBRVosTUFBTSxhQUFhLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sUUFBUSxHQUFHLE1BQU0sa0NBQWUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFekQsTUFBTSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDMUIsQ0FBQyxDQUFDO0FBTFcsUUFBQSxhQUFhLGlCQUt4QjtBQUVLLE1BQU0sU0FBUyxHQUFHLEdBQUcsRUFBRTtJQUM1QixNQUFNLFdBQVcsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsTUFBTSxHQUFHLENBQUM7SUFDWixDQUFDLENBQUM7SUFFRixJQUFJO1FBQ0YsT0FBTyxxQkFBYSxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQzNDO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDaEI7QUFDSCxDQUFDLENBQUM7QUFYVyxRQUFBLFNBQVMsYUFXcEI7QUFFVyxRQUFBLENBQUMsR0FBRyxpQkFBUyxFQUFFLENBQUMifQ==