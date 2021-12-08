import { UserConstructor } from "./user.model";
import { v4 as uuid } from "uuid";

export interface SessionConstructor {
  user: UserConstructor;
  requestId: string;
}

export class Session implements SessionConstructor {

  constructor(param: Omit<SessionConstructor, "requestId">) {
    Object.assign(this, { ...param, requestId: uuid() });
  }
  
  user: UserConstructor;
  requestId: string;
}
