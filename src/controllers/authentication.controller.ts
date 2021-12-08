import { Controller, Post, BodyParams, Get, HeaderParams } from "@tsed/common";
import { Auth, CommitTransactionAfter } from "../middlewares";
import { AuthenticationService } from "../services";
import { renewJwt } from "../utils/crypto";
import { Status } from "@tsed/schema";
import { UserSignUpRequest } from "./requests/user-sign-up.request";
import { Docs } from "@tsed/swagger";
import { UserLoginRequest } from "./requests/user-login.request";

@Controller(AuthenticationController.BASE_PATH)
@Docs("api-v3")
@CommitTransactionAfter()
export class AuthenticationController {
  public static readonly BASE_PATH = "/auth";
  public static readonly REFRESH_SESSION_PATH = "/refresh";
  public static readonly LOGIN_PATH = "/login";
  public static readonly SIGN_UP_PATH = "/sign-up";

  constructor(private authService: AuthenticationService) {}
  @Post(AuthenticationController.SIGN_UP_PATH)
  @Status(201)
  async signUp(@BodyParams() userInformation: UserSignUpRequest) {
    return this.authService.signUp(userInformation);
  }

  @Get(AuthenticationController.REFRESH_SESSION_PATH)
  async refreshSession(
    @HeaderParams("Authorization") authorizationToken: string
  ) {
    return { jwt: renewJwt(authorizationToken.replace("Bearer ", "")) };
  }

  @Post(AuthenticationController.LOGIN_PATH)
  async login(@BodyParams() body: UserLoginRequest) {
    const session = await this.authService.generateUserSession(
      body.email,
      body.password
    );

    return {
      jwt: this.authService.sessionToToken(session),
      user: session.user,
    };
  }
}
