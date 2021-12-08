import * as models from "../../models";
import { toUpper } from "lodash";
import { AuditTrailRepository } from "../../repositories";
import { AppLogger } from "../../clients/logger.client";
import { Transactional } from "../../annotations/transactional-service.annotation";
import { PlatformContext } from "@tsed/common";
import { AppRequest } from "../../types";
import { InjectContext } from "@tsed/async-hook-context";

export type LogLevels = "debug" | "info" | "warn" | "error" | "fatal" | "trace";

@Transactional()
export class LoggerService {
  @InjectContext()
  $ctx?: PlatformContext;

  constructor(
    private auditTrailRepository: AuditTrailRepository,
    private logger: AppLogger
  ) {}

  log(params: {
    level: LogLevels;
    location: string;
    message: string;
    payload?: any;
  }) {
    const request = this.$ctx?.request.getRequest<AppRequest>();

    const timestamp = new Date();
    const payload = {
      ...(!!params.payload && params.payload),
      ...(!!request && { requestId: request.id }),
    };
    this.logger[params.level](
      `[${toUpper(params.location)}] ${params.message}`,
      payload
    );

    this.auditTrailRepository.create(
      new models.AuditTrail({
        ...params,
        timestamp: timestamp.getTime(),
        location: toUpper(params.location || "system"),
        level: toUpper(params.level),
        payload,
      })
    );
  }

  info(params: { location: string; message: string; payload?: any }) {
    this.log({
      ...params,
      level: "info",
    });
  }

  debug(params: { location: string; message: string; payload?: any }) {
    this.log({
      ...params,
      level: "debug",
    });
  }

  error(params: { location: string; message: string; payload?: any }) {
    this.log({
      ...params,
      level: "error",
    });
  }

  warn(params: { location: string; message: string; payload?: any }) {
    this.log({
      ...params,
      level: "warn",
    });
  }
}
