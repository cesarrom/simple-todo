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
const logger_1 = require("../logger");
const location = "TaskService";
let TaskService = class TaskService {
    constructor(taskRepository, log) {
        this.taskRepository = taskRepository;
        this.log = log;
    }
    async findTask(userId, taskId) {
        this.log.info({
            location,
            message: "find task by id",
            payload: {
                userId,
                taskId,
            },
        });
        const [task] = await this.taskRepository.getAll({
            userIdIn: [userId],
            idIn: [taskId],
        });
        return task;
    }
    listTasks(userId) {
        this.log.info({
            location,
            message: "list tasks",
            payload: {
                userId,
            },
        });
        return this.taskRepository.getAll({
            userIdIn: [userId],
        });
    }
    async updateTask(userId, taskId, body) {
        this.log.info({
            location,
            message: "update task",
            payload: {
                userId,
                taskId,
            },
        });
        const task = await this.findTask(userId, taskId);
        return this.taskRepository.updateById(entity_utils_1.extractId(task), new models_1.Task({ ...task, ...body }));
    }
    createTask(userId, body) {
        this.log.info({
            location,
            message: "create task",
            payload: {
                userId,
            },
        });
        return this.taskRepository.create(new models_1.Task({
            ...body,
            state: constants_1.TASK_STATUSES.TODO,
            users: [userId],
        }));
    }
};
TaskService = __decorate([
    transactional_service_annotation_1.Transactional(),
    __metadata("design:paramtypes", [task_repository_1.TaskRepository,
        logger_1.LoggerService])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL3Rhc2tzL3Rhc2suc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBZ0Q7QUFDaEQseUdBQW1GO0FBQ25GLHlDQUFxRDtBQUNyRCx3RUFBb0U7QUFDcEUsMkRBQXFEO0FBR3JELHNDQUEwQztBQUUxQyxNQUFNLFFBQVEsR0FBRyxhQUFhLENBQUM7QUFHL0IsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQUN0QixZQUNVLGNBQThCLEVBQzlCLEdBQWtCO1FBRGxCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixRQUFHLEdBQUgsR0FBRyxDQUFlO0lBQ3pCLENBQUM7SUFFSixLQUFLLENBQUMsUUFBUSxDQUFDLE1BQWMsRUFBRSxNQUFjO1FBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ1osUUFBUTtZQUNSLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsT0FBTyxFQUFFO2dCQUNQLE1BQU07Z0JBQ04sTUFBTTthQUNQO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7WUFDOUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ2xCLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUNmLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFjO1FBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ1osUUFBUTtZQUNSLE9BQU8sRUFBRSxZQUFZO1lBQ3JCLE9BQU8sRUFBRTtnQkFDUCxNQUFNO2FBQ1A7U0FDRixDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQ2hDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUNuQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFjLEVBQUUsTUFBYyxFQUFFLElBQXVCO1FBQ3RFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ1osUUFBUTtZQUNSLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLE9BQU8sRUFBRTtnQkFDUCxNQUFNO2dCQUNOLE1BQU07YUFDUDtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFakQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FDbkMsd0JBQVMsQ0FBQyxJQUFJLENBQUMsRUFDZixJQUFJLGFBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FDL0IsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVLENBQUMsTUFBYyxFQUFFLElBQXVCO1FBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ1osUUFBUTtZQUNSLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLE9BQU8sRUFBRTtnQkFDUCxNQUFNO2FBQ1A7U0FDRixDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUMvQixJQUFJLGFBQUksQ0FBQztZQUNQLEdBQUcsSUFBSTtZQUNQLEtBQUssRUFBRSx5QkFBYSxDQUFDLElBQUk7WUFDekIsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDO1NBQ2hCLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUF6RVksV0FBVztJQUR2QixnREFBYSxFQUFFO3FDQUdZLGdDQUFjO1FBQ3pCLHNCQUFhO0dBSGpCLFdBQVcsQ0F5RXZCO0FBekVZLGtDQUFXIn0=