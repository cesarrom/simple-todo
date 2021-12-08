"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSystemUrl = exports.getUrl = void 0;
const lodash_1 = require("lodash");
const url_1 = require("url");
const constants_1 = require("../constants");
function splitBySlash(str) {
    return (str || "").split("/").filter((part) => !!part);
}
function getUrl(...path) {
    const uri = ["p", "v1", ...path.flatMap(splitBySlash)].join("/");
    const url = new url_1.URL(uri, constants_1.ENVIRONMENT.HOST);
    return url.toString();
}
exports.getUrl = getUrl;
function isSystemUrl(str) {
    return lodash_1.isString(str) && (str || "").includes(constants_1.ENVIRONMENT.HOST);
}
exports.isSystemUrl = isSystemUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3VybC11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBa0M7QUFDbEMsNkJBQTBCO0FBQzFCLDRDQUEyQztBQUUzQyxTQUFTLFlBQVksQ0FBQyxHQUFXO0lBQy9CLE9BQU8sQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFDRCxTQUFnQixNQUFNLENBQUMsR0FBRyxJQUFjO0lBQ3RDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakUsTUFBTSxHQUFHLEdBQUcsSUFBSSxTQUFHLENBQUMsR0FBRyxFQUFFLHVCQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFM0MsT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDeEIsQ0FBQztBQUxELHdCQUtDO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLEdBQVk7SUFDdEMsT0FBTyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyx1QkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pFLENBQUM7QUFGRCxrQ0FFQyJ9