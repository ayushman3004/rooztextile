import React from "react";
import Link from "next/link";
import { companyData } from "@/data/company";
import WhatsAppButton from "./WhatsAppButton";

export default function Footer() {
  return (
    <footer className="bg-[#11161F] text-[#E2EAF0] border-t border-[#263345] pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Section: Brand & Quick Inquire */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-[#263345]">
          <div className="space-y-1">
            <span className="font-serif-brand text-3xl sm:text-4xl text-white tracking-tight">
              rooz textile
            </span>
            <p className="text-xs text-neutral-400 font-light max-w-md">
              Makers of fine worsted suiting, 2-ply Egyptian Giza cotton shirts, and institutional academy apparel since 1994.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <WhatsAppButton
              message="Hello Rooz Textile, I would like to inquire about wholesale collections and bespoke orders."
              label="WhatsApp Concierge"
              size="sm"
              className="rounded-full bg-white text-[#11161F] hover:bg-[#6F8FA8] hover:text-white border-none text-xs uppercase tracking-wider font-semibold"
            />
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full border border-white/40 hover:border-white text-xs text-white uppercase tracking-wider font-semibold transition"
            >
              Contact Desk
            </Link>
          </div>
        </div>

        {/* 4-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          {/* Column 1: Collections */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8BA8BF] block">
              COLLECTIONS
            </span>
            <ul className="space-y-2 font-light text-neutral-300">
              <li>
                <Link href="/products?category=executive-blazers" className="hover:text-white transition">
                  Executive Worsted Blazers
                </Link>
              </li>
              <li>
                <Link href="/products?category=luxury-shirts" className="hover:text-white transition">
                  2-Ply Egyptian Giza Shirts
                </Link>
              </li>
              <li>
                <Link href="/products?category=school-blazers" className="hover:text-white transition">
                  Poly-Wool School Blazers
                </Link>
              </li>
              <li>
                <Link href="/products?category=school-uniforms" className="hover:text-white transition">
                  Permanent Pleated Skirts
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="hover:text-white transition">
                  Custom Woven Jacquard Ties
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Atelier & Mill */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8BA8BF] block">
              ATELIER & MILL
            </span>
            <ul className="space-y-2 font-light text-neutral-300">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  Mill History Since 1994
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  Half-Canvas Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="/bulk-orders" className="hover:text-white transition">
                  Volume Procurement Tiers
                </Link>
              </li>
              <li>
                <Link href="/bulk-orders" className="hover:text-white transition">
                  Sizing Rack Loaner Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Mill Locations */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8BA8BF] block">
              LOCATION
            </span>
            <p className="font-light text-neutral-300 leading-relaxed">
              Plot 42–45, Textile Park Avenue<br />
              Greater Noida & Surat Mills<br />
              India
            </p>
            <p className="font-light text-neutral-400">
              Tel: {companyData.displayPhone}
            </p>
          </div>

          {/* Column 4: Social */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8BA8BF] block">
              FOLLOW US
            </span>
            <ul className="space-y-2 font-bold tracking-wider text-white">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#8BA8BF] transition">
                  INSTAGRAM
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#8BA8BF] transition">
                  TWITTER
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#8BA8BF] transition">
                  FACEBOOK
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#8BA8BF] transition">
                  LINKEDIN
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-[#263345] flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 font-light gap-4">
          <div>
            &copy; {new Date().getFullYear()} Rooz Textile Mills. All rights reserved.
          </div>
          <div className="flex gap-6">
            <span>Woolmark Certified Fabrics</span>
            <span>•</span>
            <span>OEKO-TEX Standard 100</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
