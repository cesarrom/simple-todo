import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { ENVIRONMENT } from "../constants";

const SALT_ROUNDS = 10;

const JWT_SECRET = ENVIRONMENT.JWT_SECRET || "";
const ENCRYPTION_KEY = ENVIRONMENT.ENCRYPTION_KEY || ""; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

export function toJwt(payload: any) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: ENVIRONMENT.JWT_EXPIRES_IN,
  });
}

export function fromJwt<R = any>(
  token: string,
  options?: jwt.VerifyOptions
): R {
  return jwt.verify(token, JWT_SECRET, options) as any;
}

export function renewJwt(token: string): string {
  const payload = fromJwt(token, { ignoreExpiration: true });
  if (payload.exp) delete payload.exp;
  if (payload.iat) delete payload.iat;
  const newToken = toJwt({ ...payload });
  return newToken;
}

export function encrypt(text: string) {
  const iv = crypto.randomBytes(IV_LENGTH);

  const key = crypto
    .createHash("sha256")
    .update(String(ENCRYPTION_KEY))
    .digest("base64")
    .substr(0, 32);

  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);

  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decrypt(text: string) {
  const textParts = text.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const key = crypto
    .createHash("sha256")
    .update(String(ENCRYPTION_KEY))
    .digest("base64")
    .substr(0, 32);
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

export function encryptPasswordSync(password: string) {
  return bcrypt.hashSync(password, SALT_ROUNDS);
}

export function comparePasswordSync(
  providedPassword: string,
  actualEncryptedPassword: string
) {
  return bcrypt.compareSync(providedPassword, actualEncryptedPassword);
}

export function encryptPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export function comparePassword(
  providedPassword: string,
  actualEncryptedPassword: string
) {
  return bcrypt.compare(providedPassword, actualEncryptedPassword);
}
