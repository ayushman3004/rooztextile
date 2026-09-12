import crypto from "crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { getDb } from "./mongodb";

const COOKIE_NAME = "rooz_admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface AdminPayload {
  email: string;
  role: "admin";
  exp: number;
}

function getSecretKey(): string {
  return process.env.ADMIN_JWT_SECRET || "rooztextile_super_secure_admin_jwt_secret_key_2026";
}

/**
 * Sign payload to generate a tamper-proof session token
 */
export function signToken(payload: AdminPayload): string {
  const secret = getSecretKey();
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${signature}`;
}

/**
 * Verify signed session token
 */
export function verifyToken(token: string): AdminPayload | null {
  try {
    const [data, signature] = token.split(".");
    if (!data || !signature) return null;

    const secret = getSecretKey();
    const expectedSig = crypto.createHmac("sha256", secret).update(data).digest("base64url");

    if (signature !== expectedSig) {
      return null;
    }

    const payload: AdminPayload = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
    if (payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Ensures at least one admin exists in MongoDB.
 * Seeds with ADMIN_EMAIL and ADMIN_PASSWORD from env if not present.
 */
export async function ensureDefaultAdmin(): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    const adminsColl = db.collection("admins");
    const count = await adminsColl.countDocuments();
    if (count === 0) {
      const defaultEmail = (process.env.ADMIN_EMAIL || "admin@rooztextile.com").toLowerCase().trim();
      const defaultPass = process.env.ADMIN_PASSWORD || "adminrooz2026!";
      const hashedPassword = await bcrypt.hash(defaultPass, 10);

      await adminsColl.insertOne({
        email: defaultEmail,
        passwordHash: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`[RoozTextile Admin] Initial admin seeded: ${defaultEmail}`);
    }
  } catch (err) {
    console.error("Error ensuring default admin in MongoDB:", err);
  }
}

/**
 * Authenticates admin by email and password
 */
export async function authenticateAdmin(email: string, pass: string): Promise<boolean> {
  const cleanEmail = email.toLowerCase().trim();
  const envEmail = (process.env.ADMIN_EMAIL || "admin@rooztextile.com").toLowerCase().trim();
  const envPassword = process.env.ADMIN_PASSWORD || "adminrooz2026!";

  // Try authenticating via MongoDB
  const db = await getDb();
  if (db) {
    try {
      await ensureDefaultAdmin();
      const admin = await db.collection("admins").findOne({ email: cleanEmail });
      if (admin && admin.passwordHash) {
        const isMatch = await bcrypt.compare(pass, admin.passwordHash);
        if (isMatch) return true;
      }
    } catch (err) {
      console.error("MongoDB admin query error, falling back to env:", err);
    }
  }

  // Fallback to environment variables
  if (cleanEmail === envEmail && pass === envPassword) {
    return true;
  }

  return false;
}

/**
 * Helper to get current authenticated admin from request cookies
 */
export async function getAdminSessionFromCookies(): Promise<AdminPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

/**
 * Helper to get current authenticated admin from NextRequest
 */
export function getAdminSessionFromRequest(req: NextRequest): AdminPayload | null {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export { COOKIE_NAME, SESSION_DURATION_MS };
