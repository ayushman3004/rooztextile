import { getDb } from "./mongodb";
import { Product, productsData } from "@/data/products";

const COLLECTION_NAME = "products";

/**
 * Normalizes MongoDB document into a typed Product object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function docToProduct(doc: any): Product {
  const { _id, ...rest } = doc;
  return {
    ...rest,
    id: rest.id || _id?.toString(),
  } as Product;
}

/**
 * Seed MongoDB collection with default products if empty
 */
export async function seedProductsIfEmpty(): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    const coll = db.collection(COLLECTION_NAME);
    const count = await coll.countDocuments();
    if (count === 0) {
      console.log(`[RoozTextile DB] Seeding ${productsData.length} products into MongoDB...`);
      const docsToInsert = productsData.map((p) => ({
        ...p,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      await coll.insertMany(docsToInsert);
      console.log("[RoozTextile DB] Seeding complete!");
      return true;
    }
  } catch (err) {
    console.error("[RoozTextile DB] Seeding check failed:", err);
  }
  return false;
}

/**
 * Fetch all products from MongoDB with fallback to static catalog
 */
export async function getAllProducts(category?: string, query?: string): Promise<Product[]> {
  const db = await getDb();

  let products: Product[] = [];

  if (db) {
    try {
      await seedProductsIfEmpty();
      const coll = db.collection(COLLECTION_NAME);
      const docs = await coll.find({}).sort({ createdAt: -1 }).toArray();
      if (docs.length > 0) {
        products = docs.map(docToProduct);
      }
    } catch (err) {
      console.error("[RoozTextile DB] Failed to query MongoDB products, using static fallback:", err);
    }
  }

  // Fallback to static catalog if DB returned nothing or is unavailable
  if (products.length === 0) {
    products = [...productsData];
  }

  // Apply filters if provided
  if (category && category !== "all") {
    products = products.filter((p) => {
      if (category === "blazers") return p.category === "blazers";
      if (category === "school-blazers") return p.category === "blazers";
      if (category === "school-shirts") return p.category === "uniform-sets" || p.category === "shirts";
      if (category === "school-skirts") return p.category === "uniform-sets" || p.category === "skirts";
      return p.category === category;
    });
  }

  if (query && query.trim() !== "") {
    const q = query.toLowerCase().trim();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.weave && p.weave.toLowerCase().includes(q))
    );
  }

  return products;
}

/**
 * Get a single product by ID or Slug
 */
export async function getProductById(idOrSlug: string): Promise<Product | null> {
  const db = await getDb();

  if (db) {
    try {
      const coll = db.collection(COLLECTION_NAME);
      const doc = await coll.findOne({
        $or: [{ id: idOrSlug }, { slug: idOrSlug }],
      });
      if (doc) return docToProduct(doc);
    } catch (err) {
      console.error("[RoozTextile DB] Error fetching product by ID:", err);
    }
  }

  // Fallback search in static catalog
  const found = productsData.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
  return found || null;
}

/**
 * Create a new product in MongoDB
 */
export async function createProduct(data: Partial<Product>): Promise<Product> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database connection unavailable. Please check MONGODB_URI.");
  }

  // Ensure default admin & seed before adding
  await seedProductsIfEmpty();

  const id = data.id || `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const slug =
    data.slug ||
    (data.name
      ? data.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      : id);

  const newProduct: Product = {
    id,
    slug,
    name: data.name || "Untitled Product",
    division: data.division || "institutional",
    category: data.category || "uniform-sets",
    categoryLabel: data.categoryLabel || "Assembly Uniform Sets",
    tagline: data.tagline || "",
    fabric: data.fabric || "Custom Mill Fabric Blend",
    threadCount: data.threadCount || "",
    gsm: Number(data.gsm) || 200,
    weave: data.weave || "Precision Mill Twill",
    construction: data.construction || "",
    moq: Number(data.moq) || 30,
    leadTime: data.leadTime || "7–10 Days",
    features: Array.isArray(data.features) ? data.features : [],
    colors: Array.isArray(data.colors) ? data.colors : [{ name: "Standard", hex: "#11161F" }],
    sizes: Array.isArray(data.sizes) ? data.sizes : ["S", "M", "L", "XL"],
    image: data.image || "/images/boys-uniform.jpg",
    badge: data.badge || "",
    description: data.description || "",
    careInstructions: data.careInstructions || "Machine wash warm. Easy care.",
    embroideryOptions: Array.isArray(data.embroideryOptions) ? data.embroideryOptions : [],
  };

  const coll = db.collection(COLLECTION_NAME);
  await coll.insertOne({
    ...newProduct,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return newProduct;
}

/**
 * Update an existing product in MongoDB
 */
export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database connection unavailable. Please check MONGODB_URI.");
  }

  const coll = db.collection(COLLECTION_NAME);

  // If document doesn't exist in DB yet (e.g. from static catalog), insert it first!
  const existing = await coll.findOne({ id });
  if (!existing) {
    const staticItem = productsData.find((p) => p.id === id);
    if (staticItem) {
      await coll.insertOne({
        ...staticItem,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  // Sanitize numeric fields
  const cleanUpdates: Record<string, unknown> = {
    ...updates,
    updatedAt: new Date(),
  };

  if (updates.gsm !== undefined) cleanUpdates.gsm = Number(updates.gsm);
  if (updates.moq !== undefined) cleanUpdates.moq = Number(updates.moq);
  delete cleanUpdates._id;
  delete cleanUpdates.id;

  const result = await coll.findOneAndUpdate(
    { id },
    { $set: cleanUpdates },
    { returnDocument: "after" }
  );

  if (!result) return null;
  return docToProduct(result);
}

/**
 * Delete a product from MongoDB
 */
export async function deleteProduct(id: string): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database connection unavailable.");
  }

  const coll = db.collection(COLLECTION_NAME);

  // If deleting an item that only existed in static catalog, ensure all other static items are saved
  await seedProductsIfEmpty();

  const res = await coll.deleteOne({ id });
  return res.deletedCount > 0;
}
