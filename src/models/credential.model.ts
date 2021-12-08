import { GENERAL_STATUSES } from "../constants";
import { BaseModel, HasOne } from "./base.model";
import { User, UserConstructor } from "./user.model";

export interface CredentialConstructor {
  id: string;
  user: HasOne<UserConstructor>;
  password: string;
  status: GENERAL_STATUSES;
}

export class Credential
  extends BaseModel
  implements CredentialConstructor
{
  password: string;
  status: GENERAL_STATUSES;
  user: HasOne<User>;

  public static tableName = "credentials";
  constructor(params: Partial<Credential | CredentialConstructor> = {}) {
    super(params, Credential.tableName);
  }
}
