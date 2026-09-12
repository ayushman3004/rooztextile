import { NextRequest, NextResponse } from "next/server";
import {
  authenticateAdmin,
  signToken,
  getAdminSessionFromRequest,
  COOKIE_NAME,
  SESSION_DURATION_MS,
} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const isValid = await authenticateAdmin(email, password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials. Access denied." },
        { status: 401 }
      );
    }

    const exp = Date.now() + SESSION_DURATION_MS;
    const token = signToken({
      email: email.toLowerCase().trim(),
      role: "admin",
      exp,
    });

    const response = NextResponse.json({
      success: true,
      message: "Admin authenticated successfully.",
      admin: { email: email.toLowerCase().trim() },
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor(SESSION_DURATION_MS / 1000),
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, message: "Authentication server error." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    admin: { email: session.email },
  });
}
