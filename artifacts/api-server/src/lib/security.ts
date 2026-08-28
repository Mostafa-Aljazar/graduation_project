import {
  createHmac,
  randomBytes,
  scrypt as nodeScrypt,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";
import { logger } from "./logger";
const scrypt = promisify(nodeScrypt);
const configuredSecret = process.env.SESSION_SECRET;
if (!configuredSecret && process.env.NODE_ENV === "production") {
  throw new Error("SESSION_SECRET must be set in production");
}
/** Development-only entropy namespace; production deployments must configure it. */
export const sessionSecret = configuredSecret ?? randomBytes(32).toString("hex");
if (!configuredSecret) logger.warn("Using ephemeral development-only SESSION_SECRET");

export function hashSessionToken(token: string): string {
  return createHmac("sha256", sessionSecret).update(token).digest("hex");
}
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${Buffer.from((await scrypt(password, salt, 64)) as ArrayBuffer).toString("hex")}`;
}
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, value] = stored.split(":");
  if (!salt || !value) return false;
  const actual = Buffer.from((await scrypt(password, salt, 64)) as ArrayBuffer);
  const expected = Buffer.from(value, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}