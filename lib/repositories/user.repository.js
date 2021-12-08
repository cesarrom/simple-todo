"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.UserRepository = void 0;
const models_1 = require("../models");
const base_repository_1 = require("./base.repository");
const transactional_service_annotation_1 = require("../annotations/transactional-service.annotation");
const database_client_1 = require("../clients/database.client");
const http_client_1 = require("../clients/http.client");
let UserRepository = class UserRepository extends base_repository_1.BaseRepository(models_1.User) {
    constructor(faunaCli, httpClient) {
        super(faunaCli);
        this.httpClient = httpClient;
    }
    buildQuery(query, params) {
        if (params.idIn) {
            query.whereIn("id()", params.idIn);
        }
        return query;
    }
    findByEmail(email) {
        return this.startQuery().whereEquals("email", email).firstOrNull();
    }
    async getUserRandomPicture(seed) {
        return this.httpClient.stream.get(`https://avatars.dicebear.com/api/bottts/${seed}.svg`, {
            responseType: "buffer",
            headers: {
                "Content-Type": "application/octet-stream",
            },
        });
    }
};
UserRepository = __decorate([
    transactional_service_annotation_1.Transactional(),
    __metadata("design:paramtypes", [database_client_1.DatabaseClient, http_client_1.HttpClient])
], UserRepository);
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository(database_client_1.getDatabaseSession(), http_client_1.httpClient);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5yZXBvc2l0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JlcG9zaXRvcmllcy91c2VyLnJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWlDO0FBQ2pDLHVEQUFvRTtBQUVwRSxzR0FBZ0Y7QUFDaEYsZ0VBQWdGO0FBQ2hGLHdEQUFnRTtBQVFoRSxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFlLFNBQVEsZ0NBQWMsQ0FBa0IsYUFBSSxDQUFDO0lBQ3ZFLFlBQVksUUFBd0IsRUFBVSxVQUFzQjtRQUNsRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFENEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUVwRSxDQUFDO0lBRUQsVUFBVSxDQUNSLEtBQTJCLEVBQzNCLE1BQWlCO1FBRWpCLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtZQUNmLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFhO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckUsQ0FBQztJQUVELEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxJQUFZO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUMvQiwyQ0FBMkMsSUFBSSxNQUFNLEVBQ3JEO1lBQ0UsWUFBWSxFQUFFLFFBQVE7WUFDdEIsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSwwQkFBMEI7YUFDM0M7U0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQS9CWSxjQUFjO0lBRDFCLGdEQUFhLEVBQUU7cUNBRVEsZ0NBQWMsRUFBc0Isd0JBQVU7R0FEekQsY0FBYyxDQStCMUI7QUEvQlksd0NBQWM7QUFpQ2QsUUFBQSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQzlDLG9DQUFrQixFQUFFLEVBQ3BCLHdCQUF3QixDQUN6QixDQUFDIn0=