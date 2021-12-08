import { Task } from "../models";
import { BaseRepository, SearchQuerySpec } from "./base.repository";
import { IDocumentQuery } from "ravendb";
import { Transactional } from "../annotations/transactional-service.annotation";
import { DatabaseClient, getDatabaseSession } from "../clients/database.client";
import { TASK_STATUSES } from "../constants";

export type TaskQuery = SearchQuerySpec & {
  stateIn?: TASK_STATUSES[];
  userIdIn?: string[];
  idIn?: string[];
};

@Transactional()
export class TaskRepository extends BaseRepository<Task, TaskQuery>(Task) {
  constructor(faunaCli: DatabaseClient) {
    super(faunaCli);
  }

  buildQuery(
    query: IDocumentQuery<Task>,
    params: TaskQuery
  ): IDocumentQuery<Task> {
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
}

export const userRepository = new TaskRepository(getDatabaseSession());
