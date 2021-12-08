import { from } from "env-var";
import { noop } from "lodash";
import { join } from "path";
import loadEnv from "./utils/load-env";

loadEnv(join(__dirname, "../"));

const env = from(process.env, {}, noop);

export const enum GENERAL_STATUSES {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
}

export enum TASK_STATUSES {
  TODO = "todo",
  IN_PROGRESS = "in progress",
  DONE = "done",
  ARCHIVED = "archived",
}

export const TABLE_ID_SEPARATOR = "__";

export const ENVIRONMENT = {
  HOST: env.get("HOST").asString(),
  NODE_ENV: env.get("NODE_ENV").default("development").asString(),
  REQUEST_TIMEOUT: env.get("REQUEST_TIMEOUT").default(40000).asFloat(),
  JWT_EXPIRES_IN: env.get("JWT_EXPIRES_IN").default("1h").asString(),
  JWT_SECRET: env.get("JWT_SECRET").required().asString(),
  ENCRYPTION_KEY: env.get("ENCRYPTION_KEY").required().asString(),
  DATABASE_NAME: env.get("DATABASE_NAME").required().asString(),
  DATABASE_PASSWORD: env.get("DATABASE_PASSWORD").default("").asString(),
  DATABASE_HOST: env.get("DATABASE_HOST").required().asString(),
  DATABASE_CERTIFICATE: env.get("DATABASE_CERTIFICATE").default("").asString(),
  TEMP_PASSWORD_DURATION_SECONDS: env
    .get("TEMP_PASSWORD_DURATION_SECONDS")
    .default(600000)
    .asInt(),
  PORT: env.get("PORT").required().asInt(),
};


