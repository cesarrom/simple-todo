import { Enum, MinLength, Optional, Required } from "@tsed/schema";
import { TASK_STATUSES } from "../../constants";
import { BaseRequest } from "./base.request";

export class UpdateTaskRequest extends BaseRequest<UpdateTaskRequest> {
  @Optional()
  @MinLength(2)
  title: string;
  @Optional()
  description: string;
  @Required()
  @Enum(TASK_STATUSES)
  state: TASK_STATUSES
}