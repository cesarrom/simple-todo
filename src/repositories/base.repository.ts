import { get, isArray, isObjectLike, isString, set } from "lodash";
import { DatabaseClient, getDatabaseSession } from "../clients/database.client";
import { BaseModel } from "../models/base.model";
import BPromise from "bluebird";
import { Transactional } from "../annotations/transactional-service.annotation";
import { v4 as uuid } from "uuid";
import { extractId } from "../utils/entity-utils";
import { IDocumentQuery } from "ravendb";

export type SearchQuerySpec = {
  orderBy?: { key: string; desc: boolean }[];
  size?: number;
  page?: number;
  includes?: string[];
  disableProxy?: boolean;
};

@Transactional()
export abstract class PBaseRepository<
  T extends BaseModel = never,
  Q = unknown
> {
  constructor(
    public tableName: string,
    protected Class: { new (): T },
    protected dbClient: DatabaseClient
  ) {
    this.dbClient = dbClient;
  }

  getId(obj) {
    return this.dbClient.advanced.getDocumentId(obj);
  }

  async forceCommit() {
    await this.dbClient.saveChanges();
    this.dbClient = getDatabaseSession();
  }

  async create(data: T): Promise<T> {
    const target = this.copyEntity(this.cleanObjectRelationships({ ...data }));

    target.createdAt = new Date();
    target._refId = target._refId || uuid();
    const id = extractId(target);
    const refId = target._refId;

    await this.dbClient.store(this.copyEntity(target), id);

    data["createdAt"] = target.createdAt;
    data["_refId"] = data["_refId"] || refId;
    data["id"] = extractId(data["id"]);

    return this.copyEntity(data);
  }

  async createAll(data: T[]): Promise<T[]> {
    const result = await BPromise.mapSeries(data, (item) => this.create(item));

    return result;
  }

  async fetchRelationships(entity: T, includes: string[], root = true) {
    if (!entity || !includes.length) {
      return entity;
    }

    await BPromise.mapSeries(includes, async (include) => {
      const comps = include.split(".");
      const including = comps.shift().replace("[]", "").replace("()", "");

      const id = get(entity, [including]);

      const fetchRel = async (rel: string | T) => {
        let e = null;
        if (!isString(rel)) {
          e = rel;
        } else {
          e = await this.dbClient.load(rel);
        }

        e.id = extractId(rel);

        if (comps.length) {
          await this.fetchRelationships(e, comps, false);
        }

        return isArray(e) || isObjectLike(e)
          ? JSON.parse(JSON.stringify(e))
          : e;
      };

      if (isString(id)) {
        set(entity, [including], await fetchRel(id));
      } else if (isArray(id)) {
        const arr = await BPromise.map(id, fetchRel);

        set(entity, [including], arr);
      }
    });

    return root ? this.copyEntity(entity) : JSON.parse(JSON.stringify(entity));
  }

  async findById(id: string): Promise<T> {
    return this.dbClient
      .load<T>(id, this.Class as never)
      .then((entity) => this.copyEntity({ ...entity, id }))
      .catch((e) => {
        console.error(e);
        return null;
      });
  }

  async deleteById(id: string): Promise<void> {
    await this.updateById(id, { deletedAt: new Date() } as never);
  }

  async hardDeleteById(id: string): Promise<void> {
    await this.dbClient.delete(id);
  }

  async updateById(id: string, payload: Partial<T>): Promise<T> {
    const entity = await this.dbClient.load(id);

    const target = this.copyEntity(
      this.cleanObjectRelationships({ ...payload })
    );
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

  private copyEntity<X = never>(entity: X): T {
    const Class = this.Class as (new (...args: unknown[]) => T);
    return new Class(entity);
  }

  private cleanObjectRelationships<X>(obj: X): X {
    const newObject = {} as Record<string, unknown>;

    const getValue = (obj) => {
      if (isArray(obj)) {
        return obj.map(getValue);
      }

      if (obj instanceof Date) {
        return obj;
      }

      if (isObjectLike(obj) && (obj.id || obj._refId)) {
        return obj.id || obj._refId;
      }

      if (isObjectLike(obj)) {
        return this.cleanObjectRelationships(obj);
      }

      return obj;
    };

    Object.keys(obj).forEach((key) => {
      newObject[key] = getValue(obj[key]);
    });

    return newObject as X;
  }

  abstract buildQuery(query: IDocumentQuery<T>, params: Q): IDocumentQuery<T>;

  protected startQuery(options: { disableProxy?: boolean } = {}) {
    const query = this.dbClient
      .query<T>({ collection: this.tableName })
      .ofType(this.Class)
      .not()
      .whereExists("deletedAt");

    if (options.disableProxy) {
      return query;
    }

    return new Proxy(query, {
      get: (target, p: string | symbol) => {
        if (p === "all")
          return () =>
            target
              .all()
              .then((r) => BPromise.map(r, (i) => this.copyEntity(i || {})));

        if (p === "first")
          return () => target.first().then((r) => this.copyEntity(r || {}));

        if (p === "firstOrNull")
          return () =>
            target.firstOrNull().then((r) => r && this.copyEntity(r || {}));

        return target[p];
      },
    });
  }

  protected startListQuery(params: Q & SearchQuerySpec) {
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
        get: (target, p: string | symbol) => {
          if (p === "all")
            return () => {
              return target
                .all()
                .then((r) =>
                  BPromise.map(r, (i) =>
                    this.fetchRelationships(i, params.includes)
                  )
                );
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

  countAll(params: Q & SearchQuerySpec) {
    return this.startQuery(params).count();
  }

  getAll(params: Q & SearchQuerySpec) {
    return this.startListQuery(params).all();
  }

  async updateAll(
    cb: (item: T) => Promise<void> | void,
    params: Q & SearchQuerySpec
  ) {
    const results = await this.getAll({
      ...params,
      disableProxy: true,
    });

    return await BPromise.map(
      results,
      async (item) => {
        await cb(item);
        return item;
      },
      { concurrency: 3 }
    );
  }

  async deleteAll(params: Q & SearchQuerySpec) {
    const results = await this.updateAll((item) => {
      item.deletedAt = new Date();
    }, params);

    return results.map((r) => extractId(r));
  }
}

export const BaseRepository = <T extends BaseModel, Q>(Class: {
  new (): T;
  tableName: string;
}) => {
  @Transactional()
  abstract class ModifiedBaseRepo extends PBaseRepository<T, Q> {
    constructor(faunaCli: DatabaseClient) {
      super(Class.tableName, Class, faunaCli);
    }
  }

  return ModifiedBaseRepo;
};
