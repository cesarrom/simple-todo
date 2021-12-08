import { Configuration } from "@tsed/common";
import { PlatformExpress } from "@tsed/platform-express";
import "@tsed/ajv";
import "@tsed/swagger";
import "eventemitter2";
import "@tsed/event-emitter";


import serverConfig from "./server-config";

@Configuration(serverConfig(__dirname))
export class Server {}

export const bootstrapTsEd = async () => {
  console.log("starting TS.ED strategy");
  const platform = await PlatformExpress.bootstrap(Server);

  await platform.listen();
};

export const bootstrap = () => {
  const handleError = (err) => {
    console.error(err);
    throw err;
  };

  try {
    return bootstrapTsEd().catch(handleError);
  } catch (e) {
    handleError(e);
  }
};

export const p = bootstrap();
