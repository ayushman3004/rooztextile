"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { companyData } from "@/data/company";
import { getWhatsAppUrl, getSampleKitUrl } from "@/lib/whatsapp";
import QuoteBuilderModal from "@/components/QuoteBuilderModal";

interface CataloguePageItem {
  pageNumber: number;
  title: string;
  category: string;
  description: string;
  image: string;
  badge: string;
  aspect: string;
  relatedCategorySlug?: string;
}

const CATALOGUE_PAGES: CataloguePageItem[] = [
  {
    pageNumber: 1,
    title: "Official Catalogue Cover",
    category: "Institutional Overview",
    description:
      "RoozTextile Complete School Uniform Solutions — 2026-27 Academic Year Presentation. Direct institutional manufacturing and bespoke weaving.",
    image: "/images/catalogue/page-1.png",
    badge: "Edition 2026-27",
    aspect: "aspect-[2/3]",
  },
  {
    pageNumber: 2,
    title: "School Uniforms: Classic Assembly Sets",
    category: "Assembly Uniform Sets",
    description:
      "Crisp pinpoint Oxford shirts, permanent steam-baked knife-pleated skirts, woven house regimental ties, and tailored pleated trousers.",
    image: "/images/catalogue/page-2.png",
    badge: "Flagship Uniforms",
    aspect: "aspect-[2/3]",
    relatedCategorySlug: "uniform-sets",
  },
  {
    pageNumber: 3,
    title: "School & PT Performance Sports Polos",
    category: "House & PT Polos",
    description:
      "Breathable moisture-wicking honeycomb pique polo shirts with contrast shoulder piping, anti-curl collar, and playground endurance.",
    image: "/images/catalogue/page-3.png",
    badge: "PT Essential",
    aspect: "aspect-[2/3]",
    relatedCategorySlug: "house-polos",
  },
  {
    pageNumber: 4,
    title: "Official 4-House Colour Sports Day Uniforms",
    category: "House & PT Polos",
    description:
      "Vibrant colorfast House jerseys (Red, Blue, Green, Yellow) featuring twin athletic racing stripes and customized school crests.",
    image: "/images/catalogue/page-4.png",
    badge: "4 House Colors",
    aspect: "aspect-[2/3]",
    relatedCategorySlug: "house-polos",
  },
  {
    pageNumber: 5,
    title: "Academy Athletic Tracksuits & Jackets",
    category: "Tracksuits & Track Pants",
    description:
      "Heavy-duty windproof zip tracksuit jackets with contrast chest blocking, brushed fleece backing, and matching tapered track pants.",
    image: "/images/catalogue/page-5.png",
    badge: "Winter Tracksuits",
    aspect: "aspect-[2/3]",
    relatedCategorySlug: "tracksuits",
  },
  {
    pageNumber: 6,
    title: "Formal School Blazers & Suiting Vests",
    category: "Formal School Blazers",
    description:
      "Raymond-grade worsted poly-wool blazers with structured lapels, reinforced shoulder pads, and handcrafted bullion crests.",
    image: "/images/catalogue/page-6.png",
    badge: "Sartorial Suiting",
    aspect: "aspect-[2/3]",
    relatedCategorySlug: "blazers",
  },
  {
    pageNumber: 7,
    title: "Heritage Academy V-Neck Sweaters & Cardigans",
    category: "Sweaters & Cardigans",
    description:
      "Anti-pilling 12GG fine-gauge knitwear with contrast tricolor stripe tipping along V-neck, cuffs, and hem. Wool-acrylic comfort.",
    image: "/images/catalogue/page-7.png",
    badge: "12GG Knitwear",
    aspect: "aspect-[2/3]",
    relatedCategorySlug: "knitwear",
  },
  {
    pageNumber: 8,
    title: "School Uniform Accessories Suite",
    category: "Accessories (Ties, Belts, Socks)",
    description:
      "High-density micro-jacquard ties, laser-engraved metal buckle belts, cushioned house-stripe socks, bullion badges, and custom lanyards.",
    image: "/images/catalogue/page-8.png",
    badge: "Accessories Suite",
    aspect: "aspect-[2/3]",
    relatedCategorySlug: "accessories",
  },
  {
    pageNumber: 9,
    title: "Custom Uniform Fabrics & Design Program",
    category: "Custom Mill Weaving",
    description:
      "Pantone shade matching, 160+ weave varieties, computerized crest digitizing, pre-production sampling, and nationwide bulk delivery.",
    image: "/images/catalogue/page-9.png",
    badge: "Custom Swatches",
    aspect: "aspect-[3/2]",
    relatedCategorySlug: "uniform-sets",
  },
];

const PRODUCT_FLYERS = [
  {
    id: "flyer-shirt",
    title: "Formal Assembly Shirt & Pleated Skirt",
    tagline: "Pinpoint Oxford & Permanent Steam Pleats",
    image: "/images/catalogue/flyer-shirt.png",
    highlights: ["Breathable Cotton-Rich Blend", "Permanent Steam Pleats", "Reinforced Seams", "Pantone Accurate"],
  },
  {
    id: "flyer-polo",
    title: "4-House Sports Day Polo T-Shirt",
    tagline: "Twin Racing Stripe Athletic Polos",
    image: "/images/catalogue/flyer-polo.png",
    highlights: ["Red, Blue, Green, Yellow", "Honeycomb Pique Mesh", "Fade-Proof Reactive Dye", "Anti-Curl Collar"],
  },
  {
    id: "flyer-tie",
    title: "Bespoke Micro-Jacquard School Tie",
    tagline: "Computerized Woven Crest & Regimental Stripes",
    image: "/images/catalogue/flyer-tie.png",
    highlights: ["Micro-Jacquard Loom Weave", "Floating Wool Interlining", "Stain-Repellent Finish", "Custom Crest Digitizing"],
  },
  {
    id: "flyer-trackpant",
    title: "Performance School Track Pant",
    tagline: "Stretch Interlock with Contrast Side Stripe",
    image: "/images/catalogue/flyer-trackpant.png",
    highlights: ["Comfort Stretch Interlock", "Wide Elastic Waistband", "Bar-Tacked Deep Pockets", "Tapered Ankle Rib"],
  },
  {
    id: "flyer-junior-pe",
    title: "Pre-Primary & Junior PE T-Shirt & Shorts",
    tagline: "Gentle Cotton Jersey Set for Kindergarten",
    image: "/images/catalogue/flyer-junior-pe.png",
    highlights: ["100% Ring-Spun Cotton", "Hypoallergenic Soft Touch", "Easy Self-Dressing Elastic", "Ventilated Seams"],
  },
];

export default function CataloguePage() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomModalImage, setZoomModalImage] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"flipbook" | "flyers">("flipbook");

  const activePage = CATALOGUE_PAGES[currentPageIndex];

  const handlePrev = () => {
    setCurrentPageIndex((prev) => (prev > 0 ? prev - 1 : CATALOGUE_PAGES.length - 1));
  };

  const handleNext = () => {
    setCurrentPageIndex((prev) => (prev < CATALOGUE_PAGES.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== "flipbook") return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setZoomModalImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab]);

  return (
    <div className="w-full bg-[#FDFBF7] text-[#11161F]">
      {/* 1. HERO & DOWNLOAD HEADER */}
      <section className="relative w-full bg-[#11161F] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#243242]">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A265]/20 border border-[#C5A265]/40 text-[#E6CA85] text-[11px] uppercase tracking-widest font-semibold">
            <span>✦</span>
            <span>Official Institutional Archive 2026-27</span>
            <span>✦</span>
          </div>

          <h1 className="font-editorial-heading text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight">
            Institutional School Uniform Catalogue
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            The definitive collection of Raymond-grade poly-wool blazers, crisp pinpoint Oxford shirts, 4-house athletic polos, permanent knife-pleated skirts, and jacquard crest regalia by RoozTextile.
          </p>

          {/* Quick Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="/catalogues/rooztextile-school-uniform-catalogue.pdf"
              download="rooztextile-school-uniform-catalogue.pdf"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#C5A265] hover:bg-[#B39054] text-[#11161F] font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transition transform hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download PDF Catalogue (Print Ready)</span>
            </a>

            <a
              href={getWhatsAppUrl(`Hello RoozTextile Concierge, I am viewing your 2026 Institutional School Uniform Catalogue and would like to request bulk pricing for Page ${activePage.pageNumber}: ${activePage.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transition"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.086-.177.18-.076.354.101.173.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.375-.044.102-.115.433-.505.549-.679.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824zm-3.392-10.416c-4.283 0-7.766 3.483-7.766 7.766 0 1.37.356 2.656.974 3.774l-1.034 3.778 3.865-1.014c1.077.587 2.316.924 3.636.924 4.283 0 7.766-3.483 7.766-7.766 0-4.283-3.483-7.766-7.766-7.766zm0 14.075c-1.157 0-2.287-.311-3.271-.9l-.234-.139-2.431.637.649-2.37-.153-.244c-.646-1.026-.987-2.213-.987-3.43 0-3.479 2.831-6.31 6.31-6.31s6.31 2.831 6.31 6.31-2.831 6.31-6.31 6.31z" />
              </svg>
              <span>Instant WhatsApp Quote</span>
            </a>

            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-wider rounded-full border border-white/20 transition backdrop-blur-xs"
            >
              <span>Build Quotation</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. TAB TOGGLE: 9-PAGE FLIPBOOK vs. 5 PRODUCT FLYERS */}
      <section className="bg-[#6F8FA8] text-white py-4 border-b border-[#82A0B8]">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab("flipbook")}
            className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition ${
              activeTab === "flipbook"
                ? "bg-white text-[#11161F] shadow-sm"
                : "bg-[#56758D] text-white/90 hover:bg-[#4E6B82]"
            }`}
          >
            Institutional Multi-Page Catalogue (9 Pages)
          </button>
          <button
            onClick={() => setActiveTab("flyers")}
            className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition ${
              activeTab === "flyers"
                ? "bg-white text-[#11161F] shadow-sm"
                : "bg-[#56758D] text-white/90 hover:bg-[#4E6B82]"
            }`}
          >
            Product Feature Flyers (5 Sets)
          </button>
        </div>
      </section>

      {/* 3. MAIN VIEWER CONTENT */}
      {activeTab === "flipbook" ? (
        <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
          {/* Active Page Header & Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E5DDD0]">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C5A265] text-[#11161F]">
                  {activePage.badge}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#7392A8] font-bold">
                  Page {activePage.pageNumber} of {CATALOGUE_PAGES.length}
                </span>
              </div>
              <h2 className="font-editorial-heading text-2xl sm:text-3xl text-[#11161F] mt-1 font-semibold">
                {activePage.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-white border border-[#D5C9B5] hover:bg-[#FAF7F0] text-[#11161F] transition shadow-xs"
                title="Previous Page (Left Arrow)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <span className="text-xs font-mono font-medium px-3 py-1 bg-white rounded-full border border-[#D5C9B5]">
                {activePage.pageNumber} / {CATALOGUE_PAGES.length}
              </span>

              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-white border border-[#D5C9B5] hover:bg-[#FAF7F0] text-[#11161F] transition shadow-xs"
                title="Next Page (Right Arrow)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={() => setZoomModalImage(activePage.image)}
                className="p-2.5 rounded-full bg-[#11161F] hover:bg-[#6F8FA8] text-white transition shadow-xs ml-2"
                title="Zoom Page Fullscreen"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Big Interactive Page Display */}
          <div className="relative mx-auto max-w-4xl bg-[#11161F] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#C5A265]/40 group">
            <div
              className={`relative w-full ${
                activePage.aspect === "aspect-[3/2]" ? "aspect-[3/2]" : "aspect-[2/3] max-h-[82vh]"
              } cursor-zoom-in`}
              onClick={() => setZoomModalImage(activePage.image)}
            >
              <Image
                src={activePage.image}
                alt={`RoozTextile Catalogue - ${activePage.title}`}
                fill
                priority
                className="object-contain object-center"
              />
            </div>

            {/* Click to zoom overlay hover hint */}
            <div className="absolute bottom-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 backdrop-blur-xs text-white text-[11px] font-medium px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Click anywhere to enlarge high-res details
            </div>
          </div>

          {/* Page Details & Action Strip */}
          <div className="mt-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5DDD0] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-[#6F8FA8] font-bold">
                Catalogue Specification
              </span>
              <p className="text-sm text-neutral-700 leading-relaxed font-light">
                {activePage.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {activePage.relatedCategorySlug && (
                <Link
                  href={`/products?category=${activePage.relatedCategorySlug}`}
                  className="px-5 py-2.5 rounded-full bg-[#11161F] hover:bg-[#6F8FA8] text-white text-xs uppercase tracking-wider font-semibold transition"
                >
                  View Garments in Shop →
                </Link>
              )}

              <a
                href={getWhatsAppUrl(`Hello RoozTextile Concierge, I would like to place an order/inquiry for Page ${activePage.pageNumber}: ${activePage.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs uppercase tracking-wider font-bold transition flex items-center gap-1.5"
              >
                <span>WhatsApp Inquiry</span>
              </a>
            </div>
          </div>

          {/* Thumbnail Navigation Strip */}
          <div className="mt-10">
            <div className="text-xs uppercase tracking-widest text-[#7392A8] font-bold mb-4">
              Catalogue Pages (Click to Jump)
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
              {CATALOGUE_PAGES.map((page, idx) => (
                <button
                  key={page.pageNumber}
                  onClick={() => setCurrentPageIndex(idx)}
                  className={`group relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    currentPageIndex === idx
                      ? "border-[#C5A265] ring-2 ring-[#C5A265]/30 scale-105 shadow-md"
                      : "border-[#D5C9B5] opacity-75 hover:opacity-100 hover:border-[#6F8FA8]"
                  }`}
                >
                  <div className="relative aspect-[2/3] w-full bg-[#11161F]">
                    <Image
                      src={page.image}
                      alt={page.title}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="bg-[#11161F] text-white text-[10px] font-bold py-1 text-center font-mono">
                    Pg {page.pageNumber}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* 4. PRODUCT FEATURE FLYERS GALLERY */
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#6F8FA8] font-bold">
              Product Focus Sheets
            </span>
            <h2 className="font-editorial-heading text-3xl sm:text-4xl text-[#11161F] font-semibold">
              Official Product Feature Flyers
            </h2>
            <p className="text-sm text-neutral-600 font-light">
              High-resolution product feature brochures showcasing Oxford shirts, 4-House PT polos, jacquard ties, athletic track pants, and kindergarten PE uniforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCT_FLYERS.map((flyer) => (
              <div
                key={flyer.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#E5DDD0] shadow-md hover:shadow-xl transition flex flex-col justify-between"
              >
                <div
                  className="relative aspect-[3/4] bg-[#11161F] cursor-zoom-in group"
                  onClick={() => setZoomModalImage(flyer.image)}
                >
                  <Image
                    src={flyer.image}
                    alt={flyer.title}
                    fill
                    className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-1.5 bg-black/80 text-white text-xs font-semibold rounded-full backdrop-blur-xs">
                      Click to Enlarge
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-editorial-heading text-xl text-[#11161F] font-bold leading-snug">
                      {flyer.title}
                    </h3>
                    <p className="text-xs text-[#6F8FA8] font-medium mt-0.5">
                      {flyer.tagline}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {flyer.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-[#FAF7F0] text-[#11161F] text-[11px] font-medium border border-[#E5DDD0]"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href={getWhatsAppUrl(`Hello RoozTextile, I would like to inquire regarding ${flyer.title} (${flyer.tagline}).`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider text-center rounded-full transition"
                    >
                      Inquire on WhatsApp
                    </a>
                    <button
                      onClick={() => setZoomModalImage(flyer.image)}
                      className="p-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-full transition"
                      title="Enlarge flyer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. PHYSICAL SWATCH & SIZING RACK PROGRAM CTA */}
      <section className="py-16 sm:py-24 bg-[#6F8FA8] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#11161F] rounded-[3rem] p-8 sm:p-14 border-2 border-[#C5A265]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A265] font-bold">
                COMPLIMENTARY INSTITUTIONAL SAMPLES
              </span>
              <h3 className="font-editorial-heading text-2xl sm:text-4xl text-white font-normal leading-tight">
                Request a Physical Sizing Rack & Fabric Swatch Box
              </h3>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                Evaluating uniforms for an upcoming school term or tender? We dispatch a curated presentation box with Raymond-grade suiting swatches, combed cotton pique swatches, and size grading sets directly to your administrative board.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <a
                href={getSampleKitUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-[#C5A265] hover:bg-[#B39054] text-[#11161F] font-bold text-xs uppercase tracking-wider rounded-full shadow-lg text-center transition"
              >
                Dispatch Swatch Box →
              </a>
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-8 py-3.5 bg-transparent border border-white/40 hover:border-white text-white font-semibold text-xs uppercase tracking-wider rounded-full text-center transition"
              >
                Request Bulk Proposal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FULLSCREEN ZOOM MODAL */}
      {zoomModalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setZoomModalImage(null)}
        >
          <button
            onClick={() => setZoomModalImage(null)}
            className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition"
            title="Close (Esc)"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative w-full h-[90vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={zoomModalImage}
              alt="Enlarged Catalogue Details"
              fill
              priority
              className="object-contain"
            />
          </div>

          <div className="absolute bottom-6 text-center text-xs text-neutral-400 font-light">
            Press Esc or click anywhere outside to close
          </div>
        </div>
      )}

      {/* 7. QUOTE BUILDER MODAL */}
      <QuoteBuilderModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}
