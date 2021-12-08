import { getDatabaseSession } from "../clients/database.client";
import { Transactional } from "../annotations/transactional-service.annotation";
import { Credential } from "../models";
import { BaseRepository } from "./base.repository";
import { IDocumentQuery } from "ravendb";

export type CredentialQuery = {
  userIdIn?: string[];
};

@Transactional()
export class CredentialRepository extends BaseRepository<
  Credential,
  CredentialQuery
>(Credential) {
  buildQuery(
    query: IDocumentQuery<Credential>,
    params: CredentialQuery
  ): IDocumentQuery<Credential> {
    if (params.userIdIn) {
      query.whereIn("user", params.userIdIn);
    }

    return query;
  }
}

export const credentialRepository = new CredentialRepository(
  getDatabaseSession()
);
