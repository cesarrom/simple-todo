"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpClient = exports.HttpClient = void 0;
const di_1 = require("@tsed/di");
const got_1 = __importDefault(require("got"));
class HttpClient {
}
exports.HttpClient = HttpClient;
exports.httpClient = got_1.default;
di_1.registerProvider({
    provide: HttpClient,
    useFactory: () => got_1.default,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5jbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2xpZW50cy9odHRwLmNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpQ0FBNEM7QUFDNUMsOENBRWE7QUFLYixNQUFhLFVBQVU7Q0FBRztBQUExQixnQ0FBMEI7QUFFYixRQUFBLFVBQVUsR0FBRyxhQUFHLENBQUM7QUFFOUIscUJBQWdCLENBQUM7SUFDZixPQUFPLEVBQUUsVUFBVTtJQUNuQixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBRztDQUN0QixDQUFDLENBQUMifQ==