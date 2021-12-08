import {
  IMiddleware,
  Middleware,
  Next,
  ProviderScope,
  Scope,
  UseAfter,
} from "@tsed/common";
import { useDecorators } from "@tsed/core";
import { Transactional } from "../../annotations/transactional-service.annotation";
import { DatabaseClient } from "../../clients/database.client";
import { LoggerService } from "../../services/logger";

const location = "Commit After Transaction Middleware";

@Transactional(Middleware)
export class CommitAfterTransactionMiddleware implements IMiddleware {

  constructor(
    private transaction: DatabaseClient,
    private log: LoggerService,
  ) {
  }

  public async use(
    @Next() next: CallableFunction,
  ) {
    this.log.info({
      location,
      message: 'Committing all DB changes for this request'
    });

    await this.transaction.saveAndClose()

    return next();
  }
}

export const CommitTransactionAfter = () => {
  return useDecorators(
    UseAfter(CommitAfterTransactionMiddleware),
    Scope(ProviderScope.REQUEST)
  );
}
