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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TasksController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const common_1 = require("@tsed/common");
const middlewares_1 = require("../middlewares");
const services_1 = require("../services");
const entity_utils_1 = require("../utils/entity-utils");
const swagger_1 = require("@tsed/swagger");
const create_task_request_1 = require("./requests/create-task.request");
const update_task_request_1 = require("./requests/update-task.request");
const exceptions_1 = require("@tsed/exceptions");
let TasksController = TasksController_1 = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    async createTask(session, body) {
        return this.tasksService.createTask(entity_utils_1.extractId(session.user), body);
    }
    async updateTask(session, taskId, body) {
        if (!Object.keys(body)) {
            throw new exceptions_1.Exception(400, "Empty payload provided");
        }
        return this.tasksService.updateTask(entity_utils_1.extractId(session.user), taskId, body);
    }
    async listTasks(session) {
        return this.tasksService.listTasks(entity_utils_1.extractId(session.user));
    }
    async findTask(session, taskId) {
        return this.tasksService.findTask(entity_utils_1.extractId(session.user), taskId);
    }
};
TasksController.BASE_PATH = "/tasks";
TasksController.CREATE_TASK_PATH = "/";
TasksController.UPDATE_TASK_PATH = "/:taskId";
TasksController.LIST_TASKS_PATH = "/";
TasksController.FIND_TASK_PATH = "/:taskId";
__decorate([
    common_1.Post(TasksController_1.CREATE_TASK_PATH),
    __param(0, common_1.Session()),
    __param(1, common_1.BodyParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_task_request_1.CreateTaskRequest]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    common_1.Put(TasksController_1.UPDATE_TASK_PATH),
    __param(0, common_1.Session()),
    __param(1, common_1.PathParams("taskId")),
    __param(2, common_1.BodyParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_task_request_1.UpdateTaskRequest]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTask", null);
__decorate([
    common_1.Get(TasksController_1.LIST_TASKS_PATH),
    __param(0, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "listTasks", null);
__decorate([
    common_1.Get(TasksController_1.FIND_TASK_PATH),
    __param(0, common_1.Session()),
    __param(1, common_1.PathParams("taskId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "findTask", null);
TasksController = TasksController_1 = __decorate([
    middlewares_1.Auth(),
    common_1.Controller(TasksController_1.BASE_PATH),
    swagger_1.Docs("api-v3"),
    middlewares_1.CommitTransactionAfter(),
    __metadata("design:paramtypes", [services_1.TaskService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3MuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy90YXNrcy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FRc0I7QUFDdEIsZ0RBQThEO0FBRTlELDBDQUEwQztBQUMxQyx3REFBa0Q7QUFDbEQsMkNBQXFDO0FBQ3JDLHdFQUFtRTtBQUNuRSx3RUFBbUU7QUFDbkUsaURBQTZDO0FBTTdDLElBQWEsZUFBZSx1QkFBNUIsTUFBYSxlQUFlO0lBTzFCLFlBQW9CLFlBQXlCO1FBQXpCLGlCQUFZLEdBQVosWUFBWSxDQUFhO0lBQUcsQ0FBQztJQUdqRCxLQUFLLENBQUMsVUFBVSxDQUNILE9BQTJCLEVBQ3hCLElBQXVCO1FBRXJDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsd0JBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUdELEtBQUssQ0FBQyxVQUFVLENBQ0gsT0FBMkIsRUFDaEIsTUFBYyxFQUN0QixJQUF1QjtRQUVyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0QixNQUFNLElBQUksc0JBQVMsQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztTQUNwRDtRQUVELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsd0JBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFHRCxLQUFLLENBQUMsU0FBUyxDQUFZLE9BQTJCO1FBQ3BELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsd0JBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBR0QsS0FBSyxDQUFDLFFBQVEsQ0FDRCxPQUEyQixFQUNoQixNQUFjO1FBRXBDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsd0JBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckUsQ0FBQztDQUNGLENBQUE7QUF6Q2UseUJBQVMsR0FBRyxRQUFRLENBQUM7QUFDckIsZ0NBQWdCLEdBQUcsR0FBRyxDQUFDO0FBQ3ZCLGdDQUFnQixHQUFHLFVBQVUsQ0FBQztBQUM5QiwrQkFBZSxHQUFHLEdBQUcsQ0FBQztBQUN0Qiw4QkFBYyxHQUFHLFVBQVUsQ0FBQztBQUsxQztJQURDLGFBQUksQ0FBQyxpQkFBZSxDQUFDLGdCQUFnQixDQUFDO0lBRXBDLFdBQUEsZ0JBQU8sRUFBRSxDQUFBO0lBQ1QsV0FBQSxtQkFBVSxFQUFFLENBQUE7OzZDQUFPLHVDQUFpQjs7aURBR3RDO0FBR0Q7SUFEQyxZQUFHLENBQUMsaUJBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztJQUVuQyxXQUFBLGdCQUFPLEVBQUUsQ0FBQTtJQUNULFdBQUEsbUJBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNwQixXQUFBLG1CQUFVLEVBQUUsQ0FBQTs7cURBQU8sdUNBQWlCOztpREFPdEM7QUFHRDtJQURDLFlBQUcsQ0FBQyxpQkFBZSxDQUFDLGVBQWUsQ0FBQztJQUNwQixXQUFBLGdCQUFPLEVBQUUsQ0FBQTs7OztnREFFekI7QUFHRDtJQURDLFlBQUcsQ0FBQyxpQkFBZSxDQUFDLGNBQWMsQ0FBQztJQUVqQyxXQUFBLGdCQUFPLEVBQUUsQ0FBQTtJQUNULFdBQUEsbUJBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQTs7OzsrQ0FHdEI7QUF6Q1UsZUFBZTtJQUozQixrQkFBSSxFQUFFO0lBQ04sbUJBQVUsQ0FBQyxpQkFBZSxDQUFDLFNBQVMsQ0FBQztJQUNyQyxjQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2Qsb0NBQXNCLEVBQUU7cUNBUVcsc0JBQVc7R0FQbEMsZUFBZSxDQTBDM0I7QUExQ1ksMENBQWUifQ==