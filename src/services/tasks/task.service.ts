import { TASK_STATUSES } from "../../constants";
import { Transactional } from "../../annotations/transactional-service.annotation";
import { Task, TaskConstructor } from "../../models";
import { TaskRepository } from "../../repositories/task.repository";
import { extractId } from "../../utils/entity-utils";
import { CreateTaskRequest } from "../../controllers/requests/create-task.request";
import { UpdateTaskRequest } from "../../controllers/requests/update-task.request";
import { LoggerService } from "../logger";

const location = "TaskService";

@Transactional()
export class TaskService {
  constructor(
    private taskRepository: TaskRepository,
    private log: LoggerService
  ) {}

  async findTask(userId: string, taskId: string) {
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

  listTasks(userId: string) {
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

  async updateTask(userId: string, taskId: string, body: UpdateTaskRequest) {
    this.log.info({
      location,
      message: "update task",
      payload: {
        userId,
        taskId,
      },
    });

    const task = await this.findTask(userId, taskId);

    return this.taskRepository.updateById(
      extractId(task),
      new Task({ ...task, ...body })
    );
  }

  createTask(userId: string, body: CreateTaskRequest) {
    this.log.info({
      location,
      message: "create task",
      payload: {
        userId,
      },
    });

    return this.taskRepository.create(
      new Task({
        ...body,
        state: TASK_STATUSES.TODO,
        users: [userId],
      })
    );
  }
}
