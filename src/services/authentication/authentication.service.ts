import {
  comparePassword,
  encryptPassword,
  fromJwt,
  toJwt,
} from "../../utils/crypto";
import {
  CredentialConstructor,
  Session,
  SessionConstructor,
  Credential,
  User,
} from "../../models";
import { CredentialRepository, UserRepository } from "../../repositories";
import { extractId } from "../../utils/entity-utils";
import { Exception } from "@tsed/exceptions";
import { GENERAL_STATUSES } from "../../constants";
import { UserSignUpRequest } from "../../controllers/requests/user-sign-up.request";
import { Transactional } from "../../annotations/transactional-service.annotation";
import { LoggerService } from "../logger";

const location = "Authentication Service";

@Transactional()
export class AuthenticationService {
  constructor(
    private credentialRepository: CredentialRepository,
    private userRepository: UserRepository,
    private log: LoggerService
  ) {}

  async generateUserSession(email: string, password: string) {
    this.log.info({
      location,
      message: "Generating session",
    });

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("No credentials match with the provided data");
    }

    return this.loginWithCredentials(extractId(user), password);
  }

  async loginWithCredentials(userId: string, password: string) {
    this.log.info({
      location,
      message: "Generating session with credentials",
    });

    const credentials = await this.hasCredentials(userId);

    if (!credentials) {
      throw new Error("No credentials match with the provided data");
    }

    const passwordMatches = await comparePassword(
      password,
      credentials.password
    );

    if (!passwordMatches) {
      throw new Error("No credentials match with the provided data");
    }

    return new Session({
      user: await this.userRepository.findById(userId),
    });
  }

  async hasCredentials(userId: string): Promise<CredentialConstructor> {
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

  async upsertCredentials(
    userId: string,
    credentials: Partial<CredentialConstructor>
  ) {
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

    return this.createCredentials(userId, new Credential(credentials));
  }

  sessionToToken(session: SessionConstructor) {
    this.log.info({
      location,
      message: "Encoding a session",
      payload: {
        userId: extractId(session.user),
      },
    });

    return toJwt({
      userId: extractId(session?.user),
    });
  }

  async tokenToSession(token: string) {
    try {
      this.log.info({
        location,
        message: "Decoding a session"
      });

      const data: {
        passportId: string;
        spaceId: string;
        originalSession?: string;
        billingProjectId?: string;
      } = fromJwt(token);

      const user = await this.userRepository.findById(data.passportId);

      return new Session({
        user,
      });
    } catch (e) {
      if (e?.message === "jwt expired") {
        throw new Exception(401, "Session expired");
      }

      throw e;
    }
  }

  private async createCredentials(
    userId: string,
    { password }: CredentialConstructor
  ) {
    this.log.info({
      location,
      message: "generating credentials for user",
      payload: {
        userId,
      },
    });

    const passwordHash = await encryptPassword(password);

    const credentials = await this.credentialRepository.create(
      new Credential({
        user: userId,
        password: passwordHash,
        status: GENERAL_STATUSES.ACTIVE,
      })
    );

    await this.userRepository.updateById(userId, {
      credentials: extractId(credentials),
    });

    return credentials;
  }

  private async updateCredentials(
    userId: string,
    credentials: Partial<CredentialConstructor>
  ) {
    this.log.info({
      location,
      message: "updating credentials for user",
      payload: {
        userId,
      },
    });

    const existingCredentials = await this.hasCredentials(userId);

    return this.credentialRepository.updateById(
      existingCredentials.id,
      new Credential({
        ...existingCredentials,
        ...(!!credentials.password && {
          password: await encryptPassword(credentials.password),
        }),
        ...(!!credentials.status && { status: credentials.status }),
        user: extractId(existingCredentials.user),
        _refId: existingCredentials.id,
      })
    );
  }

  async signUp(params: UserSignUpRequest) {
    this.log.info({
      location,
      message: "Signing up new user"
    });

    const existingUser = await this.userRepository.findByEmail(params.email);

    if (existingUser) {
      throw new Exception(
        400,
        "A user with the provided information already exists"
      );
    }

    const user = await this.userRepository.create(
      new User({
        email: params.email,
        name: params.name,
      })
    );

    if (params.password) {
      await this.upsertCredentials(
        extractId(user),
        new Credential({
          user: extractId(user),
          password: params.password,
        })
      );
    }

    return user;
  }
}
