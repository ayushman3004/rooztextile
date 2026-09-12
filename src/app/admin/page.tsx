"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Product, productCategories } from "@/data/products";

export default function AdminDashboardPage() {
  const router = useRouter();

  // Auth & Page State
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [isDbConnected, setIsDbConnected] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDivision, setActiveDivision] = useState<"all" | "institutional" | "executive">("all");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const initialFormState: Partial<Product> = {
    name: "",
    division: "institutional",
    category: "uniform-sets",
    categoryLabel: "Assembly Uniform Sets",
    tagline: "",
    fabric: "",
    threadCount: "",
    gsm: 200,
    weave: "",
    construction: "",
    moq: 30,
    leadTime: "7–10 Days",
    features: [""],
    colors: [{ name: "Navy Blue", hex: "#0E1C36" }],
    sizes: ["Age 6-8", "Age 8-10", "Age 10-12", "Senior 36-44"],
    image: "",
    badge: "",
    description: "",
    careInstructions: "Machine wash warm 40°C. Easy iron.",
    embroideryOptions: ["Left chest school crest embroidery"],
  };

  const [formData, setFormData] = useState<Partial<Product>>(initialFormState);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check Auth & Load Products
  useEffect(() => {
    async function checkAuthAndLoad() {
      try {
        const authRes = await fetch("/api/admin/login");
        const authData = await authRes.json();

        if (!authRes.ok || !authData.authenticated) {
          router.push("/admin/login");
          return;
        }

        setAdminEmail(authData.admin.email);
        await loadProducts();
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuthAndLoad();
  }, [router]);

  async function loadProducts() {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
        setIsDbConnected(data.isDbConnected);
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  }

  function showToast(message: string, type: "success" | "error" = "success") {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4500);
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      ...initialFormState,
      id: `prod-${Date.now()}`,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      features: product.features.length ? [...product.features] : [""],
      colors: product.colors.length ? [...product.colors] : [{ name: "Standard", hex: "#11161F" }],
      sizes: product.sizes.length ? [...product.sizes] : ["Standard"],
      embroideryOptions: product.embroideryOptions.length ? [...product.embroideryOptions] : [""],
    });
    setIsModalOpen(true);
  };

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to upload image.");
      }

      setFormData((prev) => ({ ...prev, image: data.url }));
      showToast("Image uploaded successfully!");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to upload image", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  // Submit Product (Create or Edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      showToast("Please enter a garment name", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      // Clean up empty array items
      const cleanedData = {
        ...formData,
        features: formData.features?.filter((f) => f.trim() !== "") || [],
        embroideryOptions: formData.embroideryOptions?.filter((e) => e.trim() !== "") || [],
        sizes: formData.sizes?.filter((s) => s.trim() !== "") || [],
        gsm: Number(formData.gsm) || 200,
        moq: Number(formData.moq) || 30,
      };

      let res: Response;
      if (editingProduct) {
        res = await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanedData),
        });
      } else {
        res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanedData),
        });
      }

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Operation failed.");
      }

      showToast(editingProduct ? "Garment updated in MongoDB!" : "New garment added to MongoDB!");
      setIsModalOpen(false);
      await loadProducts();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Product
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this garment from the database?")) {
      return;
    }

    setIsDeleting(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Delete failed.");
      }

      showToast("Garment removed from catalog.");
      await loadProducts();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to delete garment", "error");
    } finally {
      setIsDeleting(null);
    }
  };

  // Dynamic Array Helpers
  const addFeature = () => setFormData((prev) => ({ ...prev, features: [...(prev.features || []), ""] }));
  const updateFeature = (index: number, val: string) => {
    const updated = [...(formData.features || [])];
    updated[index] = val;
    setFormData((prev) => ({ ...prev, features: updated }));
  };
  const removeFeature = (index: number) => {
    setFormData((prev) => ({ ...prev, features: (prev.features || []).filter((_, i) => i !== index) }));
  };

  const addColor = () => setFormData((prev) => ({ ...prev, colors: [...(prev.colors || []), { name: "Custom Shade", hex: "#000000" }] }));
  const updateColor = (index: number, field: "name" | "hex", val: string) => {
    const updated = [...(formData.colors || [])];
    updated[index] = { ...updated[index], [field]: val };
    setFormData((prev) => ({ ...prev, colors: updated }));
  };
  const removeColor = (index: number) => {
    setFormData((prev) => ({ ...prev, colors: (prev.colors || []).filter((_, i) => i !== index) }));
  };

  const addEmbroidery = () => setFormData((prev) => ({ ...prev, embroideryOptions: [...(prev.embroideryOptions || []), ""] }));
  const updateEmbroidery = (index: number, val: string) => {
    const updated = [...(formData.embroideryOptions || [])];
    updated[index] = val;
    setFormData((prev) => ({ ...prev, embroideryOptions: updated }));
  };
  const removeEmbroidery = (index: number) => {
    setFormData((prev) => ({ ...prev, embroideryOptions: (prev.embroideryOptions || []).filter((_, i) => i !== index) }));
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchCat =
      activeCategory === "all" ||
      p.category === activeCategory ||
      (activeCategory === "blazers" && p.category === "blazers");
    const matchDiv = activeDivision === "all" || p.division === activeDivision;
    const matchSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchDiv && matchSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0E141D] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-3 border-[#C5A265] border-t-transparent rounded-full animate-spin" />
          <p className="font-editorial-heading text-lg tracking-wide text-neutral-300">
            Accessing RoozTextile Admin Vault...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E141D] text-[#FDFBF7] flex flex-col font-sans selection:bg-[#C5A265] selection:text-[#11161F]">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${
            notification.type === "success"
              ? "bg-emerald-600 text-white border border-emerald-400"
              : "bg-red-600 text-white border border-red-400"
          }`}
        >
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#161F2C]/90 backdrop-blur-md border-b border-[#2C3B4E] px-6 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#C5A265] to-[#E5C98B] flex items-center justify-center text-[#11161F] font-serif font-bold text-lg shadow-sm">
              R
            </div>
            <div>
              <span className="font-serif-brand text-lg text-white block leading-tight">
                RoozTextile
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A265] block">
                Admin Console
              </span>
            </div>
          </Link>

          {/* MongoDB Status Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E141D] border border-white/10 text-[11px]">
            <span
              className={`w-2 h-2 rounded-full ${
                isDbConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            <span className="text-neutral-300">
              {isDbConnected ? "MongoDB Active" : "Local Fallback"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-xs text-neutral-400">
            Signed in: <strong className="text-white font-medium">{adminEmail}</strong>
          </span>

          <Link
            href="/products"
            target="_blank"
            className="px-4 py-2 rounded-full border border-[#C5A265]/50 hover:border-[#C5A265] text-[#C5A265] hover:text-white hover:bg-[#C5A265]/10 transition text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
          >
            <span>Live Catalog</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full bg-[#243042] hover:bg-[#2C3B4E] text-neutral-300 hover:text-white transition text-xs font-semibold uppercase tracking-wider"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner with Stats & Primary Action */}
        <div className="bg-gradient-to-r from-[#182333] via-[#1A283B] to-[#141C28] border border-[#2D3F56] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A265]">
              Product Inventory & Catalog Management
            </span>
            <h1 className="font-editorial-heading text-2xl sm:text-3xl lg:text-4xl text-white font-normal">
              Uniform Garment Archive
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-xl">
              Add new garments, update high-resolution pictures, adjust weave/GSM specifications, and manage minimum order quantities stored directly in MongoDB.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="px-6 py-3.5 bg-gradient-to-r from-[#C5A265] to-[#B08E52] text-[#11161F] font-bold text-xs uppercase tracking-widest rounded-full hover:brightness-110 active:scale-95 transition shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add New Garment</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#161F2C] border border-[#2C3B4E] rounded-2xl p-4 sm:p-5">
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">Total Catalog Items</span>
            <span className="text-2xl sm:text-3xl font-bold text-white mt-1 block font-mono">{products.length}</span>
          </div>
          <div className="bg-[#161F2C] border border-[#2C3B4E] rounded-2xl p-4 sm:p-5">
            <span className="text-[11px] text-[#6F8FA8] uppercase tracking-wider block">Institutional Division</span>
            <span className="text-2xl sm:text-3xl font-bold text-white mt-1 block font-mono">
              {products.filter((p) => p.division === "institutional").length}
            </span>
          </div>
          <div className="bg-[#161F2C] border border-[#2C3B4E] rounded-2xl p-4 sm:p-5">
            <span className="text-[11px] text-[#C5A265] uppercase tracking-wider block">Sartorial Atelier</span>
            <span className="text-2xl sm:text-3xl font-bold text-white mt-1 block font-mono">
              {products.filter((p) => p.division === "executive").length}
            </span>
          </div>
          <div className="bg-[#161F2C] border border-[#2C3B4E] rounded-2xl p-4 sm:p-5">
            <span className="text-[11px] text-emerald-400 uppercase tracking-wider block">Active Categories</span>
            <span className="text-2xl sm:text-3xl font-bold text-white mt-1 block font-mono">
              {new Set(products.map((p) => p.category)).size}
            </span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-[#161F2C] border border-[#2C3B4E] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition ${
                activeCategory === "all"
                  ? "bg-[#C5A265] text-[#11161F]"
                  : "bg-[#243042] text-neutral-300 hover:bg-[#2C3B4E]"
              }`}
            >
              All ({products.length})
            </button>
            {productCategories.slice(1).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition ${
                  activeCategory === cat.id
                    ? "bg-[#C5A265] text-[#11161F]"
                    : "bg-[#243042] text-neutral-300 hover:bg-[#2C3B4E]"
                }`}
              >
                {cat.label.replace("Catalogue ", "").replace("Uniform ", "")}
              </button>
            ))}
          </div>

          {/* Division & Search */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={activeDivision}
              onChange={(e) => setActiveDivision(e.target.value as "all" | "institutional" | "executive")}
              aria-label="Filter by division"
              className="px-3 py-2 bg-[#0E141D] border border-[#2C3B4E] rounded-full text-xs text-neutral-200 focus:outline-none focus:border-[#C5A265]"
            >
              <option value="all">All Divisions</option>
              <option value="institutional">Institutional</option>
              <option value="executive">Sartorial Atelier</option>
            </select>

            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search garment or fabric..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#0E141D] border border-[#2C3B4E] rounded-full text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A265]"
              />
              <svg className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Product Catalog Cards / Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Showing {filteredProducts.length} garments</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-[#C5A265] hover:underline cursor-pointer"
              >
                Clear search
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-[#161F2C] border border-[#2C3B4E] rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#243042] flex items-center justify-center mx-auto text-neutral-400">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="font-editorial-heading text-xl text-white">No Garments Found</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                No items match your filter criteria. Try adjusting your search query or add a new garment.
              </p>
              <button
                onClick={openCreateModal}
                className="px-5 py-2.5 bg-[#C5A265] text-[#11161F] font-bold text-xs uppercase tracking-wider rounded-full hover:brightness-110 transition"
              >
                Create New Garment
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#161F2C] border border-[#2C3B4E] hover:border-[#6F8FA8] rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  {/* Image & Badges */}
                  <div className="relative aspect-[16/10] w-full bg-[#0E141D] overflow-hidden">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-100"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs">
                        No Image Assigned
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161F2C] via-transparent to-black/30" />

                    {/* Division Pill */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span
                        className={`text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full ${
                          product.division === "executive"
                            ? "bg-[#C5A265] text-[#11161F]"
                            : "bg-[#6F8FA8] text-white"
                        }`}
                      >
                        {product.division === "executive" ? "Sartorial Atelier" : "Institutional"}
                      </span>
                      {product.badge && (
                        <span className="bg-black/60 backdrop-blur-md text-white text-[9px] uppercase font-medium tracking-wider px-2 py-0.5 rounded-full border border-white/20">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* GSM Badge */}
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full border border-white/20">
                      {product.gsm} GSM • MOQ {product.moq}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A265] block">
                        {product.categoryLabel || product.category}
                      </span>
                      <h3 className="font-editorial-heading text-lg text-white font-normal leading-snug line-clamp-2 group-hover:text-[#C5A265] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-neutral-400 line-clamp-2 font-light">
                        {product.tagline || product.description}
                      </p>
                    </div>

                    {/* Specs snippet */}
                    <div className="pt-3 border-t border-[#243042] text-[11px] text-neutral-400 space-y-1">
                      <div className="flex justify-between">
                        <span>Fabric:</span>
                        <span className="text-neutral-200 font-medium truncate max-w-[170px]">{product.fabric}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lead Time:</span>
                        <span className="text-neutral-200 font-medium">{product.leadTime}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="flex-1 py-2 px-3 bg-[#243042] hover:bg-[#2C3B4E] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition text-center flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 text-[#C5A265]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={isDeleting === product.id}
                        className="py-2 px-3 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/50 rounded-xl text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                        title="Delete Garment"
                      >
                        {isDeleting === product.id ? (
                          <span className="animate-spin text-xs">...</span>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="bg-[#161F2C] border border-[#2D3F56] rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 sm:px-8 py-5 border-b border-[#2C3B4E] flex items-center justify-between bg-[#131B27]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C5A265] block">
                  {editingProduct ? "Modify Garment Record" : "New Garment Creation"}
                </span>
                <h2 className="font-editorial-heading text-xl sm:text-2xl text-white">
                  {editingProduct ? editingProduct.name : "Add Garment & Technical Details"}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#243042] text-neutral-400 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
              {/* SECTION 1: PICTURE & IDENTITY */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#C5A265] border-b border-[#2C3B4E] pb-2">
                  1. Product Picture & Media
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                  {/* Image Preview Box */}
                  <div className="sm:col-span-4 aspect-[4/3] rounded-2xl bg-[#0E141D] border border-[#2C3B4E] overflow-hidden relative flex items-center justify-center">
                    {formData.image ? (
                      <Image
                        src={formData.image}
                        alt="Product preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="text-center p-4 text-neutral-500 text-xs space-y-1">
                        <svg className="w-8 h-8 mx-auto text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>No image selected</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="sm:col-span-8 space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-2">
                        Upload Garment Picture
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/png, image/jpeg, image/webp, image/avif"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingImage}
                          className="px-4 py-2.5 bg-[#243042] hover:bg-[#2C3B4E] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {uploadingImage ? (
                            <>
                              <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                              </svg>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4 text-[#C5A265]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                              </svg>
                              Choose Image File
                            </>
                          )}
                        </button>
                        <span className="text-[11px] text-neutral-400">JPG, PNG, WEBP up to 10MB</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-2">
                        Or External Image URL / Path
                      </label>
                      <input
                        type="text"
                        value={formData.image || ""}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="/images/catalogue/page-2.png or https://..."
                        className="w-full px-4 py-2.5 bg-[#0E141D] border border-[#2C3B4E] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A265]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: GENERAL ATTRIBUTES */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#C5A265] border-b border-[#2C3B4E] pb-2">
                  2. Garment Identity & Classification
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1.5">
                      Garment Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Senior Poly-Wool Regimental Blazer"
                      className="w-full px-4 py-2.5 bg-[#0E141D] border border-[#2C3B4E] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A265]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1.5">
                      Badge / Ribbon
                    </label>
                    <input
                      type="text"
                      value={formData.badge || ""}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="e.g. Flagship, Best Seller, New Weave"
                      className="w-full px-4 py-2.5 bg-[#0E141D] border border-[#2C3B4E] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A265]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1.5">
                      Division
                    </label>
                    <select
                      value={formData.division || "institutional"}
                      onChange={(e) => setFormData({ ...formData, division: e.target.value as "institutional" | "executive" })}
                      className="w-full px-4 py-2.5 bg-[#0E141D] border border-[#2C3B4E] rounded-xl text-xs text-white focus:outline-none focus:border-[#C5A265]"
                    >
                      <option value="institutional">Institutional Division</option>
                      <option value="executive">Sartorial Atelier (Executive)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1.5">
                      Category
                    </label>
                    <select
                      value={formData.category || "uniform-sets"}
                      onChange={(e) => {
                        const cat = e.target.value as Product["category"];
                        const found = productCategories.find((c) => c.id === cat);
                        setFormData({
                          ...formData,
                          category: cat,
                          categoryLabel: found ? found.label : cat,
                        });
                      }}
                      className="w-full px-4 py-2.5 bg-[#0E141D] border border-[#2C3B4E] rounded-xl text-xs text-white focus:outline-none focus:border-[#C5A265]"
                    >
                      <option value="uniform-sets">Assembly Uniform Sets</option>
                      <option value="house-polos">House & PT Polos</option>
                      <option value="tracksuits">Tracksuits & Track Pants</option>
                      <option value="blazers">Formal School Blazers</option>
                      <option value="knitwear">Sweaters & Cardigans</option>
                      <option value="accessories">Accessories (Ties, Belts, Socks)</option>
                      <option value="pe-sets">Junior PE Sets</option>
                      <option value="shirts">Shirts</option>
                      <option value="skirts">Skirts</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1.5">
                      Category Label
                    </label>
                    <input
                      type="text"
                      value={formData.categoryLabel || ""}
                      onChange={(e) => setFormData({ ...formData, categoryLabel: e.target.value })}
                      placeholder="e.g. Formal School Blazers"
                      className="w-full px-4 py-2.5 bg-[#0E141D] border border-[#2C3B4E] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A265]"
                    />
                  </div>

                  <div className="sm:col-span-2 lg:col-span-3">
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1.5">
                      Tagline / Headline
                    </label>
                    <input
                      type="text"
                      value={formData.tagline || ""}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="Short editorial summary of the garment"
                      className="w-full px-4 py-2.5 bg-[#0E141D] border border-[#2C3B4E] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A265]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: TEXTILE SPECIFICATIONS */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#C5A265] border-b border-[#2C3B4E] pb-2">
                  3. Textile & Technical Specifications
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1.5">
                      Fabric Composition *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fabric || ""}
                      onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                      placeholder="e.g. 65% Combed Cotton / 35% Poly Blend"
                      className="w-full px-4 py-2.5 bg-[#0E141D] border border-[#2C3B4E] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A265]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1.5">
                      GSM (Grams/m²)
                    </label>
                    <input
                      type="number"
                      value={formData.gsm || 200}
                      onChange={(e) => setFormData({ ...formData, gsm: Number(e.target.value) })}
                      placeholder="200"
                      className="w-full px-4 py-2.5 bg-[#0E141D] border border-[#2C3B4E] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A265]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1.5">
                      Thread Count
                    </label>
                    <input
                      type="text"
                      value={formData.threadCount || ""}
                      onChange={(e) => setFormData({ ...formData, threadCount: e.target.value })}
                      placeholder="e.g. 80s Double-Ply Weave"
                      className="w-full px-4 py-2.5 bg-[#0E141D] border border-[#2C3B4E] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A265]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1.5">
                      Weave Style
                    </label>
                    <input
                      type="text"
                      value={formData.weave || ""}
                      onChange={(e) => setFormData({ ...formData, weave: e.target.value })}
                      placeholder="e.g. Reinforced School Twill"
                      className="w-full px-4 py-2.5 bg-[#0E141D] border border-[#2C3B4E] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A265]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1.5">
                      MOQ (Min. Order)
                    </label>
                    <input
                      type="number"
                      value={formData.moq || 30}
                      onChange={(e) => setFormData({ ...formData, moq: Number(e.target.value) })}
                      placeholder="30"
                      className="w-full px-4 py-2.5 bg-[#0E141D] border border-[#2C3B4E] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A265]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1.5">
                      Lead Time
                    </label>
                    <input
                      type="text"
                      value={formData.leadTime || "7–10 Days"}
                      onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
                      placeholder="e.g. 7–10 Days"
                      className="w-full px-4 py-2.5 bg-[#0E141D] border border-[#2C3B4E] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A265]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1.5">
                      Construction Details
                    </label>
                    <input
                      type="text"
                      value={formData.construction || ""}
                      onChange={(e) => setFormData({ ...formData, construction: e.target.value })}
                      placeholder="e.g. Double-Stitched Bar-Tacking"
                      className="w-full px-4 py-2.5 bg-[#0E141D] border border-[#2C3B4E] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A265]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: NARRATIVE & CARE */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#C5A265] border-b border-[#2C3B4E] pb-2">
                  4. Narrative Description & Care
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1.5">
                      Detailed Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Comprehensive overview of tailoring, institution use-case, and durability..."
                      className="w-full px-4 py-2.5 bg-[#0E141D] border border-[#2C3B4E] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A265]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1.5">
                      Care & Laundry Instructions
                    </label>
                    <input
                      type="text"
                      value={formData.careInstructions || ""}
                      onChange={(e) => setFormData({ ...formData, careInstructions: e.target.value })}
                      placeholder="e.g. Machine wash warm 40°C. Easy iron or drip dry."
                      className="w-full px-4 py-2.5 bg-[#0E141D] border border-[#2C3B4E] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A265]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 5: FEATURES & COLORWAYS */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#C5A265] border-b border-[#2C3B4E] pb-2">
                  5. Bullet Features, Colors & Customization
                </h3>

                {/* Key Features */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs uppercase tracking-wider text-neutral-300 font-semibold">
                      Key Highlights & Features
                    </label>
                    <button
                      type="button"
                      onClick={addFeature}
                      className="text-[11px] text-[#C5A265] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      + Add Feature Bullet
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(formData.features || []).map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(i, e.target.value)}
                          placeholder={`Feature ${i + 1}`}
                          className="flex-1 px-4 py-2 bg-[#0E141D] border border-[#2C3B4E] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A265]"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(i)}
                          className="w-8 h-8 rounded-xl bg-red-950/40 text-red-400 hover:text-red-200 flex items-center justify-center transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Colors */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs uppercase tracking-wider text-neutral-300 font-semibold">
                      Colorways (Swatch & Name)
                    </label>
                    <button
                      type="button"
                      onClick={addColor}
                      className="text-[11px] text-[#C5A265] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      + Add Color Swatch
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(formData.colors || []).map((col, i) => (
                      <div key={i} className="flex items-center gap-2 bg-[#0E141D] p-2 rounded-xl border border-[#2C3B4E]">
                        <input
                          type="color"
                          value={col.hex}
                          onChange={(e) => updateColor(i, "hex", e.target.value)}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                          title="Pick Color"
                        />
                        <input
                          type="text"
                          value={col.name}
                          onChange={(e) => updateColor(i, "name", e.target.value)}
                          placeholder="e.g. Navy Blue"
                          className="flex-1 px-2 py-1 bg-transparent text-xs text-white focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => removeColor(i)}
                          className="w-6 h-6 rounded-lg text-neutral-500 hover:text-red-400 flex items-center justify-center"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Embroidery Options */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs uppercase tracking-wider text-neutral-300 font-semibold">
                      Embroidery & Crest Customization Options
                    </label>
                    <button
                      type="button"
                      onClick={addEmbroidery}
                      className="text-[11px] text-[#C5A265] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      + Add Embroidery Option
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(formData.embroideryOptions || []).map((opt, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => updateEmbroidery(i, e.target.value)}
                          placeholder={`Embroidery Option ${i + 1}`}
                          className="flex-1 px-4 py-2 bg-[#0E141D] border border-[#2C3B4E] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A265]"
                        />
                        <button
                          type="button"
                          onClick={() => removeEmbroidery(i)}
                          className="w-8 h-8 rounded-xl bg-red-950/40 text-red-400 hover:text-red-200 flex items-center justify-center transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-6 border-t border-[#2C3B4E] flex items-center justify-end gap-3 sticky bottom-0 bg-[#161F2C] py-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-full border border-white/20 text-neutral-300 hover:text-white transition text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2.5 bg-gradient-to-r from-[#C5A265] to-[#B08E52] text-[#11161F] font-bold text-xs uppercase tracking-widest rounded-full hover:brightness-110 active:scale-95 transition shadow-lg disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#11161F]" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Saving to MongoDB...
                    </>
                  ) : editingProduct ? (
                    "Save Garment Updates"
                  ) : (
                    "Publish Garment to Catalog"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
