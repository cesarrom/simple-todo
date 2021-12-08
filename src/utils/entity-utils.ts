import { upperFirst, camelCase } from "lodash";
import { TABLE_ID_SEPARATOR } from "../constants";

export function extractId(entity: string | any): string {
  if (!entity) return null;

  if (typeof entity === "string") {
    return entity;
  }

  if ("id" in entity) {
    return entity.id as string;
  }

  if ("tableName" in entity && "_refId" in entity) {
    return entity.tableName + TABLE_ID_SEPARATOR + entity._refId;
  }

  return null;
}

export function entityIdEquals(a: string | any, b: string | any) {
  return extractId(a) === extractId(b);
}

export function transformObjectKeys(
  obj: any,
  transform: (string) => string = (x) => x
) {
  if (
    !(typeof obj === "object") ||
    typeof obj === "string" ||
    typeof obj === "number" ||
    typeof obj === "boolean"
  ) {
    return obj;
  }
  const keys = Object.keys(obj);
  let n = keys.length;
  let lowKey;
  while (n--) {
    const key = keys[n];
    if (key === (lowKey = transform(key))) continue;
    obj[lowKey] = keysToCamelCase(obj[key]);
    delete obj[key];
  }
  return obj;
}

export function keysToCamelCase(obj) {
  return transformObjectKeys(obj, (x) => camelCase(x));
}

export function keysToUpperCamelCase(obj) {
  return transformObjectKeys(obj, (x) => upperFirst(camelCase(x)));
}
