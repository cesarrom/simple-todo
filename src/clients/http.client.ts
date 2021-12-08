import { registerProvider } from "@tsed/di";
import got, {
  Got,
} from "got";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export declare interface HttpClient extends Got {}

export class HttpClient {}

export const httpClient = got;

registerProvider({
  provide: HttpClient,
  useFactory: () => got,
});
