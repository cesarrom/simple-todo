"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditTrailRepository = exports.AuditTrailRepository = void 0;
const database_client_1 = require("../clients/database.client");
const transactional_service_annotation_1 = require("../annotations/transactional-service.annotation");
const models_1 = require("../models");
const base_repository_1 = require("./base.repository");
let AuditTrailRepository = class AuditTrailRepository extends base_repository_1.BaseRepository(models_1.AuditTrail) {
    buildQuery(query) {
        return query;
    }
};
AuditTrailRepository = __decorate([
    transactional_service_annotation_1.Transactional()
], AuditTrailRepository);
exports.AuditTrailRepository = AuditTrailRepository;
exports.auditTrailRepository = new AuditTrailRepository(database_client_1.getDatabaseSession());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaXQtdHJhaWwucmVwb3NpdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvYXVkaXQtdHJhaWwucmVwb3NpdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxnRUFBZ0U7QUFDaEUsc0dBQWdGO0FBQ2hGLHNDQUF1QztBQUN2Qyx1REFBbUQ7QUFJbkQsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxnQ0FBYyxDQUFpQixtQkFBVSxDQUFDO0lBQ2xGLFVBQVUsQ0FBQyxLQUFpQztRQUMxQyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Q0FDRixDQUFBO0FBSlksb0JBQW9CO0lBRGhDLGdEQUFhLEVBQUU7R0FDSCxvQkFBb0IsQ0FJaEM7QUFKWSxvREFBb0I7QUFNcEIsUUFBQSxvQkFBb0IsR0FBRyxJQUFJLG9CQUFvQixDQUMxRCxvQ0FBa0IsRUFBRSxDQUNyQixDQUFDIn0=