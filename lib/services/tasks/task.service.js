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
exports.TaskService = void 0;
const constants_1 = require("../../constants");
const transactional_service_annotation_1 = require("../../annotations/transactional-service.annotation");
const models_1 = require("../../models");
const task_repository_1 = require("../../repositories/task.repository");
const entity_utils_1 = require("../../utils/entity-utils");
let TaskService = class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async findTask(userId, taskId) {
        const [task] = await this.taskRepository.getAll({
            userIdIn: [userId],
            idIn: [taskId],
        });
        return task;
    }
    listTasks(userId) {
        return this.taskRepository.getAll({
            userIdIn: [userId],
        });
    }
    async updateTask(userId, taskId, body) {
        const task = await this.findTask(userId, taskId);
        return this.taskRepository.updateById(entity_utils_1.extractId(task), new models_1.Task({ ...task, ...body }));
    }
    createTask(userId, body) {
        return this.taskRepository.create(new models_1.Task({
            ...body,
            state: constants_1.TASK_STATUSES.TODO,
            users: [userId],
        }));
    }
};
TaskService = __decorate([
    transactional_service_annotation_1.Transactional(),
    __metadata("design:paramtypes", [task_repository_1.TaskRepository])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL3Rhc2tzL3Rhc2suc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBZ0Q7QUFDaEQseUdBQW1GO0FBQ25GLHlDQUFxRDtBQUNyRCx3RUFBb0U7QUFDcEUsMkRBQXFEO0FBS3JELElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFDdEIsWUFBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQUcsQ0FBQztJQUV0RCxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQWMsRUFBRSxNQUFjO1FBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQzlDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNsQixJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDZixDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxTQUFTLENBQUMsTUFBYztRQUN0QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQ2hDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUNuQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFjLEVBQUUsTUFBYyxFQUFFLElBQXVCO1FBQ3RFLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFakQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FDbkMsd0JBQVMsQ0FBQyxJQUFJLENBQUMsRUFDZixJQUFJLGFBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FDL0IsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVLENBQUMsTUFBYyxFQUFFLElBQXVCO1FBQ2hELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQy9CLElBQUksYUFBSSxDQUFDO1lBQ1AsR0FBRyxJQUFJO1lBQ1AsS0FBSyxFQUFFLHlCQUFhLENBQUMsSUFBSTtZQUN6QixLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDaEIsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQXBDWSxXQUFXO0lBRHZCLGdEQUFhLEVBQUU7cUNBRXNCLGdDQUFjO0dBRHZDLFdBQVcsQ0FvQ3ZCO0FBcENZLGtDQUFXIn0=