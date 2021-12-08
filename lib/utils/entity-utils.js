"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keysToUpperCamelCase = exports.keysToCamelCase = exports.transformObjectKeys = exports.entityIdEquals = exports.extractId = void 0;
const lodash_1 = require("lodash");
const constants_1 = require("../constants");
function extractId(entity) {
    if (!entity)
        return null;
    if (typeof entity === "string") {
        return entity;
    }
    if ("id" in entity) {
        return entity.id;
    }
    if ("tableName" in entity && "_refId" in entity) {
        return entity.tableName + constants_1.TABLE_ID_SEPARATOR + entity._refId;
    }
    return null;
}
exports.extractId = extractId;
function entityIdEquals(a, b) {
    return extractId(a) === extractId(b);
}
exports.entityIdEquals = entityIdEquals;
function transformObjectKeys(obj, transform = (x) => x) {
    if (!(typeof obj === "object") ||
        typeof obj === "string" ||
        typeof obj === "number" ||
        typeof obj === "boolean") {
        return obj;
    }
    const keys = Object.keys(obj);
    let n = keys.length;
    let lowKey;
    while (n--) {
        const key = keys[n];
        if (key === (lowKey = transform(key)))
            continue;
        obj[lowKey] = keysToCamelCase(obj[key]);
        delete obj[key];
    }
    return obj;
}
exports.transformObjectKeys = transformObjectKeys;
function keysToCamelCase(obj) {
    return transformObjectKeys(obj, (x) => lodash_1.camelCase(x));
}
exports.keysToCamelCase = keysToCamelCase;
function keysToUpperCamelCase(obj) {
    return transformObjectKeys(obj, (x) => lodash_1.upperFirst(lodash_1.camelCase(x)));
}
exports.keysToUpperCamelCase = keysToUpperCamelCase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2VudGl0eS11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBK0M7QUFDL0MsNENBQWtEO0FBRWxELFNBQWdCLFNBQVMsQ0FBQyxNQUFvQjtJQUM1QyxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRXpCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQzlCLE9BQU8sTUFBTSxDQUFDO0tBQ2Y7SUFFRCxJQUFJLElBQUksSUFBSSxNQUFNLEVBQUU7UUFDbEIsT0FBTyxNQUFNLENBQUMsRUFBWSxDQUFDO0tBQzVCO0lBRUQsSUFBSSxXQUFXLElBQUksTUFBTSxJQUFJLFFBQVEsSUFBSSxNQUFNLEVBQUU7UUFDL0MsT0FBTyxNQUFNLENBQUMsU0FBUyxHQUFHLDhCQUFrQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDOUQ7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFoQkQsOEJBZ0JDO0FBRUQsU0FBZ0IsY0FBYyxDQUFDLENBQWUsRUFBRSxDQUFlO0lBQzdELE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBRkQsd0NBRUM7QUFFRCxTQUFnQixtQkFBbUIsQ0FDakMsR0FBUSxFQUNSLFlBQWdDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRXhDLElBQ0UsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQztRQUMxQixPQUFPLEdBQUcsS0FBSyxRQUFRO1FBQ3ZCLE9BQU8sR0FBRyxLQUFLLFFBQVE7UUFDdkIsT0FBTyxHQUFHLEtBQUssU0FBUyxFQUN4QjtRQUNBLE9BQU8sR0FBRyxDQUFDO0tBQ1o7SUFDRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDcEIsSUFBSSxNQUFNLENBQUM7SUFDWCxPQUFPLENBQUMsRUFBRSxFQUFFO1FBQ1YsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUFFLFNBQVM7UUFDaEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4QyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNqQjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQXRCRCxrREFzQkM7QUFFRCxTQUFnQixlQUFlLENBQUMsR0FBRztJQUNqQyxPQUFPLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsa0JBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFGRCwwQ0FFQztBQUVELFNBQWdCLG9CQUFvQixDQUFDLEdBQUc7SUFDdEMsT0FBTyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLG1CQUFVLENBQUMsa0JBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkUsQ0FBQztBQUZELG9EQUVDIn0=