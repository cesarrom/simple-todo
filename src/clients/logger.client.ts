import { registerProvider } from "@tsed/di";
import {
  Logger,
  $log,
} from "@tsed/logger";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export declare interface AppLogger extends Logger {}

export class AppLogger {}

registerProvider({
  provide: AppLogger,
  useFactory: () => $log,
});
