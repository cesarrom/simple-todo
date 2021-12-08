import type { Request, Response } from "express";
import { Session } from "./models/session.model";

export type AppRequest = Request & { session?: Session };
export type AppResponse = Response;


declare module "stream-json/filters/FilterBase" {

  export default class FilterBase {}
}
