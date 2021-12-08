"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const entity_utils_1 = require("../utils/entity-utils");
const uuid_1 = require("uuid");
const assert_1 = __importDefault(require("assert"));
const constants_1 = require("../constants");
class BaseModel {
    constructor(params = {}, tableName) {
        this.tableName = tableName;
        Object.assign(this, params);
        if (this.id) {
            const value = this.id || "";
            this._refId = value.replace(this.tableName + constants_1.TABLE_ID_SEPARATOR, "");
            assert_1.default(this.id === entity_utils_1.extractId(this) &&
                this.id === this.tableName + constants_1.TABLE_ID_SEPARATOR + this._refId);
        }
        if (this._refId) {
            this.id = entity_utils_1.extractId(this);
        }
        if (!this._refId && !this.id) {
            this._refId = uuid_1.v4();
            this.id = entity_utils_1.extractId(this);
        }
        delete this['@metadata'];
    }
}
exports.BaseModel = BaseModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvYmFzZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3REFBa0Q7QUFDbEQsK0JBQWtDO0FBQ2xDLG9EQUE0QjtBQUM1Qiw0Q0FBa0Q7QUFLbEQsTUFBc0IsU0FBUztJQUM3QixZQUFZLFNBQWtCLEVBQUUsRUFBUyxTQUFpQjtRQUFqQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ3hELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTVCLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNYLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLDhCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXJFLGdCQUFNLENBQ0osSUFBSSxDQUFDLEVBQUUsS0FBSyx3QkFBUyxDQUFDLElBQUksQ0FBQztnQkFDekIsSUFBSSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsU0FBUyxHQUFHLDhCQUFrQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQ2hFLENBQUM7U0FDSDtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxFQUFFLEdBQUcsd0JBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLFNBQUksRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxFQUFFLEdBQUcsd0JBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQjtRQUVELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7Q0FTRjtBQWpDRCw4QkFpQ0MifQ==