import { ResponseFilter, Context, ResponseFilterMethods } from "@tsed/common";
import { LoggerService } from "../../services/logger";
import { extractId } from "../../utils/entity-utils";

const location = "Wrapper Response Filter"

@ResponseFilter("*/*")
export class WrapperResponseFilter implements ResponseFilterMethods {
  constructor(private log: LoggerService) {}
  transform(data: any, ctx: Context) {
    this.log.info({
      location,
      message: "post processing response before sending it"
    });

    if (typeof data !== "object") return data;

    const result = JSON.parse(JSON.stringify(data));

    if ("_refId" in result) {
      result.id = extractId(result);
    }

    return result;
  }
}
