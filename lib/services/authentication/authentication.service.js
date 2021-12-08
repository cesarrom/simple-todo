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
exports.AuthenticationService = void 0;
const crypto_1 = require("../../utils/crypto");
const models_1 = require("../../models");
const repositories_1 = require("../../repositories");
const entity_utils_1 = require("../../utils/entity-utils");
const exceptions_1 = require("@tsed/exceptions");
const transactional_service_annotation_1 = require("../../annotations/transactional-service.annotation");
const logger_1 = require("../logger");
const location = "Authentication Service";
let AuthenticationService = class AuthenticationService {
    constructor(credentialRepository, userRepository, log) {
        this.credentialRepository = credentialRepository;
        this.userRepository = userRepository;
        this.log = log;
    }
    async generateUserSession(email, password) {
        this.log.info({
            location,
            message: "Generating session",
        });
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("No credentials match with the provided data");
        }
        return this.loginWithCredentials(entity_utils_1.extractId(user), password);
    }
    async loginWithCredentials(userId, password) {
        this.log.info({
            location,
            message: "Generating session with credentials",
        });
        const credentials = await this.hasCredentials(userId);
        if (!credentials) {
            throw new Error("No credentials match with the provided data");
        }
        const passwordMatches = await crypto_1.comparePassword(password, credentials.password);
        if (!passwordMatches) {
            throw new Error("No credentials match with the provided data");
        }
        return new models_1.Session({
            user: await this.userRepository.findById(userId),
        });
    }
    async hasCredentials(userId) {
        this.log.info({
            location,
            message: "Verifying if user has credentials",
            payload: {
                userId,
            },
        });
        const [credentials] = await this.credentialRepository.getAll({
            userIdIn: [userId],
        });
        return credentials;
    }
    async upsertCredentials(userId, credentials) {
        this.log.info({
            location,
            message: "ensuring credentials for user",
            payload: {
                userId,
            },
        });
        const credentialsExists = await this.hasCredentials(userId);
        if (credentialsExists) {
            return this.updateCredentials(userId, credentials);
        }
        return this.createCredentials(userId, new models_1.Credential(credentials));
    }
    sessionToToken(session) {
        this.log.info({
            location,
            message: "Encoding a session",
            payload: {
                userId: entity_utils_1.extractId(session.user),
            },
        });
        return crypto_1.toJwt({
            userId: entity_utils_1.extractId(session === null || session === void 0 ? void 0 : session.user),
        });
    }
    async tokenToSession(token) {
        try {
            this.log.info({
                location,
                message: "Decoding a session"
            });
            const data = crypto_1.fromJwt(token);
            const user = await this.userRepository.findById(data.passportId);
            return new models_1.Session({
                user,
            });
        }
        catch (e) {
            if ((e === null || e === void 0 ? void 0 : e.message) === "jwt expired") {
                throw new exceptions_1.Exception(401, "Session expired");
            }
            throw e;
        }
    }
    async createCredentials(userId, { password }) {
        this.log.info({
            location,
            message: "generating credentials for user",
            payload: {
                userId,
            },
        });
        const passwordHash = await crypto_1.encryptPassword(password);
        const credentials = await this.credentialRepository.create(new models_1.Credential({
            user: userId,
            password: passwordHash,
            status: "active",
        }));
        await this.userRepository.updateById(userId, {
            credentials: entity_utils_1.extractId(credentials),
        });
        return credentials;
    }
    async updateCredentials(userId, credentials) {
        this.log.info({
            location,
            message: "updating credentials for user",
            payload: {
                userId,
            },
        });
        const existingCredentials = await this.hasCredentials(userId);
        return this.credentialRepository.updateById(existingCredentials.id, new models_1.Credential({
            ...existingCredentials,
            ...(!!credentials.password && {
                password: await crypto_1.encryptPassword(credentials.password),
            }),
            ...(!!credentials.status && { status: credentials.status }),
            user: entity_utils_1.extractId(existingCredentials.user),
            _refId: existingCredentials.id,
        }));
    }
    async signUp(params) {
        this.log.info({
            location,
            message: "Signing up new user"
        });
        const existingUser = await this.userRepository.findByEmail(params.email);
        if (existingUser) {
            throw new exceptions_1.Exception(400, "A user with the provided information already exists");
        }
        const user = await this.userRepository.create(new models_1.User({
            email: params.email,
            name: params.name,
        }));
        if (params.password) {
            await this.upsertCredentials(entity_utils_1.extractId(user), new models_1.Credential({
                user: entity_utils_1.extractId(user),
                password: params.password,
            }));
        }
        return user;
    }
};
AuthenticationService = __decorate([
    transactional_service_annotation_1.Transactional(),
    __metadata("design:paramtypes", [repositories_1.CredentialRepository,
        repositories_1.UserRepository,
        logger_1.LoggerService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUs0QjtBQUM1Qix5Q0FNc0I7QUFDdEIscURBQTBFO0FBQzFFLDJEQUFxRDtBQUNyRCxpREFBNkM7QUFHN0MseUdBQW1GO0FBQ25GLHNDQUEwQztBQUUxQyxNQUFNLFFBQVEsR0FBRyx3QkFBd0IsQ0FBQztBQUcxQyxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQUNoQyxZQUNVLG9CQUEwQyxFQUMxQyxjQUE4QixFQUM5QixHQUFrQjtRQUZsQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixRQUFHLEdBQUgsR0FBRyxDQUFlO0lBQ3pCLENBQUM7SUFFSixLQUFLLENBQUMsbUJBQW1CLENBQUMsS0FBYSxFQUFFLFFBQWdCO1FBQ3ZELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ1osUUFBUTtZQUNSLE9BQU8sRUFBRSxvQkFBb0I7U0FDOUIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxRCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1NBQ2hFO1FBRUQsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsd0JBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsS0FBSyxDQUFDLG9CQUFvQixDQUFDLE1BQWMsRUFBRSxRQUFnQjtRQUN6RCxJQUFJLENBQUMsR0FBRyxDQUFDLElB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