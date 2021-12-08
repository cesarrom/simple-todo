import { BaseModel, HasOne } from "./base.model";
import { CredentialConstructor } from "./credential.model";

export interface UserConstructor {
  /**
   * Should be unique
   */
  email: string;

  /**
   * The name for a Natural or Juridical Person
   */
  name: string;
  /**
   * Optional, can be added any time
   */
  picture?: Buffer | string;

  credentials?: HasOne<CredentialConstructor>;
}

export class User extends BaseModel implements UserConstructor {
  public static tableName = "users";

  constructor(params: Partial<User | UserConstructor> = {}) {
    super(params, User.tableName);
  }
  email: string;
  name: string;
  picture?: string | Buffer;
  credentials?: HasOne<CredentialConstructor>;
}
