"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const method_override_1 = __importDefault(require("method-override"));
const constants_1 = require("./constants");
const middlewares_1 = require("./middlewares");
exports.default = (rootDir) => ({
    rootDir,
    acceptMimes: ["application/json"],
    port: constants_1.ENVIRONMENT.PORT,
    eventEmitter: {
        enabled: true,
        wildcard: true,
    },
    mount: {
        "/p/v1": [`${rootDir}/controllers/**/*.*`],
    },
    swagger: [
        {
            doc: "api-v3",
            path: "/v3/docs",
            specVersion: "3.0.1",
            "specPath": `${rootDir}/../swagger.base.json`
        },
    ],
    responseFilters: [middlewares_1.WrapperResponseFilter],
    componentsScan: [`${rootDir}/**/*.*`],
    logger: {
        debug: true,
    },
    middlewares: [
        cors_1.default({
            origin: ["http://127.0.0.1:4200", "http://localhost:4200"],
            optionsSuccessStatus: 200,
        }),
        cookie_parser_1.default(),
        compression_1.default({}),
        method_override_1.default(),
        body_parser_1.default.json({
            limit: "10mb",
        }),
        body_parser_1.default.urlencoded({
            limit: "10mb",
            extended: true,
        }),
    ],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXItY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQXdCO0FBQ3hCLDhEQUFxQztBQUNyQyw4REFBbUM7QUFDbkMsa0VBQXlDO0FBQ3pDLHNFQUE2QztBQUM3QywyQ0FBMEM7QUFDMUMsK0NBQXNEO0FBRXRELGtCQUFlLENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FDakMsQ0FBQztJQUNDLE9BQU87SUFDUCxXQUFXLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztJQUNqQyxJQUFJLEVBQUUsdUJBQVcsQ0FBQyxJQUFJO0lBQ3RCLFlBQVksRUFBRTtRQUNaLE9BQU8sRUFBRSxJQUFJO1FBRWIsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELEtBQUssRUFBRTtRQUNMLE9BQU8sRUFBRSxDQUFDLEdBQUcsT0FBTyxxQkFBcUIsQ0FBQztLQUMzQztJQUNELE9BQU8sRUFBRTtRQUNQO1lBQ0UsR0FBRyxFQUFFLFFBQVE7WUFDYixJQUFJLEVBQUUsVUFBVTtZQUNoQixXQUFXLEVBQUUsT0FBTztZQUNwQixVQUFVLEVBQUUsR0FBRyxPQUFPLHVCQUF1QjtTQUM5QztLQUNGO0lBQ0QsZUFBZSxFQUFFLENBQUMsbUNBQXFCLENBQUM7SUFDeEMsY0FBYyxFQUFFLENBQUMsR0FBRyxPQUFPLFNBQVMsQ0FBQztJQUNyQyxNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUUsSUFBSTtLQUNaO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsY0FBSSxDQUFDO1lBQ0gsTUFBTSxFQUFFLENBQUMsdUJBQXVCLEVBQUUsdUJBQXVCLENBQUM7WUFDMUQsb0JBQW9CLEVBQUUsR0FBRztTQUMxQixDQUFDO1FBQ0YsdUJBQVksRUFBRTtRQUNkLHFCQUFRLENBQUMsRUFBRSxDQUFDO1FBQ1oseUJBQWMsRUFBRTtRQUNoQixxQkFBVSxDQUFDLElBQUksQ0FBQztZQUNkLEtBQUssRUFBRSxNQUFNO1NBQ2QsQ0FBQztRQUNGLHFCQUFVLENBQUMsVUFBVSxDQUFDO1lBQ3BCLEtBQUssRUFBRSxNQUFNO1lBQ2IsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDO0tBQ0g7Q0FDTSxDQUFBLENBQUMifQ==