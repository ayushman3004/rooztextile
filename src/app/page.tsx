"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { productsData, Product } from "@/data/products";
import { getSampleKitUrl, getWhatsAppUrl } from "@/lib/whatsapp";
import ProductModal from "@/components/ProductModal";
import QuoteBuilderModal from "@/components/QuoteBuilderModal";

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const blazersProduct = productsData.find((p) => p.id === "exec-super130-merino-blazer") || productsData[0];
  const shirtsProduct = productsData.find((p) => p.id === "exec-egyptian-giza-shirt") || productsData[2];
  const skirtsProduct = productsData.find((p) => p.id === "skirt-knife-pleat") || productsData[5];
  const academyBlazer = productsData.find((p) => p.id === "blazer-polywool-classic") || productsData[4];

  return (
    <main className="w-full bg-[#FDFBF7] text-[#11161F]">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Inspired directly by Image 1 & 5)                        */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#11161F] text-white">
        {/* Full-bleed background fashion photography */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-editorial.jpg"
            alt="Rooz Textile Contemporary Collection"
            fill
            priority
            className="object-cover object-center filter brightness-[0.78]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-24 sm:py-32 flex flex-col items-center justify-center space-y-6">
          {/* Centered Delicate Brandmark (like bhat & rao in Image 1) */}
          <div className="font-serif-brand text-2xl sm:text-3xl tracking-tight text-white/90 drop-shadow-sm font-normal">
            rooz textile
          </div>

          {/* Big Bold Modern Headline: MOST WANTED AND MOST LOVED */}
          <h1 className="font-display-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[0.95] drop-shadow-md">
            MOST WANTED<br />AND MOST LOVED
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-neutral-200 max-w-xl mx-auto font-light leading-relaxed drop-shadow-sm pt-1">
            Bespoke suiting, fine Egyptian shirting, contemporary knits, and institutional academy apparel since 1994.
          </p>

          {/* White Pill Button: Shop New Arrivals / Explore Collections (Image 1 style) */}
          <div className="pt-3 flex flex-col sm:flex-row items-center gap-3.5">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#11161F] hover:bg-[#FAF7F0] text-xs sm:text-sm font-medium tracking-wide rounded-full shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Shop New Arrivals
            </Link>

            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-black/40 hover:bg-black/60 text-white border border-white/40 hover:border-white text-xs sm:text-sm font-medium tracking-wide rounded-full backdrop-blur-xs transition"
            >
              Wholesale & Bespoke Orders
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DUSTY SLATE BLUE ROUNDED CATEGORIES SHOWCASE (Inspired by Image 2)    */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#6F8FA8] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/80 font-medium">
              Featured Collections
            </span>
            <h2 className="font-editorial-heading text-3xl sm:text-4xl text-white font-normal">
              Tailored For Every Occasion
            </h2>
          </div>

          {/* 4 Large Rounded Category Cards (Image 2 style with large rounded corners and underlined titles) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Card 1: Dresses & Skirts */}
            <div
              onClick={() => setSelectedProduct(skirtsProduct)}
              className="group relative aspect-[4/3] sm:aspect-[16/11] rounded-[2.5rem] overflow-hidden bg-[#56758D] cursor-pointer shadow-xl transition-transform duration-500 hover:-translate-y-1"
            >
              <Image
                src="/images/card-dresses.jpg"
                alt="Shop Dresses & Skirts"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10 transition-opacity group-hover:opacity-85" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <span className="text-xs uppercase tracking-[0.2em] text-white/90 font-light mb-1">
                  SHOP
                </span>
                <h3 className="editorial-underline text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
                  Dresses
                </h3>
                <p className="text-xs text-white/80 mt-4 max-w-xs font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Permanent knife-pleated skirts, academic pinafores & woven tunics
                </p>
              </div>
            </div>

            {/* Card 2: Knits & Woolens */}
            <div
              onClick={() => setSelectedProduct(blazersProduct)}
              className="group relative aspect-[4/3] sm:aspect-[16/11] rounded-[2.5rem] overflow-hidden bg-[#56758D] cursor-pointer shadow-xl transition-transform duration-500 hover:-translate-y-1"
            >
              <Image
                src="/images/card-knits.jpg"
                alt="Shop Knits & Suiting"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10 transition-opacity group-hover:opacity-85" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <span className="text-xs uppercase tracking-[0.2em] text-white/90 font-light mb-1">
                  SHOP
                </span>
                <h3 className="editorial-underline text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
                  Knits
                </h3>
                <p className="text-xs text-white/80 mt-4 max-w-xs font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Super 130s Merino worsted wools, tactile cashmeres & suiting layers
                </p>
              </div>
            </div>

            {/* Card 3: Tailored Blazers */}
            <div
              onClick={() => setSelectedProduct(academyBlazer)}
              className="group relative aspect-[4/3] sm:aspect-[16/11] rounded-[2.5rem] overflow-hidden bg-[#56758D] cursor-pointer shadow-xl transition-transform duration-500 hover:-translate-y-1"
            >
              <Image
                src="/images/blazers.jpg"
                alt="Shop Tailored Blazers"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/15 transition-opacity group-hover:opacity-85" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <span className="text-xs uppercase tracking-[0.2em] text-white/90 font-light mb-1">
                  SHOP
                </span>
                <h3 className="editorial-underline text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
                  Blazers
                </h3>
                <p className="text-xs text-white/80 mt-4 max-w-xs font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Single-breasted worsted wool & Raymond-grade school crested blazers
                </p>
              </div>
            </div>

            {/* Card 4: Executive & Everyday Shirts */}
            <div
              onClick={() => setSelectedProduct(shirtsProduct)}
              className="group relative aspect-[4/3] sm:aspect-[16/11] rounded-[2.5rem] overflow-hidden bg-[#56758D] cursor-pointer shadow-xl transition-transform duration-500 hover:-translate-y-1"
            >
              <Image
                src="/images/shirts.jpg"
                alt="Shop Shirts"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/15 transition-opacity group-hover:opacity-85" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <span className="text-xs uppercase tracking-[0.2em] text-white/90 font-light mb-1">
                  SHOP
                </span>
                <h3 className="editorial-underline text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
                  Shirts
                </h3>
                <p className="text-xs text-white/80 mt-4 max-w-xs font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  2-Ply Egyptian Giza cottons & breathable pinpoint Oxford weaves
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SPLIT EDITORIAL LOCATION & BRAND SECTION (Inspired by Image 3)        */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#6F8FA8] text-white border-t border-[#82A0B8]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Minimalist Typography & Contact */}
            <div className="lg:col-span-6 space-y-8">
              {/* Brandmark */}
              <div className="font-serif-brand text-3xl sm:text-4xl tracking-tight text-white font-normal">
                rooz textile
              </div>

              {/* Location Block */}
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 block">
                  LOCATION
                </span>
                <h3 className="font-display-bold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight text-white">
                  PLOT 42-45, TEXTILE AVENUE<br />
                  GREATER NOIDA & SURAT<br />
                  INDIA
                </h3>
              </div>

              {/* Social / Direct Connect */}
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 block">
                  FOLLOW US ON SOCIAL
                </span>
                <div className="font-display-bold text-xl sm:text-2xl tracking-tight text-white space-y-0.5">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white/80 transition">
                    INSTAGRAM
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white/80 transition">
                    TWITTER
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white/80 transition">
                    FACEBOOK
                  </a>
                </div>
              </div>

              {/* Email & WhatsApp Action */}
              <div className="pt-2 space-y-4">
                <a
                  href="mailto:concierge@rooztextile.com"
                  className="block text-sm sm:text-base text-white/90 font-mono tracking-wide hover:underline"
                >
                  concierge@rooztextile.com
                </a>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={getWhatsAppUrl("Hello Rooz Textile, I am contacting your concierge regarding suiting, shirts, and custom apparel.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#11161F] text-xs font-semibold rounded-full hover:bg-[#FAF7F0] transition shadow-md uppercase tracking-wider"
                  >
                    Direct WhatsApp Concierge →
                  </a>

                  <a
                    href={getSampleKitUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-white border border-white/50 text-xs font-semibold rounded-full hover:bg-white/10 transition uppercase tracking-wider"
                  >
                    Order Swatch Box
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Large Rounded Fashion Portrait (Image 3 style) */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] rounded-[3rem] overflow-hidden bg-[#56758D] shadow-2xl">
                <Image
                  src="/images/model-denim-portrait.jpg"
                  alt="Rooz Textile Outerwear & Suiting"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. "OUR RAVING COMMUNITY" TESTIMONIAL SPLIT (Inspired by Image 4)        */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FAF7F0] border-t border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Half-Photo with Display Serif Headline "Our Raving Community" (Image 4 style) */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#EDE7DC] shadow-xl">
                <Image
                  src="/images/community-model.jpg"
                  alt="Our Raving Community"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Text overlay on bottom left */}
                <div className="absolute bottom-8 left-8 right-8">
                  <h2 className="font-editorial-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-none drop-shadow-md">
                    Our Raving<br />Community
                  </h2>
                </div>
              </div>
            </div>

            {/* Right: Minimalist, clean review list (Image 4 style) */}
            <div className="lg:col-span-6 space-y-10 py-4">
              <div className="space-y-2">
                <h3 className="font-editorial-heading text-xl sm:text-2xl font-bold text-[#11161F]">
                  Aarav, Corporate Director
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                  &ldquo;Rooz Textile tailored our corporate executive blazers with remarkable precision. The Super 130s Merino wool drape is world-class and holds its shape through transcontinental business travel.&rdquo;
                </p>
              </div>

              <div className="space-y-2 border-t border-[#E5DDD0] pt-8">
                <h3 className="font-editorial-heading text-xl sm:text-2xl font-bold text-[#11161F]">
                  Dr. Alistair, Academy Head
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                  &ldquo;We have ordered over 2,400 school blazers and shirts every term for 8 years. The fabric consistency, reinforced stitching, and rapid WhatsApp turnaround are extraordinary.&rdquo;
                </p>
              </div>

              <div className="space-y-2 border-t border-[#E5DDD0] pt-8">
                <h3 className="font-editorial-heading text-xl sm:text-2xl font-bold text-[#11161F]">
                  Jasmine, Boutique Curator
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                  &ldquo;Their 2-ply Egyptian Giza cotton shirts and custom blazers transformed our boutique line. High-fashion finishing paired with reliable direct mill minimums.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SECONDARY FULL-BLEED BANNER (Inspired by Image 5)                      */}
      {/* ========================================================================= */}
      <section className="relative w-full py-28 sm:py-36 bg-[#11161F] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/store-rail.jpg"
            alt="Craft, Curate, and Elevate"
            fill
            className="object-cover object-center filter brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="font-serif-brand text-xl sm:text-2xl tracking-tight text-white/90 font-normal">
            rooz textile
          </span>

          <h2 className="font-editorial-heading text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.05]">
            Craft, Curate,<br />and Elevate
          </h2>

          <p className="text-sm sm:text-base text-neutral-200 max-w-lg mx-auto font-light leading-relaxed">
            Partner with our weaving mills for bespoke corporate suiting, contemporary menswear, or institutional uniform tenders.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#DFF7C8] hover:bg-[#D0F0B3] text-[#11161F] font-semibold text-xs sm:text-sm tracking-wide rounded-full shadow-lg transition uppercase"
            >
              Request Wholesale Catalog
            </button>
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
    </main>
  );
}
