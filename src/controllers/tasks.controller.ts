import {
  BodyParams,
  Controller,
  Get,
  PathParams,
  Post,
  Put,
  Session,
} from "@tsed/common";
import { Auth, CommitTransactionAfter } from "../middlewares";
import { SessionConstructor } from "../models";
import { TaskService } from "../services";
import { extractId } from "../utils/entity-utils";
import { Docs } from "@tsed/swagger";
import { CreateTaskRequest } from "./requests/create-task.request";
import { UpdateTaskRequest } from "./requests/update-task.request";
import { Exception } from "@tsed/exceptions";

@Auth()
@Controller(TasksController.BASE_PATH)
@Docs("api-v3")
@CommitTransactionAfter()
export class TasksController {
  public static BASE_PATH = "/tasks";
  public static CREATE_TASK_PATH = "/";
  public static UPDATE_TASK_PATH = "/:taskId";
  public static LIST_TASKS_PATH = "/";
  public static FIND_TASK_PATH = "/:taskId";

  constructor(private tasksService: TaskService) {}

  @Post(TasksController.CREATE_TASK_PATH)
  async createTask(
    @Session() session: SessionConstructor,
    @BodyParams() body: CreateTaskRequest
  ) {
    return this.tasksService.createTask(extractId(session.user), body);
  }

  @Put(TasksController.UPDATE_TASK_PATH)
  async updateTask(
    @Session() session: SessionConstructor,
    @PathParams("taskId") taskId: string,
    @BodyParams() body: UpdateTaskRequest
  ) {
    if (!Object.keys(body)) {
      throw new Exception(400, "Empty payload provided");
    }

    return this.tasksService.updateTask(extractId(session.user), taskId, body);
  }

  @Get(TasksController.LIST_TASKS_PATH)
  async listTasks(@Session() session: SessionConstructor) {
    return this.tasksService.listTasks(extractId(session.user));
  }

  @Get(TasksController.FIND_TASK_PATH)
  async findTask(
    @Session() session: SessionConstructor,
    @PathParams("taskId") taskId: string
  ) {
    return this.tasksService.findTask(extractId(session.user), taskId);
  }
}
