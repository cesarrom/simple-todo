import { User } from "../models";
import { BaseRepository, SearchQuerySpec } from "./base.repository";
import { IDocumentQuery } from "ravendb";
import { Transactional } from "../annotations/transactional-service.annotation";
import { DatabaseClient, getDatabaseSession } from "../clients/database.client";
import { httpClient, HttpClient } from "../clients/http.client";
import { Readable } from "stream";

export type UserQuery = SearchQuerySpec & {
  idIn?: string[];
};

@Transactional()
export class UserRepository extends BaseRepository<User, UserQuery>(User) {
  constructor(faunaCli: DatabaseClient, private httpClient: HttpClient) {
    super(faunaCli);
  }

  buildQuery(
    query: IDocumentQuery<User>,
    params: UserQuery
  ): IDocumentQuery<User> {
    if (params.idIn) {
      query.whereIn("id()", params.idIn);
    }

    return query;
  }

  findByEmail(email: string) {
    return this.startQuery().whereEquals("email", email).firstOrNull();
  }

  async getUserRandomPicture(seed: string): Promise<Readable> {
    return this.httpClient.stream.get(
      `https://avatars.dicebear.com/api/bottts/${seed}.svg`,
      {
        responseType: "buffer",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      }
    );
  }
}

export const userRepository = new UserRepository(
  getDatabaseSession(),
  httpClient as HttpClient
);
