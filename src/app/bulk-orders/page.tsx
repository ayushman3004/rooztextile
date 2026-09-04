"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getSampleKitUrl, getWhatsAppUrl } from "@/lib/whatsapp";
import QuoteBuilderModal from "@/components/QuoteBuilderModal";

export default function BulkOrdersPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <main className="w-full bg-[#FDFBF7] text-[#11161F]">
      {/* 1. HERO SECTION (Inspired by Image 1 & 5) */}
      <section className="relative w-full min-h-[50vh] sm:min-h-[58vh] flex items-center justify-center overflow-hidden bg-[#11161F] text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/school-hero.jpg"
            alt="Wholesale & Bulk School Uniform Programs"
            fill
            priority
            className="object-cover object-center filter brightness-[0.72]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20 space-y-4">
          <span className="font-serif-brand text-2xl sm:text-3xl tracking-tight text-white/90 font-normal">
            RoozTextile Wholesale
          </span>
          <h1 className="font-display-bold text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-none drop-shadow-md">
            WHOLESALE, MOQS & BESPOKE TIERS
          </h1>
          <p className="text-sm sm:text-base text-neutral-200 max-w-xl mx-auto font-light leading-relaxed">
            Direct mill pricing, structured volume tiers, and priority loom slots for corporate suiting and institutional school contracts.
          </p>
        </div>
      </section>

      {/* 2. ROUNDED TIER CARDS ON DUSTY SLATE BLUE (Inspired by Image 2) */}
      <section className="py-20 sm:py-28 bg-[#6F8FA8] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/80 font-medium">
              PROCUREMENT TIERS
            </span>
            <h2 className="font-editorial-heading text-3xl sm:text-4xl text-white font-normal">
              Structured Volume Brackets
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <div className="relative p-8 sm:p-10 bg-white rounded-[2.5rem] text-[#11161F] space-y-6 flex flex-col justify-between shadow-xl">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.2em] text-[#7D1826] font-bold block">
                  TIER 01 • EXECUTIVE PILOT
                </span>
                <h3 className="text-3xl font-light text-[#11161F]">
                  20 – 50 Units
                </h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed pt-2">
                  Tailored for corporate management boards, boutique retail private labels, and trial prototype evaluations.
                </p>
                <ul className="space-y-2 text-xs text-neutral-700 pt-3 border-t border-neutral-200 font-light">
                  <li className="flex items-center gap-2">
                    <span className="text-[#6F8FA8] font-bold">✓</span>
                    <span>Direct mill pricing for low MOQ</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#6F8FA8] font-bold">✓</span>
                    <span>Super 130s Merino & Giza cotton</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#6F8FA8] font-bold">✓</span>
                    <span>Personalized inner monogramming</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#6F8FA8] font-bold">✓</span>
                    <span>Lead time: 10–14 business days</span>
                  </li>
                </ul>
              </div>

              <a
                href={getWhatsAppUrl("Hello RoozTextile, I am inquiring regarding Tier 1 Executive MOQ (20-50 units).")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#11161F] text-white hover:bg-[#6F8FA8] text-xs uppercase tracking-wider font-semibold rounded-full transition text-center block"
              >
                Inquire Tier 1 on WhatsApp →
              </a>
            </div>

            {/* Tier 2 */}
            <div className="p-8 sm:p-10 bg-[#56758D] rounded-[2.5rem] text-white space-y-6 flex flex-col justify-between shadow-xl border-2 border-white/40 relative">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.2em] text-white/80 font-bold block">
                  TIER 02 • CORPORATE & CAMPUS
                </span>
                <h3 className="text-3xl font-light text-white">
                  50 – 500 Units
                </h3>
                <p className="text-xs text-white/90 font-light leading-relaxed pt-2">
                  Engineered for commercial sales forces, luxury hospitality attire, and campus academic replacements.
                </p>
                <ul className="space-y-2 text-xs text-white/90 pt-3 border-t border-white/30 font-light">
                  <li className="flex items-center gap-2">
                    <span className="text-white font-bold">✓</span>
                    <span><strong>15–20% Wholesale Volume Rebate</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-white font-bold">✓</span>
                    <span>Complimentary Physical Sizing Rack</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-white font-bold">✓</span>
                    <span>Custom Woven Silk Neck Labels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-white font-bold">✓</span>
                    <span>Free Doorstep Tracked Courier</span>
                  </li>
                </ul>
              </div>

              <a
                href={getWhatsAppUrl("Hello RoozTextile, We would like to request quotation for Tier 2 volume (50-500 units).")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-white text-[#11161F] hover:bg-[#FAF7F0] text-xs uppercase tracking-wider font-bold rounded-full transition text-center block shadow-md"
              >
                Inquire Tier 2 on WhatsApp →
              </a>
            </div>

            {/* Tier 3 */}
            <div className="relative p-8 sm:p-10 bg-white rounded-[2.5rem] text-[#11161F] space-y-6 flex flex-col justify-between shadow-xl">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.2em] text-[#7D1826] font-bold block">
                  TIER 03 • ENTERPRISE & TRUST
                </span>
                <h3 className="text-3xl font-light text-[#11161F]">
                  500+ Units
                </h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed pt-2">
                  Engineered for multi-branch corporate networks, airline fleets, and state boarding academies.
                </p>
                <ul className="space-y-2 text-xs text-neutral-700 pt-3 border-t border-neutral-200 font-light">
                  <li className="flex items-center gap-2">
                    <span className="text-[#6F8FA8] font-bold">✓</span>
                    <span><strong>Maximum Enterprise Mill Pricing</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#6F8FA8] font-bold">✓</span>
                    <span>Custom Loom Weaving to Pantone Shade</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#6F8FA8] font-bold">✓</span>
                    <span>Dedicated Master Tailor Measuring Camp</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#6F8FA8] font-bold">✓</span>
                    <span>Staggered Dispatch Across Academic Year</span>
                  </li>
                </ul>
              </div>

              <a
                href={getWhatsAppUrl("Hello RoozTextile, We require a formal enterprise tender quote for 500+ units.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#11161F] text-white hover:bg-[#6F8FA8] text-xs uppercase tracking-wider font-semibold rounded-full transition text-center block"
              >
                Inquire Enterprise Tier 3 →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SPLIT SIZING RACK PROGRAM (Inspired by Image 3) */}
      <section className="py-20 sm:py-28 bg-[#FAF7F0] border-t border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#7D1826] font-medium">
                ZERO-FRICTION FITTING
              </span>
              <h2 className="font-editorial-heading text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#11161F]">
                Complimentary Sizing Rack Loaner Program
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                Eliminate sizing mismatches. When you partner with RoozTextile, we courier a complete trial rack of finished blazers and shirts (Chest sizes 36 to 46 for executive, 22 to 44 for academies) directly to your administrative office.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={getSampleKitUrl({ notes: "Requesting Sizing Rack Program" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-[#11161F] text-white font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-[#6F8FA8] transition shadow-md"
                >
                  Request Sizing Rack on WhatsApp →
                </a>
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="px-8 py-3.5 bg-white text-[#11161F] border border-[#D3CBBF] font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-[#F7F3EB] transition"
                >
                  Interactive Quote Form
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-[#EDE7DC] shadow-xl">
                <Image
                  src="/images/girls-uniform.jpg"
                  alt="School Uniform Sizing and Fitting Sessions"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuoteBuilderModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </main>
  );
}
