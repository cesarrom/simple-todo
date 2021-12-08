"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnowflakeID = void 0;
const di_1 = require("@tsed/di");
const nodejs_snowflake_1 = require("nodejs-snowflake");
class SnowflakeID extends nodejs_snowflake_1.UniqueID {
}
exports.SnowflakeID = SnowflakeID;
di_1.registerProvider({
    provide: SnowflakeID,
    useValue: new SnowflakeID(),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25vd2ZsYWtlLmNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnRzL3Nub3dmbGFrZS5jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQTRDO0FBQzVDLHVEQUEwQztBQUUxQyxNQUFhLFdBQVksU0FBUSwyQkFBUTtDQUN4QztBQURELGtDQUNDO0FBRUQscUJBQWdCLENBQUM7SUFDZixPQUFPLEVBQUUsV0FBVztJQUNwQixRQUFRLEVBQUUsSUFBSSxXQUFXLEVBQUU7Q0FDNUIsQ0FBQyxDQUFBIn0=