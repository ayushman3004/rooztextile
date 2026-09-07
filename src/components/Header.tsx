"use client";

import React, { useState } from "react";
import Link from "next/link";
import { companyData } from "@/data/company";
import WhatsAppButton from "./WhatsAppButton";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E5DDD0] transition-all duration-200">
      {/* Top Infinite Marquee Announcement Bar */}
      <div className="bg-[#11161F] text-[#E2EAF0] text-[10px] sm:text-[11px] py-2 overflow-hidden border-b border-neutral-800/80 relative marquee-container cursor-default select-none">
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes marqueeContinuous {
                0% { transform: translate3d(0, 0, 0); -webkit-transform: translate3d(0, 0, 0); }
                100% { transform: translate3d(-100%, 0, 0); -webkit-transform: translate3d(-100%, 0, 0); }
              }
              @-webkit-keyframes marqueeContinuous {
                0% { -webkit-transform: translate3d(0, 0, 0); }
                100% { -webkit-transform: translate3d(-100%, 0, 0); }
              }
              .marquee-track {
                display: flex !important;
                flex-shrink: 0 !important;
                min-width: 100%;
                animation: marqueeContinuous 30s linear infinite !important;
                -webkit-animation: marqueeContinuous 30s linear infinite !important;
                will-change: transform;
              }
              @media (hover: hover) and (pointer: fine) {
                .marquee-container:hover .marquee-track {
                  animation-play-state: paused !important;
                  -webkit-animation-play-state: paused !important;
                }
              }
            `,
          }}
        />
        {/* Left & Right subtle edge fade gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#11161F] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#11161F] to-transparent z-10" />

        <div className="flex flex-nowrap w-max">
          {/* Primary Track */}
          <div className="marquee-track animate-marquee flex items-center shrink-0">
            {[
              { text: "PREMIER SCHOOL UNIFORM MANUFACTURER & INSTITUTIONAL WEAVING MILLS", highlight: false },
              { text: "WHOLESALE ACADEMY CATALOG & BESPOKE CRESTED ORDERS AVAILABLE WORLDWIDE", highlight: true },
              { text: `CONCIERGE: ${companyData.displayPhone}`, href: `tel:${companyData.phone}`, isLink: true, highlight: false },
              { text: "RAYMOND-GRADE WORSTED POLY-WOOL & PERMANENT PLEATED UNIFORMS SINCE 1994", highlight: false },
              { text: "DIRECT MILL SUPPLY FOR 250+ PRESTIGIOUS SCHOOLS & INSTITUTIONS", highlight: true },
              { text: "REQUEST COMPLIMENTARY SIZING RACK & FABRIC SWATCH BOX", highlight: false },
            ].map((item, idx) => (
              <div key={`m1-${idx}`} className="flex items-center">
                {item.isLink ? (
                  <a
                    href={item.href}
                    className="text-[#8BA8BF] hover:text-white transition-colors font-medium tracking-widest uppercase inline-flex items-center"
                  >
                    {item.text}
                  </a>
                ) : (
                  <span
                    className={`tracking-widest uppercase ${item.highlight ? "text-white font-medium" : "text-neutral-400 font-light"
                      }`}
                  >
                    {item.text}
                  </span>
                )}
                <span className="mx-6 text-[10px] text-[#C5A265]/70 select-none">✦</span>
              </div>
            ))}
          </div>

          {/* Duplicate Track for Seamless Infinite Scrolling */}
          <div className="marquee-track animate-marquee flex items-center shrink-0" aria-hidden="true">
            {[
              { text: "PREMIER SCHOOL UNIFORM MANUFACTURER & INSTITUTIONAL WEAVING MILLS", highlight: false },
              { text: "WHOLESALE ACADEMY CATALOG & BESPOKE CRESTED ORDERS AVAILABLE WORLDWIDE", highlight: true },
              { text: `CONCIERGE: ${companyData.displayPhone}`, href: `tel:${companyData.phone}`, isLink: true, highlight: false },
              { text: "RAYMOND-GRADE WORSTED POLY-WOOL & PERMANENT PLEATED UNIFORMS SINCE 1994", highlight: false },
              { text: "DIRECT MILL SUPPLY FOR 250+ PRESTIGIOUS SCHOOLS & INSTITUTIONS", highlight: true },
              { text: "REQUEST COMPLIMENTARY SIZING RACK & FABRIC SWATCH BOX", highlight: false },
            ].map((item, idx) => (
              <div key={`m2-${idx}`} className="flex items-center">
                {item.isLink ? (
                  <a
                    href={item.href}
                    tabIndex={-1}
                    className="text-[#8BA8BF] hover:text-white transition-colors font-medium tracking-widest uppercase inline-flex items-center"
                  >
                    {item.text}
                  </a>
                ) : (
                  <span
                    className={`tracking-widest uppercase ${item.highlight ? "text-white font-medium" : "text-neutral-400 font-light"
                      }`}
                  >
                    {item.text}
                  </span>
                )}
                <span className="mx-6 text-[10px] text-[#C5A265]/70 select-none">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Minimalist Editorial Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Navigation links */}
          <nav className="hidden md:flex items-center gap-5 text-xs uppercase tracking-widest font-medium text-[#11161F]">
            {/* <Link
              href="/catalogue"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#11161F] text-white hover:bg-[#C5A265] hover:text-[#11161F] rounded-full transition font-semibold"
            >
              <span>Catalogue</span>
              <span className="text-[9px] bg-[#C5A265] text-[#11161F] px-1.5 py-0.2 rounded-full font-bold">2026</span>
            </Link> */}
            <Link href="/products?category=uniform-sets" className="hover:text-[#6F8FA8] transition">
              Assembly Sets
            </Link>
            <Link href="/products?category=house-polos" className="hover:text-[#6F8FA8] transition">
              House Polos
            </Link>
            <Link href="/products?category=tracksuits" className="hover:text-[#6F8FA8] transition">
              Tracksuits
            </Link>
            <Link href="/products?category=blazers" className="hover:text-[#6F8FA8] transition">
              Blazers
            </Link>
            <Link href="/products?category=accessories" className="hover:text-[#6F8FA8] transition">
              Accessories
            </Link>
          </nav>

          {/* Center: Delicate Editorial Logo (inspired by 'bhat & rao') */}
          <Link href="/" className="flex flex-col items-center group py-1">
            <span className="font-serif-brand text-2xl sm:text-3xl tracking-tight text-[#11161F] group-hover:text-[#6F8FA8] transition-colors">
              RoozTextile
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#7392A8] font-medium -mt-0.5">
              Est. 1994
            </span>
          </Link>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/bulk-orders"
              className="text-xs uppercase tracking-widest font-medium text-[#11161F] hover:text-[#6F8FA8] transition"
            >
              Bulk Supply
            </Link>
            <Link
              href="/about"
              className="text-xs uppercase tracking-widest font-medium text-[#11161F] hover:text-[#6F8FA8] transition"
            >
              Heritage
            </Link>
            <Link
              href="/contact"
              className="text-xs uppercase tracking-widest font-medium text-[#11161F] hover:text-[#6F8FA8] transition"
            >
              Contact
            </Link>
            <WhatsAppButton
              message="Hello RoozTextile Concierge, I would like to inquire regarding school uniform supply."
              label="Inquire"
              size="sm"
              variant="secondary"
              pulse={true}
              className="px-4 py-2 text-[11px] uppercase tracking-wider font-bold shadow-md"
            />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-3">
            <WhatsAppButton
              message="Hello RoozTextile, I would like to discuss school uniforms."
              label="WhatsApp"
              size="sm"
              variant="secondary"
              pulse={true}
              className="text-[10px] px-3 py-1.5 font-bold shadow-sm"
            />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#11161F] hover:text-[#6F8FA8] transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E5DDD0] bg-[#FDFBF7] px-6 pt-4 pb-8 space-y-4 shadow-xl">
          <Link
            href="/catalogue"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-sm uppercase tracking-widest font-bold text-[#11161F] bg-[#FAF7F0] p-3 rounded-xl border border-[#D5C9B5]"
          >
            <span>2026 Digital Catalogue</span>
            <span className="text-[10px] bg-[#C5A265] text-[#11161F] px-2 py-0.5 rounded-full font-bold">9 Pages</span>
          </Link>
          <Link
            href="/products?category=uniform-sets"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-medium text-[#11161F]"
          >
            Assembly Uniform Sets
          </Link>
          <Link
            href="/products?category=house-polos"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-medium text-[#11161F]"
          >
            House & PT Polos
          </Link>
          <Link
            href="/products?category=tracksuits"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-medium text-[#11161F]"
          >
            Tracksuits & Track Pants
          </Link>
          <Link
            href="/products?category=blazers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-medium text-[#11161F]"
          >
            Formal School Blazers
          </Link>
          <Link
            href="/products?category=knitwear"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-medium text-[#11161F]"
          >
            Sweaters & Cardigans
          </Link>
          <Link
            href="/products?category=accessories"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-medium text-[#11161F]"
          >
            Accessories Suite (Ties, Belts, Socks)
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-medium text-[#11161F]"
          >
            All Catalogue Products
          </Link>
          <Link
            href="/bulk-orders"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-medium text-[#11161F]"
          >
            Bulk School Supply
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-medium text-[#11161F]"
          >
            Mill & Heritage
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-medium text-[#11161F]"
          >
            Contact
          </Link>
          <div className="pt-2">
            <WhatsAppButton
              message="Hello RoozTextile Concierge, I would like to inquire regarding wholesale manufacturing."
              label="WhatsApp Concierge"
              variant="secondary"
              pulse={true}
              className="w-full text-center py-3 text-xs uppercase tracking-wider font-bold shadow-md"
            />
          </div>
        </div>
      )}
    </header>
  );
}
