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
let AuthenticationService = class AuthenticationService {
    constructor(credentialRepository, userRepository) {
        this.credentialRepository = credentialRepository;
        this.userRepository = userRepository;
    }
    async generateUserSession(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("No credentials match with the provided data");
        }
        return this.loginWithCredentials(entity_utils_1.extractId(user), password);
    }
    async loginWithCredentials(userId, password) {
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
        const [credentials] = await this.credentialRepository.getAll({
            userIdIn: [userId],
        });
        return credentials;
    }
    async upsertCredentials(userId, credentials) {
        const credentialsExists = await this.hasCredentials(userId);
        if (credentialsExists) {
            return this.updateCredentials(userId, credentials);
        }
        return this.createCredentials(userId, new models_1.Credential(credentials));
    }
    sessionToToken(session) {
        return crypto_1.toJwt({
            userId: entity_utils_1.extractId(session === null || session === void 0 ? void 0 : session.user),
        });
    }
    async tokenToSession(token) {
        try {
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
        repositories_1.UserRepository])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUs0QjtBQUM1Qix5Q0FNc0I7QUFDdEIscURBQTBFO0FBQzFFLDJEQUFxRDtBQUNyRCxpREFBNkM7QUFHN0MseUdBQW1GO0FBR25GLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBQ2hDLFlBQ1Usb0JBQTBDLEVBQzFDLGNBQThCO1FBRDlCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQ3JDLENBQUM7SUFFSixLQUFLLENBQUMsbUJBQW1CLENBQUMsS0FBYSxFQUFFLFFBQWdCO1FBQ3ZELE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFMUQsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztTQUNoRTtRQUVELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLHdCQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxNQUFjLEVBQUUsUUFBZ0I7UUFDekQsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRELElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1NBQ2hFO1FBRUQsTUFBTSxlQUFlLEdBQUcsTUFBTSx3QkFBZSxDQUMzQyxRQUFRLEVBQ1IsV0FBVyxDQUFDLFFB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