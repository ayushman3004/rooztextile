"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { productsData, productCategories, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import QuoteBuilderModal from "@/components/QuoteBuilderModal";
import { getSampleKitUrl } from "@/lib/whatsapp";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const filtered = productsData.filter((p) => {
    let matchesCategory = true;
    if (activeCategory === "executive-blazers") {
      matchesCategory = p.division === "executive" && p.category === "blazers";
    } else if (activeCategory === "luxury-shirts") {
      matchesCategory = p.division === "executive" && p.category === "shirts";
    } else if (activeCategory === "school-blazers") {
      matchesCategory = p.division === "institutional" && p.category === "blazers";
    } else if (activeCategory === "school-uniforms") {
      matchesCategory = p.division === "institutional" && (p.category === "skirts" || p.category === "shirts");
    } else if (activeCategory === "accessories") {
      matchesCategory = p.category === "accessories";
    }

    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#FDFBF7] text-[#11161F]">
      {/* 1. EDITORIAL LOOKBOOK HERO (Inspired by Image 1 & 5) */}
      <section className="relative w-full min-h-[50vh] sm:min-h-[58vh] flex items-center justify-center overflow-hidden bg-[#11161F] text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-editorial.jpg"
            alt="The Sartorial Lookbook"
            fill
            priority
            className="object-cover object-center filter brightness-[0.72]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20 space-y-4">
          <span className="font-serif-brand text-2xl sm:text-3xl tracking-tight text-white/90 font-normal">
            rooz textile
          </span>
          <h1 className="font-display-bold text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-none drop-shadow-md">
            THE SARTORIAL ARCHIVE
          </h1>
          <p className="text-sm sm:text-base text-neutral-200 max-w-xl mx-auto font-light leading-relaxed">
            Curated executive worsted wool blazers, 2-ply Egyptian Giza cotton shirts, permanent pleated skirts, and institutional academy apparel.
          </p>
        </div>
      </section>

      {/* 2. SLATE BLUE FILTER BAR & ROUNDED SEARCH */}
      <section className="bg-[#6F8FA8] text-white py-6 border-b border-[#82A0B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Rounded Pill Category Filters */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-full transition cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-white text-[#11161F] shadow-sm"
                    : "bg-[#56758D] text-white/90 hover:bg-[#4E6B82]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Pill Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search wool, Giza, GSM..."
              className="w-full pl-10 pr-4 py-2 bg-white/95 text-[#11161F] placeholder-neutral-500 rounded-full text-xs font-medium focus:outline-none focus:ring-2 focus:ring-white"
            />
            <svg
              className="w-4 h-4 text-neutral-500 absolute left-3.5 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT GRID */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-[#E5DDD0] p-8">
            <p className="text-base text-neutral-600 font-light">
              No garments found matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-4 px-6 py-2.5 bg-[#11161F] text-white text-xs uppercase tracking-wider rounded-full hover:bg-[#6F8FA8] transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenModal={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 4. SPLIT BESPOKE CONSULTATION (Inspired by Image 3) */}
      <section className="py-16 sm:py-24 bg-[#6F8FA8] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-white/80 font-medium">
                CUSTOM MILL WEAVING
              </span>
              <h2 className="font-editorial-heading text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
                Looking for a Bespoke Tartan, Crest or Colorway?
              </h2>
              <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">
                We weave bespoke poly-wool blends, yarn-dyed checks, and custom jaquard ties to exact Pantone shades for institutional minimums of 20+ units.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={getSampleKitUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-white text-[#11161F] font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-[#FAF7F0] transition shadow-md"
                >
                  Order Swatch Presentation Box
                </a>
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="px-8 py-3.5 bg-transparent text-white border border-white/60 font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-white/10 transition"
                >
                  Request Bulk Quote
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-[#56758D] shadow-2xl">
                <Image
                  src="/images/model-denim-portrait.jpg"
                  alt="Bespoke Tailoring"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODALS */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <QuoteBuilderModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <Suspense fallback={<div className="p-12 text-center text-sm">Loading Rooz Textile archive...</div>}>
        <ProductsContent />
      </Suspense>
    </main>
  );
}
