import { Controller, Get } from "@tsed/common";
import { Docs } from "@tsed/swagger";

@Controller(BaseController.BASE_PATH)
@Docs("api-v3")
export class BaseController {

  public static BASE_PATH = "";
  public static HEART_BEAT_PATH = "/heart-beat";

  @Get(BaseController.HEART_BEAT_PATH)
  async heartBeat() {
    return "OK";
  }
}
