import { getDatabaseSession } from "../clients/database.client";
import { Transactional } from "../annotations/transactional-service.annotation";
import { AuditTrail } from "../models";
import { BaseRepository } from "./base.repository";
import { IDocumentQuery } from "ravendb";

@Transactional()
export class AuditTrailRepository extends BaseRepository<AuditTrail, {}>(AuditTrail) {
  buildQuery(query: IDocumentQuery<AuditTrail>): IDocumentQuery<AuditTrail> {
    return query;
  }  
}

export const auditTrailRepository = new AuditTrailRepository(
  getDatabaseSession()
);
