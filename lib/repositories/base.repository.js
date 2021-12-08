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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = exports.PBaseRepository = void 0;
const lodash_1 = require("lodash");
const database_client_1 = require("../clients/database.client");
const bluebird_1 = __importDefault(require("bluebird"));
const transactional_service_annotation_1 = require("../annotations/transactional-service.annotation");
const uuid_1 = require("uuid");
const entity_utils_1 = require("../utils/entity-utils");
let PBaseRepository = class PBaseRepository {
    constructor(tableName, Class, dbClient) {
        this.tableName = tableName;
        this.Class = Class;
        this.dbClient = dbClient;
        this.dbClient = dbClient;
    }
    getId(obj) {
        return this.dbClient.advanced.getDocumentId(obj);
    }
    async forceCommit() {
        await this.dbClient.saveChanges();
        this.dbClient = database_client_1.getDatabaseSession();
    }
    async create(data) {
        const target = this.copyEntity(this.cleanObjectRelationships({ ...data }));
        target.createdAt = new Date();
        target._refId = target._refId || uuid_1.v4();
        const id = entity_utils_1.extractId(target);
        const refId = target._refId;
        await this.dbClient.store(this.copyEntity(target), id);
        data["createdAt"] = target.createdAt;
        data["_refId"] = data["_refId"] || refId;
        data["id"] = entity_utils_1.extractId(data["id"]);
        return this.copyEntity(data);
    }
    async createAll(data) {
        const result = await bluebird_1.default.mapSeries(data, (item) => this.create(item));
        return result;
    }
    async fetchRelationships(entity, includes, root = true) {
        if (!entity || !includes.length) {
            return entity;
        }
        await bluebird_1.default.mapSeries(includes, async (include) => {
            const comps = include.split(".");
            const including = comps.shift().replace("[]", "").replace("()", "");
            const id = lodash_1.get(entity, [including]);
            const fetchRel = async (rel) => {
                let e = null;
                if (!lodash_1.isString(rel)) {
                    e = rel;
                }
                else {
                    e = await this.dbClient.load(rel);
                }
                e.id = entity_utils_1.extractId(rel);
                if (comps.length) {
                    await this.fetchRelationships(e, comps, false);
                }
                return lodash_1.isArray(e) || lodash_1.isObjectLike(e)
                    ? JSON.parse(JSON.stringify(e))
                    : e;
            };
            if (lodash_1.isString(id)) {
                lodash_1.set(entity, [including], await fetchRel(id));
            }
            else if (lodash_1.isArray(id)) {
                const arr = await bluebird_1.default.map(id, fetchRel);
                lodash_1.set(entity, [including], arr);
            }
        });
        return root ? this.copyEntity(entity) : JSON.parse(JSON.stringify(entity));
    }
    async findById(id) {
        return this.dbClient
            .load(id, this.Class)
            .then((entity) => this.copyEntity({ ...entity, id }))
            .catch((e) => {
            console.error(e);
            return null;
        });
    }
    async deleteById(id) {
        await this.updateById(id, { deletedAt: new Date() });
    }
    async hardDeleteById(id) {
        await this.dbClient.delete(id);
    }
    async updateById(id, payload) {
        const entity = await this.dbClient.load(id);
        const target = this.copyEntity(this.cleanObjectRelationships({ ...payload }));
        target.updatedAt = new Date();
        if (!entity) {
            throw new Error(this.tableName + " with id: [" + id + "] not found");
        }
        Object.assign(entity, target);
        const merging = JSON.parse(JSON.stringify({ ...entity }));
        if (!("_refId" in payload)) {
            payload["_refId"] = entity["_refId"];
        }
        if ("id" in payload) {
            delete merging.id;
        }
        Object.assign(payload, merging);
        return this.copyEntity(payload);
    }
    copyEntity(entity) {
        const Class = this.Class;
        return new Class(entity);
    }
    cleanObjectRelationships(obj) {
        const newObject = {};
        const getValue = (obj) => {
            if (lodash_1.isArray(obj)) {
                return obj.map(getValue);
            }
            if (obj instanceof Date) {
                return obj;
            }
            if (lodash_1.isObjectLike(obj) && (obj.id || obj._refId)) {
                return obj.id || obj._refId;
            }
            if (lodash_1.isObjectLike(obj)) {
                return this.cleanObjectRelationships(obj);
            }
            return obj;
        };
        Object.keys(obj).forEach((key) => {
            newObject[key] = getValue(obj[key]);
        });
        return newObject;
    }
    startQuery(options = {}) {
        const query = this.dbClient
            .query({ collection: this.tableName })
            .ofType(this.Class)
            .not()
            .whereExists("deletedAt");
        if (options.disableProxy) {
            return query;
        }
        return new Proxy(query, {
            get: (target, p) => {
                if (p === "all")
                    return () => target
                        .all()
                        .then((r) => bluebird_1.default.map(r, (i) => this.copyEntity(i || {})));
                if (p === "first")
                    return () => target.first().then((r) => this.copyEntity(r || {}));
                if (p === "firstOrNull")
                    return () => target.firstOrNull().then((r) => r && this.copyEntity(r || {}));
                return target[p];
            },
        });
    }
    startListQuery(params) {
        const { orderBy = [], size, page, includes = [] } = params;
        let query = this.startQuery(params);
        if (size) {
            query = query.take(size);
        }
        if (page && size) {
            query = query.skip(page * size);
        }
        includes.forEach((include) => {
            query = query.include(include);
        });
        orderBy.forEach((item) => {
            query = query.addOrder(item.key, !!item.desc);
        });
        this.buildQuery(query, params);
        if (params.includes && params.includes.length && !params.disableProxy) {
            return new Proxy(query, {
                get: (target, p) => {
                    if (p === "all")
                        return () => {
                            return target
                                .all()
                                .then((r) => bluebird_1.default.map(r, (i) => this.fetchRelationships(i, params.includes)));
                        };
                    if (p === "first")
                        return () => {
                            return target
                                .first()
                                .then((r) => this.fetchRelationships(r, params.includes));
                        };
                    if (p === "firstOrNull")
                        return () => {
                            return target
                                .firstOrNull()
                                .then((r) => r && this.fetchRelationships(r, params.includes));
                        };
                    return target[p];
                },
            });
        }
        return query;
    }
    countAll(params) {
        return this.startQuery(params).count();
    }
    getAll(params) {
        return this.startListQuery(params).all();
    }
    async updateAll(cb, params) {
        const results = await this.getAll({
            ...params,
            disableProxy: true,
        });
        return await bluebird_1.default.map(results, async (item) => {
            await cb(item);
            return item;
        }, { concurrency: 3 });
    }
    async deleteAll(params) {
        const results = await this.updateAll((item) => {
            item.deletedAt = new Date();
        }, params);
        return results.map((r) => entity_utils_1.extractId(r));
    }
};
PBaseRepository = __decorate([
    transactional_service_annotation_1.Transactional(),
    __metadata("design:paramtypes", [String, Object, database_client_1.DatabaseClient])
], PBaseRepository);
exports.PBaseRepository = PBaseRepository;
const BaseRepository = (Class) => {
    let ModifiedBaseRepo = class ModifiedBaseRepo extends PBaseRepository {
        constructor(faunaCli) {
            super(Class.tableName, Class, faunaCli);
        }
    };
    ModifiedBaseRepo = __decorate([
        transactional_service_annotation_1.Transactional(),
        __metadata("design:paramtypes", [database_client_1.DatabaseClient])
    ], ModifiedBaseRepo);
    return ModifiedBaseRepo;
};
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5yZXBvc2l0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JlcG9zaXRvcmllcy9iYXNlLnJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW1FO0FBQ25FLGdFQUFnRjtBQUVoRix3REFBZ0M7QUFDaEMsc0dBQWdGO0FBQ2hGLCtCQUFrQztBQUNsQyx3REFBa0Q7QUFZbEQsSUFBc0IsZUFBZSxHQUFyQyxNQUFzQixlQUFlO0lBSW5DLFlBQ1MsU0FBaUIsRUFDZCxLQUFvQixFQUNwQixRQUF3QjtRQUYzQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBZTtRQUNwQixhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQUVsQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUc7UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVc7UUFDZixNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxvQ0FBa0IsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLElBQU87UUFDbEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUUzRSxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDOUIsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLFNBQUksRUFBRSxDQUFDO1FBQ3hDLE1BQU0sRUFBRSxHQUFHLHdC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