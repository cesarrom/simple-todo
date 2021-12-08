import { ProviderScope, registerProvider } from "@tsed/di";
import { ENVIRONMENT } from "../constants";
import {
  DocumentStore,
  IDocumentSession,
  GetStatisticsOperation,
  DatabaseRecord,
  CreateDatabaseOperation,
} from "ravendb";
import { isFunction } from "lodash";
import sp from "synchronized-promise";

export const initializeAndGetDatabaseClient = async () => {
  const isLocalDb =
    !!["localhost", "127.0.0.1"].find((h) =>
      ENVIRONMENT.DATABASE_HOST.includes(h)
    ) || !ENVIRONMENT.DATABASE_CERTIFICATE;

  const databaseClient = isLocalDb
    ? new DocumentStore([ENVIRONMENT.DATABASE_HOST], ENVIRONMENT.DATABASE_NAME)
    : new DocumentStore(
        [ENVIRONMENT.DATABASE_HOST],
        ENVIRONMENT.DATABASE_NAME,
        {
          certificate: ENVIRONMENT.DATABASE_CERTIFICATE,
          type: "pfx",
          password: ENVIRONMENT.DATABASE_PASSWORD,
        }
      );

  databaseClient.conventions.maxNumberOfRequestsPerSession =
    Number.POSITIVE_INFINITY;

  databaseClient.initialize();

  const database = databaseClient.database || ENVIRONMENT.DATABASE_NAME;

  if (!database) {
    throw new Error("Value cannot be null or whitespace");
  }

  try {
    await databaseClient.maintenance
      .forDatabase(database)
      .send(new GetStatisticsOperation());
  } catch (e) {
    try {
      const databaseRecord: DatabaseRecord = { databaseName: database };
      await databaseClient.maintenance.server.send(
        new CreateDatabaseOperation(databaseRecord)
      );
    } catch (ce) {
      // The database was already created before calling CreateDatabaseOperation
    }
  }

  return databaseClient;
};

export const databaseClient = sp(initializeAndGetDatabaseClient)();

export const getDatabaseSession = (): DatabaseClient => {
  let session: DatabaseClient = databaseClient.openSession() as any;
  return new Proxy(session, {
    get: (_, key) => {
      if (key === "saveChanges") {
        return () => {
          const s = session;
          session = databaseClient.openSession() as any;
          return s.saveChanges();
        };
      }

      if (key === "saveAndClose") {
        return () => {
          return session.saveChanges();
        };
      }

      if (isFunction(session[key])) {
        return (...args) => {
          return session[key](...args);
        };
      }

      return session[key];
    },
  });
};

export class BaseDocumentStore extends DocumentStore {}

export declare interface DatabaseClient extends IDocumentSession {
  saveAndClose(): Promise<void>;
}

export abstract class DatabaseClient {}

registerProvider({
  scope: ProviderScope.SINGLETON,
  provide: BaseDocumentStore,
  useValue: databaseClient,
});

registerProvider({
  scope: ProviderScope.REQUEST,
  provide: DatabaseClient,
  useFactory: getDatabaseSession,
});
