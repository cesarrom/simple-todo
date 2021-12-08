"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationRepository = exports.Migrations = void 0;
const load_env_1 = __importDefault(require("./load-env"));
load_env_1.default(`${__dirname}/../../config/env`);
const fs = __importStar(require("fs"));
const bluebird_1 = __importDefault(require("bluebird"));
const base_model_1 = require("../models/base.model");
const base_repository_1 = require("../repositories/base.repository");
const database_client_1 = require("../clients/database.client");
const args = require("args-parser")(process.argv);
class Migrations extends base_model_1.BaseModel {
    constructor(params = {}) {
        super(params, Migrations.tableName);
    }
}
exports.Migrations = Migrations;
Migrations.tableName = "migrations";
class MigrationRepository extends base_repository_1.BaseRepository(Migrations) {
    buildQuery(query) {
        return query;
    }
    async deleteByName(name) {
        const migrations = await this.startQuery().whereEquals("name", name).all();
        for (const migration of migrations) {
            await this.deleteById(migration.id);
        }
    }
    async findByName(name) {
        const count = await this.startQuery().count();
        if (!count)
            return null;
        return this.startQuery().whereEquals("name", name).first();
    }
}
exports.MigrationRepository = MigrationRepository;
const migrationRepository = new MigrationRepository(database_client_1.getDatabaseSession());
const BASE_DIR = __dirname + "/../models/seeders";
const runSeeders = async (operation = "up") => {
    console.log("starting migration with operation: " + op);
    if (!fs.existsSync(BASE_DIR))
        return;
    const fileNames = fs.readdirSync(BASE_DIR).sort((a, b) => {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });
    await bluebird_1.default.mapSeries(fileNames, async (fileName) => {
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
            const module = await Promise.resolve().then(() => __importStar(require(`${BASE_DIR}/${fileName}`))).then(({ default: mod }) => mod);
            await bluebird_1.default.resolve(module[operation]()).timeout(40000, new Error(`Timeout on file: ${BASE_DIR}/${fileName}`));
            const migration = new Migrations({
                _refId: fileName,
                name: fileName,
            });
            if (operation === "up") {
                await migrationRepository.create(migration);
            }
            else if (operation === "down") {
                await migrationRepository.deleteByName(fileName);
            }
            console.log("finished migration " + operation + " for file: " + fileName);
        }
        catch (e) {
            console.error(e);
        }
    });
    await migrationRepository.forceCommit();
};
const op = args.down ? "down" : "up";
bluebird_1.default.resolve(runSeeders(op))
    .then(() => console.log("migration finished"))
    .catch(console.error);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZGVyLXJ1bm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9zZWVkZXItcnVubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBZ0M7QUFFaEMsa0JBQU0sQ0FBQyxHQUFHLFNBQVMsbUJBQW1CLENBQUMsQ0FBQztBQUV4Qyx1Q0FBeUI7QUFDekIsd0RBQWdDO0FBQ2hDLHFEQUFpRDtBQUNqRCxxRUFBaUU7QUFDakUsZ0VBQWdFO0FBSWhFLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFbEQsTUFBYSxVQUFXLFNBQVEsc0JBQVM7SUFJdkMsWUFBWSxTQUE4QixFQUFFO1FBQzFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7O0FBTkgsZ0NBT0M7QUFKd0Isb0JBQVMsR0FBRyxZQUFZLENBQUM7QUFNbEQsTUFBYSxtQkFBb0IsU0FBUSxnQ0FBYyxDQUNyRCxVQUFVLENBQ1g7SUFDQyxVQUFVLENBQUMsS0FBaUM7UUFDMUMsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0QsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFZO1FBQzdCLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFM0UsS0FBSyxNQUFNLFNBQVMsSUFBSSxVQUFVLEVBQUU7WUFDbEMsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNyQztJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVSxDQUFDLElBQVk7UUFDM0IsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxF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