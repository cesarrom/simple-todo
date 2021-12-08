"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseClient = exports.BaseDocumentStore = exports.getDatabaseSession = exports.databaseClient = exports.initializeAndGetDatabaseClient = void 0;
const di_1 = require("@tsed/di");
const constants_1 = require("../constants");
const ravendb_1 = require("ravendb");
const lodash_1 = require("lodash");
const synchronized_promise_1 = __importDefault(require("synchronized-promise"));
const initializeAndGetDatabaseClient = async () => {
    const isLocalDb = !!["localhost", "127.0.0.1"].find((h) => constants_1.ENVIRONMENT.DATABASE_HOST.includes(h)) || !constants_1.ENVIRONMENT.DATABASE_CERTIFICATE;
    const databaseClient = isLocalDb
        ? new ravendb_1.DocumentStore([constants_1.ENVIRONMENT.DATABASE_HOST], constants_1.ENVIRONMENT.DATABASE_NAME)
        : new ravendb_1.DocumentStore([constants_1.ENVIRONMENT.DATABASE_HOST], constants_1.ENVIRONMENT.DATABASE_NAME, {
            certificate: constants_1.ENVIRONMENT.DATABASE_CERTIFICATE,
            type: "pfx",
            password: constants_1.ENVIRONMENT.DATABASE_PASSWORD,
        });
    databaseClient.conventions.maxNumberOfRequestsPerSession =
        Number.POSITIVE_INFINITY;
    databaseClient.initialize();
    const database = databaseClient.database || constants_1.ENVIRONMENT.DATABASE_NAME;
    if (!database) {
        throw new Error("Value cannot be null or whitespace");
    }
    try {
        await databaseClient.maintenance
            .forDatabase(database)
            .send(new ravendb_1.GetStatisticsOperation());
    }
    catch (e) {
        try {
            const databaseRecord = { databaseName: database };
            await databaseClient.maintenance.server.send(new ravendb_1.CreateDatabaseOperation(databaseRecord));
        }
        catch (ce) {
        }
    }
    return databaseClient;
};
exports.initializeAndGetDatabaseClient = initializeAndGetDatabaseClient;
exports.databaseClient = synchronized_promise_1.default(exports.initializeAndGetDatabaseClient)();
const getDatabaseSession = () => {
    let session = exports.databaseClient.openSession();
    return new Proxy(session, {
        get: (_, key) => {
            if (key === "saveChanges") {
                return () => {
                    const s = session;
                    session = exports.databaseClient.openSession();
                    return s.saveChanges();
                };
            }
            if (key === "saveAndClose") {
                return () => {
                    return session.saveChanges();
                };
            }
            if (lodash_1.isFunction(session[key])) {
                return (...args) => {
                    return session[key](...args);
                };
            }
            return session[key];
        },
    });
};
exports.getDatabaseSession = getDatabaseSession;
class BaseDocumentStore extends ravendb_1.DocumentStore {
}
exports.BaseDocumentStore = BaseDocumentStore;
class DatabaseClient {
}
exports.DatabaseClient = DatabaseClient;
di_1.registerProvider({
    scope: di_1.ProviderScope.SINGLETON,
    provide: BaseDocumentStore,
    useValue: exports.databaseClient,
});
di_1.registerProvider({
    scope: di_1.ProviderScope.REQUEST,
    provide: DatabaseClient,
    useFactory: exports.getDatabaseSession,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaWVudHMvZGF0YWJhc2UuY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlDQUEyRDtBQUMzRCw0Q0FBMkM7QUFDM0MscUNBTWlCO0FBQ2pCLG1DQUFvQztBQUNwQyxnRkFBc0M7QUFFL0IsTUFBTSw4QkFBOEIsR0FBRyxLQUFLLElBQUksRUFBRTtJQUN2RCxNQUFNLFNBQVMsR0FDYixDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FDdEMsdUJBQVcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUN0QyxJQUFJLENBQUMsdUJBQVcsQ0FBQyxvQkFBb0IsQ0FBQztJQUV6QyxNQUFNLGNBQWMsR0FBRyxTQUFTO1FBQzlCLENBQUMsQ0FBQyxJQUFJLHVCQUFhLENBQUMsQ0FBQyx1QkFBVyxDQUFDLGFBQWEsQ0FBQyxFQUFFLHVCQUFXLENBQUMsYUFBYSxDQUFDO1FBQzNFLENBQUMsQ0FBQyxJQUFJLHVCQUFhLENBQ2YsQ0FBQyx1QkFBVyxDQUFDLGFBQWEsQ0FBQyxFQUMzQix1QkFBVyxDQUFDLGFBQWEsRUFDekI7WUFDRSxXQUFXLEVBQUUsdUJBQVcsQ0FBQyxvQkFBb0I7WUFDN0MsSUFBSSxFQUFFLEtBQUs7WUFDWCxRQUFRLEVBQUUsdUJBQVcsQ0FBQyxpQkFBaUI7U0FDeEMsQ0FDRixDQUFDO0lBRU4sY0FBYyxDQUFDLFdBQVcsQ0FBQyw2QkFBNkI7UUFDdEQsTUFBTSxDQUFDLGlCQUFpQixDQUFDO0lBRTNCLGNBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUU1QixNQUFNLFFBQVEsR0FBRyxjQUFjLENBQUMsUUFBUSxJQUFJLHVCQUFXLENBQUMsYUFBYSxDQUFDO0lBRXRFLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixN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