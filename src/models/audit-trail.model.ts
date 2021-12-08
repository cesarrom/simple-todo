import { BaseModel } from "./base.model";

export interface AuditTrailConstructor {
  level: string;
  message: string;
  timestamp: number;
  location: string;
  payload?: string;
}
export class AuditTrail extends BaseModel implements AuditTrailConstructor {
  level: string;
  message: string;
  timestamp: number;
  location: string;
  payload: any;

  public static tableName = "auditTrails";
  
  constructor(params: Partial<AuditTrail | AuditTrailConstructor> = {}) {
    super(params, AuditTrail.tableName);
  }
}
