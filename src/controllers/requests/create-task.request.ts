import { MinLength, Optional, Required } from "@tsed/schema";
import { BaseRequest } from "./base.request";

export class CreateTaskRequest extends BaseRequest<CreateTaskRequest> {
  @Required()
  @MinLength(2)
  title: string;
  @Optional()
  description: string;
}