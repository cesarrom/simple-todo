"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentialRepository = exports.CredentialRepository = void 0;
const database_client_1 = require("../clients/database.client");
const transactional_service_annotation_1 = require("../annotations/transactional-service.annotation");
const models_1 = require("../models");
const base_repository_1 = require("./base.repository");
let CredentialRepository = class CredentialRepository extends base_repository_1.BaseRepository(models_1.Credential) {
    buildQuery(query, params) {
        if (params.userIdIn) {
            query.whereIn("user", params.userIdIn);
        }
        return query;
    }
};
CredentialRepository = __decorate([
    transactional_service_annotation_1.Transactional()
], CredentialRepository);
exports.CredentialRepository = CredentialRepository;
exports.credentialRepository = new CredentialRepository(database_client_1.getDatabaseSession());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlZGVudGlhbC5yZXBvc2l0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JlcG9zaXRvcmllcy9jcmVkZW50aWFsLnJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsZ0VBQWdFO0FBQ2hFLHNHQUFnRjtBQUNoRixzQ0FBdUM7QUFDdkMsdURBQW1EO0FBUW5ELElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEsZ0NBQWMsQ0FHdEQsbUJBQVUsQ0FBQztJQUNYLFVBQVUsQ0FDUixLQUFpQyxFQUNqQyxNQUF1QjtRQUV2QixJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDbkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3hDO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0YsQ0FBQTtBQWRZLG9CQUFvQjtJQURoQyxnREFBYSxFQUFFO0dBQ0gsb0JBQW9CLENBY2hDO0FBZFksb0RBQW9CO0FBZ0JwQixRQUFBLG9CQUFvQixHQUFHLElBQUksb0JBQW9CLENBQzFELG9DQUFrQixFQUFFLENBQ3JCLENBQUMifQ==