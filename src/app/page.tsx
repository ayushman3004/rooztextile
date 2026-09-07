"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { productsData, Product } from "@/data/products";
import { companyData } from "@/data/company";
import { getSampleKitUrl, getWhatsAppUrl } from "@/lib/whatsapp";
import ProductModal from "@/components/ProductModal";
import QuoteBuilderModal from "@/components/QuoteBuilderModal";

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const assemblyProduct = productsData.find((p) => p.id === "boys-assembly-uniform-set") || productsData[0];
  const girlsProduct = productsData.find((p) => p.id === "girls-assembly-uniform-set") || productsData[1];
  const housePoloProduct = productsData.find((p) => p.id === "house-colour-sports-polo") || productsData[3];
  const tracksuitProduct = productsData.find((p) => p.id === "school-tracksuit-jacket-set") || productsData[4];
  const blazerProduct = productsData.find((p) => p.id === "school-formal-blazer-uniform") || productsData[6];

  return (
    <main className="w-full bg-[#FDFBF7] text-[#11161F]">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Inspired directly by Image 1 & 5)                        */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#11161F] text-white">
        {/* Full-bleed background school uniform photography */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/school-hero.jpg"
            alt="RoozTextile School Uniforms & Institutional Apparel"
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
            RoozTextile
          </div>

          {/* Big Bold Modern Headline: MOST WANTED AND MOST LOVED */}
          <h1 className="font-display-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[0.95] drop-shadow-md">
            MOST WANTED<br />AND MOST LOVED
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-neutral-200 max-w-xl mx-auto font-light leading-relaxed drop-shadow-sm pt-1">
            Official institutional school uniform solutions, worsted poly-wool blazers, 4-house sports polos, and crest regalia since 1994.
          </p>

          {/* White Pill Button: Shop New Arrivals / Explore Collections (Image 1 style) */}
          <div className="pt-3 flex flex-col sm:flex-row items-center gap-3.5">
            {/* <Link
              href="/catalogue"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#C5A265] text-[#11161F] hover:bg-[#B39054] text-xs sm:text-sm font-bold tracking-wide rounded-full shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore 2026 Catalogue →
            </Link> */}

            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#11161F] hover:bg-[#FAF7F0] text-xs sm:text-sm font-medium tracking-wide rounded-full shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Shop Uniforms
            </Link>

            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-black/40 hover:bg-black/60 text-white border border-white/40 hover:border-white text-xs sm:text-sm font-medium tracking-wide rounded-full backdrop-blur-xs transition"
            >
              Wholesale Orders
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2026 OFFICIAL CATALOGUE SPOTLIGHT                                         */}
      {/* ========================================================================= */}
      {/* <section className="bg-[#11161F] text-white py-16 sm:py-24 border-b border-[#243242]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#182333] to-[#0D141F] rounded-[3rem] p-8 sm:p-14 border-2 border-[#C5A265]/40 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
             
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A265]/20 border border-[#C5A265]/40 text-[#E6CA85] text-[11px] uppercase tracking-widest font-semibold">
                  <span>✦</span>
                  <span>NEW 2026-27 COLLECTION</span>
                  <span>✦</span>
                </div>
                <h2 className="font-editorial-heading text-3xl sm:text-5xl text-white font-normal leading-tight">
                  Official Institutional School Uniform Catalogue
                </h2>
                <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                  Browse all 9 high-resolution pages covering Assembly Oxford Sets, 4-House Sports Day Polos, Academy Tracksuits, Worsted Poly-Wool Blazers, 12GG V-Neck Sweaters, Accessories, and Custom Swatches.
                </p>

                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <Link
                    href="/catalogue"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#C5A265] hover:bg-[#B39054] text-[#11161F] font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transition transform hover:-translate-y-0.5"
                  >
                    <span>Browse Digital Flipbook (9 Pages) →</span>
                  </Link>

                  <a
                    href="/catalogues/rooztextile-school-uniform-catalogue.pdf"
                    download="rooztextile-school-uniform-catalogue.pdf"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium text-xs uppercase tracking-wider rounded-full transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download PDF (Print Ready)</span>
                  </a>
                </div>
              </div>
              <div className="lg:col-span-6 flex items-center justify-center">
                <Link href="/catalogue" className="group relative block w-full max-w-sm">
                  <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C5A265]/50 group-hover:scale-[1.02] transition-transform duration-500">
                    <Image
                      src="/images/catalogue/page-1.png"
                      alt="RoozTextile 2026 Institutional Catalogue Cover"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                      <span className="px-5 py-2 bg-[#C5A265] text-[#11161F] text-xs uppercase tracking-wider font-bold rounded-full shadow-lg">
                        Click to Open Catalogue →
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* ========================================================================= */}
      {/* 2. DUSTY SLATE BLUE ROUNDED CATEGORIES SHOWCASE                           */}
      {/* ========================================================================= */}
      {/* <section className="py-20 sm:py-28 bg-[#6F8FA8] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/80 font-medium">
              Featured Uniform Collections
            </span>
            <h2 className="font-editorial-heading text-3xl sm:text-4xl text-white font-normal">
              Tailored For Every Institution
            </h2>
          </div>

       
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">

            <div
              onClick={() => setSelectedProduct(girlsProduct)}
              className="group relative aspect-[4/3] sm:aspect-[16/11] rounded-[2.5rem] overflow-hidden bg-[#56758D] cursor-pointer shadow-xl transition-transform duration-500 hover:-translate-y-1"
            >
              <Image
                src="/images/catalogue/page-2.png"
                alt="Shop School Assembly Uniform Sets"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10 transition-opacity group-hover:opacity-85" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <span className="text-xs uppercase tracking-[0.2em] text-white/90 font-light mb-1">
                  SHOP
                </span>
                <h3 className="editorial-underline text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
                  Assembly Sets
                </h3>
                <p className="text-xs text-white/80 mt-4 max-w-xs font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Oxford shirts, permanent knife-pleated skirts & tailored trousers
                </p>
              </div>
            </div>


            <div
              onClick={() => setSelectedProduct(housePoloProduct)}
              className="group relative aspect-[4/3] sm:aspect-[16/11] rounded-[2.5rem] overflow-hidden bg-[#56758D] cursor-pointer shadow-xl transition-transform duration-500 hover:-translate-y-1"
            >
              <Image
                src="/images/catalogue/page-4.png"
                alt="Shop 4-House Sports Day Polos"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10 transition-opacity group-hover:opacity-85" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <span className="text-xs uppercase tracking-[0.2em] text-white/90 font-light mb-1">
                  SHOP
                </span>
                <h3 className="editorial-underline text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
                  House & PT Polos
                </h3>
                <p className="text-xs text-white/80 mt-4 max-w-xs font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  4-House athletic jerseys (Red, Blue, Green, Yellow) with twin racing stripes
                </p>
              </div>
            </div>


            <div
              onClick={() => setSelectedProduct(blazerProduct)}
              className="group relative aspect-[4/3] sm:aspect-[16/11] rounded-[2.5rem] overflow-hidden bg-[#56758D] cursor-pointer shadow-xl transition-transform duration-500 hover:-translate-y-1"
            >
              <Image
                src="/images/catalogue/page-6.png"
                alt="Shop Formal School Blazers"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/15 transition-opacity group-hover:opacity-85" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <span className="text-xs uppercase tracking-[0.2em] text-white/90 font-light mb-1">
                  SHOP
                </span>
                <h3 className="editorial-underline text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
                  School Blazers
                </h3>
                <p className="text-xs text-white/80 mt-4 max-w-xs font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Single-breasted worsted poly-wool & crested institutional blazers
                </p>
              </div>
            </div>

           
            <div
              onClick={() => setSelectedProduct(tracksuitProduct)}
              className="group relative aspect-[4/3] sm:aspect-[16/11] rounded-[2.5rem] overflow-hidden bg-[#56758D] cursor-pointer shadow-xl transition-transform duration-500 hover:-translate-y-1"
            >
              <Image
                src="/images/catalogue/page-5.png"
                alt="Shop School Tracksuits & Jackets"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/15 transition-opacity group-hover:opacity-85" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <span className="text-xs uppercase tracking-[0.2em] text-white/90 font-light mb-1">
                  SHOP
                </span>
                <h3 className="editorial-underline text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
                  Tracksuits & Pants
                </h3>
                <p className="text-xs text-white/80 mt-4 max-w-xs font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Full-zip athletic jackets with brushed fleece & contrast track pants
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

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
                RoozTextile
              </div>

              {/* Location Block */}
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 block">
                  ATELIER & MILL LOCATION
                </span>
                <h3 className="font-display-bold text-xl sm:text-2xl md:text-3xl tracking-tight leading-snug text-white uppercase">
                  BAJEPROTAPPUR, SUBJALAPUL<br />
                  BESIDE HANUMAN MANDIR<br />
                  BURDWAN, WEST BENGAL
                </h3>
                <p className="text-xs text-white/80 tracking-wider pt-1 font-mono">
                  GSTIN: {companyData.gstNumber}
                </p>
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
                    href={getWhatsAppUrl("Hello RoozTextile, I am contacting your concierge regarding suiting, shirts, and custom apparel.")}
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

            {/* Right Column: Large Rounded School Uniform Portrait */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] rounded-[3rem] overflow-hidden bg-[#56758D] shadow-2xl">
                <Image
                  src="/images/boys-uniform.jpg"
                  alt="RoozTextile School Uniform Standards"
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
                  src="/images/girls-uniform.jpg"
                  alt="Our School Partner Community"
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
                  Dr. Alistair Henderson, Procurement Head
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#6F8FA8] font-semibold">
                  St. Xavier&apos;s Heritage Academy (2,400+ Students)
                </p>
                <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                  &ldquo;RoozTextile has supplied our entire secondary school body with winter poly-wool blazers and summer Oxford shirts for 8 consecutive sessions. The dye consistency across annual reorders and reinforced stitching save our parents considerable money.&rdquo;
                </p>
              </div>

              <div className="space-y-2 border-t border-[#E5DDD0] pt-8">
                <h3 className="font-editorial-heading text-xl sm:text-2xl font-bold text-[#11161F]">
                  Sister Mary Margaret, Principal & Trustee
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#6F8FA8] font-semibold">
                  Convent of Jesus & Mary High School (1,800+ Students)
                </p>
                <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                  &ldquo;Managing uniforms across 4 house factions was a logistics challenge until we partnered with RoozTextile. Their permanent knife-pleated skirts genuinely hold up to industrial machine washes without losing their sharpness.&rdquo;
                </p>
              </div>

              <div className="space-y-2 border-t border-[#E5DDD0] pt-8">
                <h3 className="font-editorial-heading text-xl sm:text-2xl font-bold text-[#11161F]">
                  Col. Rajeshwardeep Singh (Retd.), Bursar
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#6F8FA8] font-semibold">
                  The Lawrence Valley Boarding School (3,200+ Students)
                </p>
                <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                  &ldquo;What sets Rooz apart is their Raymond-level textile pedigree. When we needed bespoke house tartan pinafores and heavy crested blazers, they delivered strike-offs in days and completed our 3,500-piece tender on time.&rdquo;
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
            src="/images/school-hero.jpg"
            alt="Craft, Curate, and Elevate"
            fill
            className="object-cover object-center filter brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="font-serif-brand text-xl sm:text-2xl tracking-tight text-white/90 font-normal">
            RoozTextile
          </span>

          <h2 className="font-editorial-heading text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.05]">
            Craft, Curate,<br />and Elevate
          </h2>

          <p className="text-sm sm:text-base text-neutral-200 max-w-lg mx-auto font-light leading-relaxed">
            Partner with our weaving mills for bespoke school blazers, institutional student apparel, or annual academy uniform tenders.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#DFF7C8] hover:bg-[#D0F0B3] text-[#11161F] font-semibold text-xs sm:text-sm tracking-wide rounded-full shadow-lg transition uppercase"
            >
              Request School Catalog
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
