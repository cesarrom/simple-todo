"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = void 0;
const di_1 = require("@tsed/di");
const logger_1 = require("@tsed/logger");
class AppLogger {
}
exports.AppLogger = AppLogger;
di_1.registerProvider({
    provide: AppLogger,
    useFactory: () => logger_1.$log,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnRzL2xvZ2dlci5jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQTRDO0FBQzVDLHlDQUdzQjtBQUt0QixNQUFhLFNBQVM7Q0FBRztBQUF6Qiw4QkFBeUI7QUFFekIscUJBQWdCLENBQUM7SUFDZixPQUFPLEVBQUUsU0FBUztJQUNsQixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBSTtDQUN2QixDQUFDLENBQUMifQ==