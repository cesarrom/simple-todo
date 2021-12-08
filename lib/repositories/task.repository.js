"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.TaskRepository = void 0;
const models_1 = require("../models");
const base_repository_1 = require("./base.repository");
const transactional_service_annotation_1 = require("../annotations/transactional-service.annotation");
const database_client_1 = require("../clients/database.client");
let TaskRepository = class TaskRepository extends base_repository_1.BaseRepository(models_1.Task) {
    constructor(faunaCli) {
        super(faunaCli);
    }
    buildQuery(query, params) {
        if (params.stateIn) {
            query.whereIn("state", params.stateIn);
        }
        if (params.userIdIn) {
            query.whereIn("users", params.userIdIn);
        }
        if (params.idIn) {
            query.whereIn("id()", params.idIn);
        }
        return query;
    }
};
TaskRepository = __decorate([
    transactional_service_annotation_1.Transactional(),
    __metadata("design:paramtypes", [database_client_1.DatabaseClient])
], TaskRepository);
exports.TaskRepository = TaskRepository;
exports.userRepository = new TaskRepository(database_client_1.getDatabaseSession());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5yZXBvc2l0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JlcG9zaXRvcmllcy90YXNrLnJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWlDO0FBQ2pDLHVEQUFvRTtBQUVwRSxzR0FBZ0Y7QUFDaEYsZ0VBQWdGO0FBVWhGLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxnQ0FBYyxDQUFrQixhQUFJLENBQUM7SUFDdkUsWUFBWSxRQUF3QjtRQUNsQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVELFVBQVUsQ0FDUixLQUEyQixFQUMzQixNQUFpQjtRQUVqQixJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDbEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ25CLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN6QztRQUVELElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtZQUNmLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGLENBQUE7QUF2QlksY0FBYztJQUQxQixnREFBYSxFQUFFO3FDQUVRLGdDQUFjO0dBRHpCLGNBQWMsQ0F1QjFCO0FBdkJZLHdDQUFjO0FBeUJkLFFBQUEsY0FBYyxHQUFHLElBQUksY0FBYyxDQUFDLG9DQUFrQixFQUFFLENBQUMsQ0FBQyJ9