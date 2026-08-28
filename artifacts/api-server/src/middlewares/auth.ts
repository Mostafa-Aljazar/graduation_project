import { randomBytes } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { and, eq, gt, isNull } from "drizzle-orm";
import { db, sessionsTable, usersTable, type UserRecord } from "@workspace/db";
import { hashSessionToken } from "../lib/security";

export type ApiRole = "admin" | "manager" | "delegate" | "displaced" | "security";
export const apiRole = (user: UserRecord): ApiRole =>
  user.role === "MANAGER"
    ? "manager"
    : user.role === "DELEGATE"
      ? "delegate"
      : user.role === "DISPLACED"
        ? "displaced"
        : "security";
export const hashToken = hashSessionToken;
export const newToken = () => randomBytes(32).toString("base64url");

declare global {
  namespace Express { interface Request { authUser?: UserRecord; sessionToken?: string } }
}

export async function optionalAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const header = req.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : req.cookies?.aqsa_session;
  if (!token) { next(); return; }
  const tokenHash = hashToken(token);
  const [row] = await db.select({ session: sessionsTable, user: usersTable }).from(sessionsTable)
    .innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
    .where(and(eq(sessionsTable.tokenHash, tokenHash), isNull(sessionsTable.revokedAt), gt(sessionsTable.expiresAt, new Date())));
  if (row?.user.active) { req.authUser = row.user; req.sessionToken = token; }
  next();
}
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.authUser) { res.status(401).json({ error: "Authentication required" }); return; }
  next();
}
export const requireRoles = (...roles: ApiRole[]) => (req: Request, res: Response, next: NextFunction): void => {
  if (!req.authUser) { res.status(401).json({ error: "Authentication required" }); return; }
  if (!roles.includes(apiRole(req.authUser))) { res.status(403).json({ error: "Insufficient permissions" }); return; }
  next();
};