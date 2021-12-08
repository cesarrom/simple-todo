import { IMiddleware, Middleware, Next, Req, Res, UseAuth } from "@tsed/common";
import { useDecorators } from "@tsed/core";
import type { AppRequest, AppResponse } from "../../types";
import { AuthenticationService } from "../../services";
import { Transactional } from "../../annotations/transactional-service.annotation";
import { Exception } from "@tsed/exceptions";
import { In, Security } from "@tsed/schema";
import { LoggerService } from "../../services/logger";

const location = "Authorization Middleware";

@Transactional(Middleware)
export class AuthorizationMiddleware implements IMiddleware {
  constructor(private authenticationService: AuthenticationService, private log: LoggerService) {}
  public async use(
    @Req() req: AppRequest,
    @Res() res: AppResponse,
    @Next() next: () => void
  ) {
    this.log.info({
      location,
      message: 'Verifying request authorization'
    });

    const { authorization = "" } = req.headers;

    if (!authorization) {
      throw new Exception(401, "Not Authorized");
    }

    const token = authorization.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token not provided" })
        .end();
    }

    const session = await this.authenticationService.tokenToSession(token);

    Object.assign(req, {
      session,
    });

    return next();
  }
}
export function Auth() {
  return useDecorators(
    UseAuth(AuthorizationMiddleware),
    In("authorization").Type(String).Description("Bearer authorization"),
    Security("oidc")
  );
}
