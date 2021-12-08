import { isString } from "lodash";
import { URL } from "url";
import { ENVIRONMENT } from "../constants";

function splitBySlash(str: string): string[] {
  return (str || "").split("/").filter((part) => !!part);
}
export function getUrl(...path: string[]) {
  const uri = ["p", "v1", ...path.flatMap(splitBySlash)].join("/");
  const url = new URL(uri, ENVIRONMENT.HOST);

  return url.toString();
}

export function isSystemUrl(str: unknown) {
  return isString(str) && (str || "").includes(ENVIRONMENT.HOST);
}
