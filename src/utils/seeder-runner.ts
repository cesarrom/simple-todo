import config from "./load-env";

config(`${__dirname}/../../config/env`);

import * as fs from "fs";
import Bluebird from "bluebird";
import { BaseModel } from "../models/base.model";
import { BaseRepository } from "../repositories/base.repository";
import { getDatabaseSession } from "../clients/database.client";
import { IDocumentQuery } from "ravendb";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const args = require("args-parser")(process.argv);

export class Migrations extends BaseModel {
  name: string;

  public static readonly tableName = "migrations";
  constructor(params: Partial<Migrations> = {}) {
    super(params, Migrations.tableName);
  }
}

export class MigrationRepository extends BaseRepository<Migrations, unknown>(
  Migrations
) {
  buildQuery(query: IDocumentQuery<Migrations>): IDocumentQuery<Migrations> {
    return query;
  }
  async deleteByName(name: string) {
    const migrations = await this.startQuery().whereEquals("name", name).all();

    for (const migration of migrations) {
      await this.deleteById(migration.id);
    }
  }

  async findByName(name: string) {
    const count = await this.startQuery().count();

    if (!count) return null;

    return this.startQuery().whereEquals("name", name).first();
  }
}

const migrationRepository = new MigrationRepository(getDatabaseSession());

const BASE_DIR = __dirname + "/../models/seeders";

const runSeeders = async (operation = "up") => {
  console.log("starting migration with operation: " + op);

  if (!fs.existsSync(BASE_DIR)) return;

  const fileNames = fs.readdirSync(BASE_DIR).sort((a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });

  await Bluebird.mapSeries(fileNames, async (fileName) => {
    try {
      const exists = await migrationRepository.findByName(fileName);

      if (operation === "up" && exists) {
        console.log("not migrating up file: " + fileName);
        return;
      }

      if (operation === "down" && !exists) {
        console.log("not migrating down file: " + fileName);
        return;
      }

      const module = await import(`${BASE_DIR}/${fileName}`).then(
        ({ default: mod }) => mod
      );

      await Bluebird.resolve(module[operation]()).timeout(
        40000,
        new Error(`Timeout on file: ${BASE_DIR}/${fileName}`)
      );

      const migration = new Migrations({
        _refId: fileName,
        name: fileName,
      });

      if (operation === "up") {
        await migrationRepository.create(migration);
      } else if (operation === "down") {
        await migrationRepository.deleteByName(fileName);
      }

      console.log("finished migration " + operation + " for file: " + fileName);
    } catch (e) {
      console.error(e);
    }
  });

  await migrationRepository.forceCommit();
};

const op = args.down ? "down" : "up";

Bluebird.resolve(runSeeders(op))
  .then(() => console.log("migration finished"))
  .catch(console.error)