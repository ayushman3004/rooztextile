import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";
import { getAllProducts, createProduct } from "@/lib/products-db";
import { getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const products = await getAllProducts();
    const db = await getDb();

    return NextResponse.json({
      success: true,
      products,
      isDbConnected: !!db,
    });
  } catch (error) {
    console.error("GET /api/admin/products error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { success: false, message: "Product name is required." },
        { status: 400 }
      );
    }

    const newProduct = await createProduct(body);

    return NextResponse.json({
      success: true,
      product: newProduct,
      message: "Product created successfully in database.",
    });
  } catch (error) {
    console.error("POST /api/admin/products error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to create product",
      },
      { status: 500 }
    );
  }
}
