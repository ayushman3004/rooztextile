"use client";

import React, { useState } from "react";
import Link from "next/link";
import { companyData } from "@/data/company";
import WhatsAppButton from "./WhatsAppButton";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E5DDD0] transition-all duration-200">
      {/* Top Subtle Notification Bar */}
      <div className="bg-[#11161F] text-[#E2EAF0] text-[11px] py-1.5 px-4 text-center tracking-wider">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] sm:text-[11px] uppercase tracking-widest font-light">
          <span className="hidden sm:inline text-neutral-400">
            Sartorial Suiting, Contemporary Apparel & Institutional Mills
          </span>
          <span className="mx-auto sm:mx-0 font-medium text-white">
            Wholesale Catalog & Bespoke Orders Available Worldwide
          </span>
          <a
            href={`tel:${companyData.phone}`}
            className="hidden md:inline text-[#8BA8BF] hover:text-white transition font-normal"
          >
            Concierge: {companyData.displayPhone}
          </a>
        </div>
      </div>

      {/* Main Minimalist Editorial Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-medium text-[#11161F]">
            <Link href="/" className="hover:text-[#6F8FA8] transition">
              Home
            </Link>
            <Link href="/products?category=executive-blazers" className="hover:text-[#6F8FA8] transition">
              Blazers
            </Link>
            <Link href="/products?category=luxury-shirts" className="hover:text-[#6F8FA8] transition">
              Shirting
            </Link>
            <Link href="/products?category=school-blazers" className="hover:text-[#6F8FA8] transition">
              Uniforms
            </Link>
          </nav>

          {/* Center: Delicate Editorial Logo (inspired by 'bhat & rao') */}
          <Link href="/" className="flex flex-col items-center group py-1">
            <span className="font-serif-brand text-2xl sm:text-3xl tracking-tight text-[#11161F] group-hover:text-[#6F8FA8] transition-colors">
              rooz textile
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#7392A8] font-medium -mt-0.5">
              Est. 1994
            </span>
          </Link>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/products"
              className="text-xs uppercase tracking-widest font-medium text-[#11161F] hover:text-[#6F8FA8] transition"
            >
              Lookbook
            </Link>
            <Link
              href="/contact"
              className="text-xs uppercase tracking-widest font-medium text-[#11161F] hover:text-[#6F8FA8] transition"
            >
              Contact
            </Link>
            <WhatsAppButton
              message="Hello Rooz Textile Concierge, I would like to inquire regarding wholesale suiting and lookbook catalog."
              label="Inquire"
              size="sm"
              className="rounded-full bg-[#11161F] text-white hover:bg-[#6F8FA8] border-none px-4 py-2 text-[11px] uppercase tracking-wider"
            />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 text-[#11161F] hover:text-[#6F8FA8] focus:outline-none"
              aria-label="Toggle navigation menu"
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
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-medium text-[#11161F]"
          >
            Home
          </Link>
          <Link
            href="/products?category=executive-blazers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-medium text-[#11161F]"
          >
            Blazers & Suiting
          </Link>
          <Link
            href="/products?category=luxury-shirts"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-medium text-[#11161F]"
          >
            Luxury & Everyday Shirts
          </Link>
          <Link
            href="/products?category=school-blazers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-medium text-[#11161F]"
          >
            School Uniforms
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-medium text-[#11161F]"
          >
            Complete Lookbook
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
              message="Hello Rooz Textile Concierge, I would like to inquire regarding wholesale manufacturing."
              label="WhatsApp Concierge"
              className="w-full text-center rounded-full bg-[#11161F] text-white py-3 text-xs uppercase tracking-wider"
            />
          </div>
        </div>
      )}
    </header>
  );
}
