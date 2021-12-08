import cors from "cors";
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import { ENVIRONMENT } from "./constants";
import { WrapperResponseFilter } from "./middlewares";

export default (rootDir: string) =>
  ({
    rootDir,
    acceptMimes: ["application/json"],
    port: ENVIRONMENT.PORT,
    eventEmitter: {
      enabled: true, // Enable events for this instance.
      // pass any options that you would normally pass to new EventEmitter2(), e.g.
      wildcard: true,
    },
    mount: {
      "/p/v1": [`${rootDir}/controllers/**/*.*`],
    },
    swagger: [
      {
        doc: "api-v3",
        path: "/v3/docs",
        specVersion: "3.0.1", // by default
        "specPath": `${rootDir}/../swagger.base.json`
      },
    ],
    responseFilters: [WrapperResponseFilter],
    componentsScan: [`${rootDir}/**/*.*`],
    logger: {
      debug: true,
    },
    middlewares: [
      cors({
        origin: ["http://127.0.0.1:4200", "http://localhost:4200"],
        optionsSuccessStatus: 200,
      }),
      cookieParser(),
      compress({}),
      methodOverride(),
      bodyParser.json({
        limit: "10mb",
      }),
      bodyParser.urlencoded({
        limit: "10mb",
        extended: true,
      }),
    ],
  } as any);
