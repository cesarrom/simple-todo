import { Email, MinLength, Required } from "@tsed/schema";
import { BaseRequest } from "./base.request";

export class UserSignUpRequest extends BaseRequest<UserSignUpRequest> {
  @Required()
  @Email()
  email: string;
  @Required()
  @MinLength(1)
  name: string;
  @Required()
  @MinLength(6)
  password: string;
}