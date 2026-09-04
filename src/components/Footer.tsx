import React from "react";
import Link from "next/link";
import { companyData } from "@/data/company";
import { getWhatsAppUrl } from "@/lib/whatsapp";

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
              Premier institutional manufacturer of Raymond-grade poly-wool blazers, crisp Oxford shirts, permanent pleated skirts, and academy uniforms since 1994.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={getWhatsAppUrl("Hello Rooz Textile, I would like to inquire about school uniform supply and sample swatches.")}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full bg-[#25D366] text-white hover:bg-[#1EBE5D] text-xs uppercase tracking-wider font-bold transition shadow-lg animate-wp-pulse select-none"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-85" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.086-.177.18-.076.354.101.173.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.375-.044.102-.115.433-.505.549-.679.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824zm-3.392-10.416c-4.283 0-7.766 3.483-7.766 7.766 0 1.37.356 2.656.974 3.774l-1.034 3.778 3.865-1.014c1.077.587 2.316.924 3.636.924 4.283 0 7.766-3.483 7.766-7.766 0-4.283-3.483-7.766-7.766-7.766zm0 14.075c-1.157 0-2.287-.311-3.271-.9l-.234-.139-2.431.637.649-2.37-.153-.244c-.646-1.026-.987-2.213-.987-3.43 0-3.479 2.831-6.31 6.31-6.31s6.31 2.831 6.31 6.31-2.831 6.31-6.31 6.31z" />
              </svg>
              <span>WhatsApp Concierge</span>
            </a>
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
              SCHOOL UNIFORMS
            </span>
            <ul className="space-y-2 font-light text-neutral-300">
              <li>
                <Link href="/products?category=school-blazers" className="hover:text-white transition">
                  Poly-Wool School Blazers
                </Link>
              </li>
              <li>
                <Link href="/products?category=school-shirts" className="hover:text-white transition">
                  Pinpoint Oxford Shirts
                </Link>
              </li>
              <li>
                <Link href="/products?category=school-skirts" className="hover:text-white transition">
                  Permanent Pleated Skirts
                </Link>
              </li>
              <li>
                <Link href="/products?category=school-skirts" className="hover:text-white transition">
                  Tartan Pinafores & Tunics
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
              ATELIER & MILL
            </span>
            <p className="font-light text-neutral-300 leading-relaxed text-xs">
              {companyData.address.street}<br />
              {companyData.address.area}<br />
              {companyData.address.city}, {companyData.address.state}<br />
              India
            </p>
            <p className="font-light text-neutral-300 text-xs">
              <span className="text-[#8BA8BF] font-semibold">GSTIN:</span> {companyData.gstNumber}
            </p>
            <p className="font-light text-neutral-400 text-xs">
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
