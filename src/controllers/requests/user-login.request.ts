import { Email, MinLength, Required } from "@tsed/schema";
import { BaseRequest } from "./base.request";

export class UserLoginRequest extends BaseRequest<UserLoginRequest> {
  @Required()
  @Email()
  email: string;
  @Required()
  @MinLength(6)
  password: string;
}