import {
  Catch,
  PlatformContext,
  ExceptionFilterMethods,
  ResponseErrorObject,
} from "@tsed/common";
import { Exception } from "@tsed/exceptions";
import { LoggerService } from "../../services/logger";

const location = "Error Filter";

@Catch(Error)
export class ErrorFilter implements ExceptionFilterMethods {
  constructor(private log: LoggerService) {}

  catch(exception: Exception, ctx: PlatformContext) {
    this.log.info({
      location,
      message: "handling error",
      payload: {
        exception,
      },
    });

    const { response } = ctx;
    const error = this.mapError(exception);
    const headers = this.getHeaders(exception);

    this.log.error({
      location,
      message: error.message
    })

    response
      .setHeaders(headers)
      .status(error.status || 500)
      .body(error);
  }

  mapError(error: any) {
    return {
      name: error.origin?.name || error.name,
      message: error.message,
      status: error.status || 500,
      errors: this.getErrors(error),
    };
  }

  protected getErrors(error: any) {
    return [error, error.origin]
      .filter(Boolean)
      .reduce((errs, { errors }: ResponseErrorObject) => {
        return [...errs, ...(errors || [])];
      }, []);
  }

  protected getHeaders(error: any) {
    return [error, error.origin]
      .filter(Boolean)
      .reduce((obj, { headers }: ResponseErrorObject) => {
        return {
          ...obj,
          ...(headers || {}),
        };
      }, {});
  }
}
