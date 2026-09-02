"use client";

import React, { useState } from "react";
import { getCustomQuoteUrl } from "@/lib/whatsapp";

interface QuoteBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteBuilderModal({ isOpen, onClose }: QuoteBuilderModalProps) {
  const [clientName, setClientName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [orderType, setOrderType] = useState("Executive Super 130s Merino Blazers");
  const [quantityRange, setQuantityRange] = useState("50 - 200 pieces");
  const [requirements, setRequirements] = useState("");

  if (!isOpen) return null;

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const url = getCustomQuoteUrl({
      clientName: `${clientName} (${city || "Location not specified"})`,
      contactName,
      phone,
      orderType,
      quantityRange,
      requirements,
    });
    window.open(url, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#FDFBF7] border border-[#E5DDD0] rounded-[2.5rem] shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto text-[#11161F]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[#E5DDD0] pb-5">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#6F8FA8]">
              Wholesale & Corporate Procurement
            </span>
            <h2 className="editorial-underline-dark font-editorial-heading text-2xl sm:text-3xl font-normal text-[#11161F] mt-1">
              Request Wholesale Quotation
            </h2>
            <p className="text-xs text-neutral-500 mt-2 font-light">
              Executive worsted blazers, Egyptian Giza shirts, and institutional academy uniforms.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmitWhatsApp} className="mt-6 space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#11161F] uppercase tracking-wider mb-1">
                Company / School / Firm Name *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Apex Corporate Group or St. Jude's Academy"
                className="w-full px-4 py-2.5 bg-white border border-[#D3CBBF] rounded-full text-xs focus:border-[#6F8FA8] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#11161F] uppercase tracking-wider mb-1">
                City & Region *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Mumbai, Maharashtra"
                className="w-full px-4 py-2.5 bg-white border border-[#D3CBBF] rounded-full text-xs focus:border-[#6F8FA8] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#11161F] uppercase tracking-wider mb-1">
                Contact Person & Role *
              </label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g. Vikram Singhania (VP Procurement)"
                className="w-full px-4 py-2.5 bg-white border border-[#D3CBBF] rounded-full text-xs focus:border-[#6F8FA8] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#11161F] uppercase tracking-wider mb-1">
                WhatsApp Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 bg-white border border-[#D3CBBF] rounded-full text-xs focus:border-[#6F8FA8] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#11161F] uppercase tracking-wider mb-1">
                Garment / Division of Interest *
              </label>
              <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#D3CBBF] rounded-full text-xs focus:border-[#6F8FA8] focus:outline-none"
              >
                <option value="Executive Super 130s Merino Blazers">Executive Super 130s Merino Blazers</option>
                <option value="2-Ply Egyptian Giza Cotton Boardroom Shirts">2-Ply Egyptian Giza Cotton Boardroom Shirts</option>
                <option value="Complete Corporate Executive Suiting Wardrobes">Corporate Suiting & Blazer Wardrobes</option>
                <option value="School Poly-Wool Blazers (280-310 GSM)">School Poly-Wool Blazers (280–310 GSM)</option>
                <option value="School Oxford Shirts & Knife-Pleat Skirts">School Uniform Sets (Shirts, Skirts & Ties)</option>
                <option value="Bespoke Private Label Weaving & Manufacturing">Private Label Mill Contract</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#11161F] uppercase tracking-wider mb-1">
                Estimated Order Quantity *
              </label>
              <select
                value={quantityRange}
                onChange={(e) => setQuantityRange(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#D3CBBF] rounded-full text-xs focus:border-[#6F8FA8] focus:outline-none"
              >
                <option value="20 - 50 pieces (Executive Boutique MOQ)">20 – 50 units (Executive Boutique MOQ)</option>
                <option value="50 - 200 pieces (Corporate / Grade Set)">50 – 200 units (Corporate / Grade Set)</option>
                <option value="200 - 500 pieces (Full Enterprise Batch)">200 – 500 units (Full Enterprise Batch)</option>
                <option value="500 - 2000+ pieces (Mega Campus / Group Order)">500 – 2,000+ units (Mega Campus / Group Order)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#11161F] uppercase tracking-wider mb-1">
              Custom Specifications (Pantone colors, Monograms, Half-Canvas, Target Date)
            </label>
            <textarea
              rows={3}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="e.g. Super 130s midnight navy blazers with mother-of-pearl buttons and custom embroidered inner lining."
              className="w-full px-4 py-2.5 bg-white border border-[#D3CBBF] rounded-[1.5rem] text-xs focus:border-[#6F8FA8] focus:outline-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <span className="text-xs text-neutral-500 font-light">
              ⚡ Connects directly to our senior suiting concierge on WhatsApp
            </span>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#11161F] text-white hover:bg-[#6F8FA8] font-semibold text-xs rounded-full shadow-md transition uppercase tracking-wider"
            >
              <span>Transmit to WhatsApp Concierge</span>
              <span>→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
