"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { getProductInquiryUrl, getSampleKitUrl } from "@/lib/whatsapp";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const isExecutive = product.division === "executive";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FDFBF7] rounded-[2.5rem] shadow-2xl border border-[#E5DDD0] text-[#11161F]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 text-neutral-500 hover:text-black bg-white/90 hover:bg-[#FAF7F0] rounded-full border border-[#E5DDD0] transition shadow-xs"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Media & Badges */}
          <div className="relative bg-[#11161F] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E5DDD0]">
            <div>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 items-start">
                  <span
                    className={`text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${
                      isExecutive
                        ? "bg-white text-[#11161F]"
                        : "bg-[#6F8FA8] text-white"
                    }`}
                  >
                    {isExecutive ? "Sartorial Atelier" : "Institutional Division"}
                  </span>
                  {product.badge && (
                    <span className="bg-black/60 text-white text-[9px] uppercase font-medium tracking-wider px-2.5 py-0.5 rounded-full border border-white/20">
                      {product.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Specs Highlight Bar */}
              <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#1C2430] p-3 rounded-2xl border border-white/10">
                  <span className="block text-[10px] uppercase tracking-wider text-neutral-400">Weight</span>
                  <span className="text-sm font-bold text-[#8BA8BF]">{product.gsm} GSM</span>
                </div>
                <div className="bg-[#1C2430] p-3 rounded-2xl border border-white/10">
                  <span className="block text-[10px] uppercase tracking-wider text-neutral-400">Min Order</span>
                  <span className="text-sm font-bold text-white">{product.moq} pcs</span>
                </div>
                <div className="bg-[#1C2430] p-3 rounded-2xl border border-white/10">
                  <span className="block text-[10px] uppercase tracking-wider text-neutral-400">Lead Time</span>
                  <span className="text-sm font-bold text-white">{product.leadTime}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-[#1C2430] rounded-2xl border border-white/10 text-xs text-neutral-300 font-light">
              <span className="text-white font-semibold block mb-1">
                {isExecutive ? "Sartorial Standards:" : "Durability Assurance:"}
              </span>
              {isExecutive
                ? "Tested for shape memory drape, Woolmark standard fiber crimp, and dry cleaning cycle integrity."
                : "Tested for 100+ commercial wash cycles, AATCC Grade 4.5+ colorfastness rating, and reinforced seams."}
            </div>
          </div>

          {/* Right: Technical Specifications */}
          <div className="p-6 sm:p-8 space-y-5">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#6F8FA8]">
                {product.categoryLabel}
              </span>
              <h2 className="editorial-underline-dark font-editorial-heading text-2xl sm:text-3xl font-normal text-[#11161F] mt-1">
                {product.name}
              </h2>
              <p className="text-xs text-neutral-500 mt-2 font-light italic">{product.tagline}</p>
            </div>

            <p className="text-sm text-neutral-700 leading-relaxed border-t border-b border-[#E5DDD0] py-3 font-light">
              {product.description}
            </p>

            {/* Fabric Details Grid */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-neutral-200">
                <span className="text-neutral-500 font-light">Composition:</span>
                <span className="font-semibold text-[#11161F] text-right">{product.fabric}</span>
              </div>
              {product.threadCount && (
                <div className="flex justify-between py-1 border-b border-neutral-200">
                  <span className="text-neutral-500 font-light">Yarn / Thread Count:</span>
                  <span className="font-semibold text-[#6F8FA8]">{product.threadCount}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-neutral-200">
                <span className="text-neutral-500 font-light">Weave Structure:</span>
                <span className="font-semibold text-[#11161F]">{product.weave}</span>
              </div>
              {product.construction && (
                <div className="flex justify-between py-1 border-b border-neutral-200">
                  <span className="text-neutral-500 font-light">Internal Construction:</span>
                  <span className="font-semibold text-[#11161F] text-right">{product.construction}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-neutral-200">
                <span className="text-neutral-500 font-light">Care Recommendation:</span>
                <span className="text-neutral-700 text-right">{product.careInstructions}</span>
              </div>
            </div>

            {/* Colors */}
            <div>
              <span className="block text-xs font-semibold text-[#11161F] uppercase tracking-wider mb-2">
                Available Weave Colorways:
              </span>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5DDD0] rounded-full text-xs text-neutral-800"
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizing Matrix */}
            <div>
              <span className="block text-xs font-semibold text-[#11161F] uppercase tracking-wider mb-1.5">
                Standard Size Spectrum:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((s, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 bg-[#FAF7F0] border border-[#E5DDD0] rounded-full text-xs font-medium text-[#11161F]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <span className="block text-xs font-semibold text-[#11161F] uppercase tracking-wider mb-1.5">
                Craftsmanship Elements:
              </span>
              <ul className="space-y-1 text-xs text-neutral-700 font-light">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#6F8FA8] font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={getProductInquiryUrl(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#11161F] text-white text-xs font-semibold hover:bg-[#6F8FA8] transition shadow-md text-center uppercase tracking-wider"
              >
                <span>WhatsApp Wholesale Inquiry</span>
                <span>→</span>
              </a>

              <a
                href={getSampleKitUrl({
                  division: isExecutive ? "executive" : "institutional",
                  articles: [product.name],
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white text-[#11161F] border border-[#D3CBBF] text-xs font-semibold hover:bg-[#FAF7F0] transition text-center uppercase tracking-wider"
              >
                Order Swatches
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
