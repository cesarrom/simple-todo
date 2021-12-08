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
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.encryptPassword = exports.comparePasswordSync = exports.encryptPasswordSync = exports.decrypt = exports.encrypt = exports.renewJwt = exports.fromJwt = exports.toJwt = void 0;
const crypto = __importStar(require("crypto"));
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcrypt"));
const constants_1 = require("../constants");
const SALT_ROUNDS = 10;
const JWT_SECRET = constants_1.ENVIRONMENT.JWT_SECRET || "";
const ENCRYPTION_KEY = constants_1.ENVIRONMENT.ENCRYPTION_KEY || "";
const IV_LENGTH = 16;
function toJwt(payload) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: constants_1.ENVIRONMENT.JWT_EXPIRES_IN,
    });
}
exports.toJwt = toJwt;
function fromJwt(token, options) {
    return jwt.verify(token, JWT_SECRET, options);
}
exports.fromJwt = fromJwt;
function renewJwt(token) {
    const payload = fromJwt(token, { ignoreExpiration: true });
    if (payload.exp)
        delete payload.exp;
    if (payload.iat)
        delete payload.iat;
    const newToken = toJwt({ ...payload });
    return newToken;
}
exports.renewJwt = renewJwt;
function encrypt(text) {
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
exports.encrypt = encrypt;
function decrypt(text) {
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
exports.decrypt = decrypt;
function encryptPasswordSync(password) {
    return bcrypt.hashSync(password, SALT_ROUNDS);
}
exports.encryptPasswordSync = encryptPasswordSync;
function comparePasswordSync(providedPassword, actualEncryptedPassword) {
    return bcrypt.compareSync(providedPassword, actualEncryptedPassword);
}
exports.comparePasswordSync = comparePasswordSync;
function encryptPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}
exports.encryptPassword = encryptPassword;
function comparePassword(providedPassword, actualEncryptedPassword) {
    return bcrypt.compare(providedPassword, actualEncryptedPassword);
}
exports.comparePassword = comparePassword;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NyeXB0by50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQWlDO0FBQ2pDLGtEQUFvQztBQUNwQywrQ0FBaUM7QUFDakMsNENBQTJDO0FBRTNDLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUV2QixNQUFNLFVBQVUsR0FBRyx1QkFBVyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7QUFDaEQsTUFBTSxjQUFjLEdBQUcsdUJBQVcsQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDO0FBQ3hELE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUVyQixTQUFnQixLQUFLLENBQUMsT0FBWTtJQUNoQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRTtRQUNuQyxTQUFTLEVBQUUsdUJBQVcsQ0FBQyxjQUFjO0tBQ3RDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFKRCxzQkFJQztBQUVELFNBQWdCLE9BQU8sQ0FDckIsS0FBYSxFQUNiLE9BQTJCO0lBRTNCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBUSxDQUFDO0FBQ3ZELENBQUM7QUFMRCwwQkFLQztBQUVELFNBQWdCLFFBQVEsQ0FBQyxLQUFhO0lBQ3BDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzNELElBQUksT0FBTyxDQUFDLEdBQUc7UUFBRSxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDcEMsSUFBSSxPQUFPLENBQUMsR0FBRztRQUFFLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQztJQUNwQyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDdkMsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQU5ELDRCQU1DO0FBRUQsU0FBZ0IsT0FBTyxDQUFDLElBQVk7SUFDbEMsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUV6QyxNQUFNLEdBQUcsR0FBRyxNQUFNO1NBQ2YsVUFBVSxDQUFDLFFBQVEsQ0FBQztTQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzlCLE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDaEIsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVqQixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRTFFLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV2RCxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDOUQsQ0FBQztBQWZELDBCQWVDO0FBRUQsU0FBZ0IsT0FBTyxDQUFDLElBQVk7SUFDbEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqRCxNQUFNLEdBQUcsR0FBRyxNQUFNO1NBQ2YsVUFBVSxDQUFDLFFBQVEsQ0FBQztTQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzlCLE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDaEIsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqQixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRTlFLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDL0MsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV6RCxPQUFPLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUM5QixDQUFDO0FBZkQsMEJBZUM7QUFFRCxTQUFnQixtQkFBbUIsQ0FBQyxRQUFnQjtJQUNsRCxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFGRCxrREFFQztBQUVELFNBQWdCLG1CQUFtQixDQUNqQyxnQkFBd0IsRUFDeEIsdUJBQStCO0lBRS9CLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7QUFMRCxrREFLQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxRQUFnQjtJQUM5QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFGRCwwQ0FFQztBQUVELFNBQWdCLGVBQWUsQ0FDN0IsZ0JBQXdCLEVBQ3hCLHVCQUErQjtJQUUvQixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztBQUNuRSxDQUFDO0FBTEQsMENBS0MifQ==