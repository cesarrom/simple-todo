"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseClient = exports.BaseDocumentStore = exports.initializeAndGetDatabaseClient = exports.getDatabaseSession = exports.databaseClient = void 0;
const di_1 = require("@tsed/di");
const constants_1 = require("../constants");
const ravendb_1 = require("ravendb");
const lodash_1 = require("lodash");
let isDatabaseInitialized = false;
const isLocalDb = !!["localhost", "127.0.0.1"].find((h) => constants_1.ENVIRONMENT.DATABASE_HOST.includes(h)) || !constants_1.ENVIRONMENT.DATABASE_CERTIFICATE;
exports.databaseClient = new ravendb_1.DocumentStore([constants_1.ENVIRONMENT.DATABASE_HOST], constants_1.ENVIRONMENT.DATABASE_NAME, {
    ...(!!isLocalDb && {
        certificate: constants_1.ENVIRONMENT.DATABASE_CERTIFICATE,
        type: "pfx",
        password: constants_1.ENVIRONMENT.DATABASE_PASSWORD,
    }),
});
exports.databaseClient.conventions.maxNumberOfRequestsPerSession =
    Number.POSITIVE_INFINITY;
exports.databaseClient.initialize();
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
const initializeAndGetDatabaseClient = async () => {
    if (!!isDatabaseInitialized)
        return exports.databaseClient;
    const database = exports.databaseClient.database || constants_1.ENVIRONMENT.DATABASE_NAME;
    if (!database) {
        throw new Error("Value cannot be null or whitespace");
    }
    try {
        await exports.databaseClient.maintenance
            .forDatabase(database)
            .send(new ravendb_1.GetStatisticsOperation());
    }
    catch (e) {
        try {
            const databaseRecord = { databaseName: database };
            await exports.databaseClient.maintenance.server.send(new ravendb_1.CreateDatabaseOperation(databaseRecord));
        }
        catch (ce) {
        }
    }
    isDatabaseInitialized = true;
    return exports.databaseClient;
};
exports.initializeAndGetDatabaseClient = initializeAndGetDatabaseClient;
class BaseDocumentStore extends ravendb_1.DocumentStore {
}
exports.BaseDocumentStore = BaseDocumentStore;
class DatabaseClient {
}
exports.DatabaseClient = DatabaseClient;
di_1.registerProvider({
    scope: di_1.ProviderScope.REQUEST,
    provide: BaseDocumentStore,
    useAsyncFactory: exports.initializeAndGetDatabaseClient,
});
di_1.registerProvider({
    scope: di_1.ProviderScope.REQUEST,
    provide: DatabaseClient,
    useFactory: exports.getDatabaseSession,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaWVudHMvZGF0YWJhc2UuY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUEyRDtBQUMzRCw0Q0FBMkM7QUFDM0MscUNBTWlCO0FBQ2pCLG1DQUFvQztBQUVwQyxJQUFJLHFCQUFxQixHQUFHLEtBQUssQ0FBQztBQUVsQyxNQUFNLFNBQVMsR0FDYixDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FDdEMsdUJBQVcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUN0QyxJQUFJLENBQUMsdUJBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUU1QixRQUFBLGNBQWMsR0FBRyxJQUFJLHVCQUFhLENBQzdDLENBQUMsdUJBQVcsQ0FBQyxhQUFhLENBQUMsRUFDM0IsdUJBQVcsQ0FBQyxhQUFhLEVBQ3pCO0lBQ0UsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUk7UUFDakIsV0FBVyxFQUFFLHVCQUFXLENBQUMsb0JBQW9CO1FBQzdDLElBQUksRUFBRSxLQUFLO1FBQ1gsUUFBUSxFQUFFLHVCQUFXLENBQUMsaUJBQWlCO0tBQ3hDLENBQUM7Q0FDSCxDQUNGLENBQUM7QUFFRixzQkFBYyxDQUFDLFdBQVcsQ0FBQyw2QkFBNkI7SUFDdEQsTUFBTSxDQUFDLGlCQUFpQixDQUFDO0FBRTNCLHNCQUFjLENBQUMsVUFBVSxFQUFFLENBQUM7QUFFckIsTUFBTSxrQkFBa0IsR0FBRyxHQUFtQixFQUFFO0lBQ3JELElBQUksT0FBTyxHQUFtQixzQkFBYyxDQUFDLFdBQVcsRUFBUyxDQUFDO0lBQ2xFLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO1FBQ3hCLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNkLElBQUksR0FBRyxLQUFLLGFBQWEsRUFBRTtnQkFDekIsT0FBTyxHQUFHLEVBQUU7b0JBQ1YsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDO29CQUNsQixPQUFPLEdBQUcsc0JBQWMsQ0FBQyxXQUFXLEVBQVMsQ0FBQztvQkFDOUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3pCLENBQUMsQ0FBQzthQUNIO1lBRUQsSUFBSSxHQUFHLEtBQUssY0FBYyxFQUFFO2dCQUMxQixPQUFPLEdBQUcsRUFBRTtvQkFDVixPQUFPLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDL0IsQ0FBQyxDQUFDO2FBQ0g7WUFFRCxJQUFJLG1CQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzVCLE9BQU8sQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO29CQUNqQixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUMvQixDQUFDLENBQUM7YUFDSDtZQUVELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLENBQUM7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUEzQlcsUUFBQSxrQkFBa0Isc0JBMkI3QjtBQUVLLE1BQU0sOEJBQThCLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFFdkQsSUFBSSxDQUFDLENBQUMscUJBQXFCO1FBQUUsT0FBTyxzQkFBYyxDQUFDO0lBRW5ELE1BQU0sUUFBUSxHQUFHLHNCQUFjLENBQUMsUUFBUSxJQUFJLHVCQUFXLENBQUMsYUFBYSxDQUFDO0lBRXRFLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7S0FDdkQ7SUFFRCxJQUFJO1FBQ0YsTUFBTSxzQkFBYyxDQUFDLFdBQVc7YUFDN0IsV0FBVyxDQUFDLFFBQVEsQ0FBQzthQUNyQixJQUFJLENBQUMsSUFBSSxnQ0FBc0IsRUFBRSxDQUFDLENBQUM7S0FDdkM7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLElBQUk7WUFDRixNQUFNLGNBQWMsR0FBbUIsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLENBQUM7WUFDbEUsTUFBTSxzQkFBYyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUMxQyxJQUFJLGlDQUF1QixDQUFDLGNBQWMsQ0FBQyxDQUM1QyxDQUFDO1NBQ0g7UUFBQyxPQUFPLEVBQUUsRUFBRTtTQUVaO0tBQ0Y7SUFFRCxxQkFBcUIsR0FBRyxJQUFJLENBQUM7SUFFN0IsT0FBTyxzQkFBYyxDQUFDO0FBQ3hCLENBQUMsQ0FBQTtBQTVCWSxRQUFBLDhCQUE4QixrQ0E0QjFDO0FBRUQsTUFBYSxpQkFBa0IsU0FBUSx1QkFBYTtDQUFHO0FBQXZELDhDQUF1RDtBQU12RCxNQUFzQixjQUFjO0NBQUc7QUFBdkMsd0NBQXVDO0FBRXZDLHFCQUFnQixDQUFDO0lBQ2YsS0FBSyxFQUFFLGtCQUFhLENBQUMsT0FBTztJQUM1QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLGVBQWUsRUFBRSxzQ0FBOEI7Q0FDaEQsQ0FBQyxDQUFDO0FBRUgscUJBQWdCLENBQUM7SUFDZixLQUFLLEVBQUUsa0JBQWEsQ0FBQyxPQUFPO0lBQzVCLE9BQU8sRUFBRSxjQUFjO0lBQ3ZCLFVBQVUsRUFBRSwwQkFBa0I7Q0FDL0IsQ0FBQyxDQUFDIn0=