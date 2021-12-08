import { TASK_STATUSES } from "../constants";
import { BaseModel, HasMany } from "./base.model";
import { User, UserConstructor } from "./user.model";

export interface TaskConstructor {
  title: string;
  description: string;
  state: TASK_STATUSES;
  users: HasMany<UserConstructor>;
}

export class Task extends BaseModel implements TaskConstructor {
  public static tableName = "tasks";

  constructor(params: Partial<Task | TaskConstructor> = {}) {
    super(params, Task.tableName);
  }
  title: string;
  description: string;
  state: TASK_STATUSES;
  users: HasMany<User>;
}
