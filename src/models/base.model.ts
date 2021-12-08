import { extractId } from "../utils/entity-utils";
import { v4 as uuid } from "uuid";
import assert from "assert";
import { TABLE_ID_SEPARATOR } from "../constants";

export type HasOne<T> = T | string;
export type HasMany<T> = Array<T | string>;

export abstract class BaseModel {
  constructor(params: unknown = {}, public tableName: string) {
    Object.assign(this, params);

    if (this.id) {
      const value = this.id || "";
      this._refId = value.replace(this.tableName + TABLE_ID_SEPARATOR, "");

      assert(
        this.id === extractId(this) &&
          this.id === this.tableName + TABLE_ID_SEPARATOR + this._refId
      );
    }

    if (this._refId) {
      this.id = extractId(this);
    }

    if (!this._refId && !this.id) {
      this._refId = uuid();
      this.id = extractId(this);
    }

    delete this['@metadata'];
  }

  _refId: string;

  id: string;

  createdAt?: Date;
  deletedAt?: Date;
  updatedAt?: Date;
}
