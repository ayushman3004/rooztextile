"use client";

import React, { useState } from "react";
import Image from "next/image";
import { companyData } from "@/data/company";
import { getCustomQuoteUrl, getWhatsAppUrl } from "@/lib/whatsapp";

export default function ContactPage() {
  const [clientName, setClientName] = useState("");
  const [city, setCity] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderType, setOrderType] = useState("Executive Super 130s Merino Blazers");
  const [quantityRange, setQuantityRange] = useState("50 - 200 units");
  const [requirements, setRequirements] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = getCustomQuoteUrl({
      clientName: `${clientName} (${city})`,
      contactName,
      phone,
      orderType,
      quantityRange,
      requirements,
    });
    window.open(url, "_blank");
    setSubmitted(true);
  };

  return (
    <main className="w-full bg-[#FDFBF7] text-[#11161F]">
      {/* 1. HERO SPLIT SECTION (Matching Image 3 exactly) */}
      <section className="py-20 sm:py-28 bg-[#6F8FA8] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Bold Minimalist Hierarchy */}
            <div className="lg:col-span-6 space-y-8">
              <div className="font-serif-brand text-3xl sm:text-4xl tracking-tight text-white font-normal">
                rooz textile
              </div>

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

              <div className="pt-2 space-y-4">
                <a
                  href="mailto:concierge@rooztextile.com"
                  className="block text-sm sm:text-base text-white/90 font-mono tracking-wide hover:underline"
                >
                  concierge@rooztextile.com
                </a>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={getWhatsAppUrl("Hello Rooz Textile, I am contacting your concierge desk.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#11161F] text-xs font-semibold rounded-full hover:bg-[#FAF7F0] transition shadow-md uppercase tracking-wider"
                  >
                    Direct WhatsApp Concierge →
                  </a>

                  <a
                    href={`tel:${companyData.phone}`}
                    className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-white border border-white/50 text-xs font-semibold rounded-full hover:bg-white/10 transition uppercase tracking-wider"
                  >
                    Call {companyData.displayPhone}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Large Rounded Fashion Portrait */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] rounded-[3rem] overflow-hidden bg-[#56758D] shadow-2xl">
                <Image
                  src="/images/model-denim-portrait.jpg"
                  alt="Rooz Textile Concierge Desk"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUOTATION REQUEST FORM ON WARM SAND */}
      <section className="py-20 sm:py-28 bg-[#FAF7F0] border-t border-[#E5DDD0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7D1826] font-medium">
              WHOLESALE INQUIRIES
            </span>
            <h2 className="font-editorial-heading text-3xl sm:text-4xl text-[#11161F] font-normal">
              Request a Formal Quote Sheet
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-light">
              Structured quotation transmission directly to our senior suiting concierge on WhatsApp.
            </p>
          </div>

          <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-[#E5DDD0] shadow-sm">
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <span className="text-3xl text-[#6F8FA8]">✓</span>
                <h4 className="font-editorial-heading text-2xl font-normal text-[#11161F]">
                  Inquiry Launched on WhatsApp
                </h4>
                <p className="text-xs text-neutral-600 max-w-md mx-auto font-light">
                  Your specifications have been formatted and transmitted. Our senior suiting concierge has received your request.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-[#6F8FA8] hover:underline pt-2 uppercase tracking-wider"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#11161F] uppercase tracking-wider mb-1.5">
                      Organization / School Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Zenith Corporate or St. Xavier's"
                      className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#D3CBBF] rounded-full text-xs focus:border-[#6F8FA8] focus:outline-none text-[#11161F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#11161F] uppercase tracking-wider mb-1.5">
                      City & State *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. New Delhi, NCR"
                      className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#D3CBBF] rounded-full text-xs focus:border-[#6F8FA8] focus:outline-none text-[#11161F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#11161F] uppercase tracking-wider mb-1.5">
                      Contact Person & Designation *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Raghav Kapoor (Director)"
                      className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#D3CBBF] rounded-full text-xs focus:border-[#6F8FA8] focus:outline-none text-[#11161F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#11161F] uppercase tracking-wider mb-1.5">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#D3CBBF] rounded-full text-xs focus:border-[#6F8FA8] focus:outline-none text-[#11161F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#11161F] uppercase tracking-wider mb-1.5">
                      Garment Category *
                    </label>
                    <select
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#D3CBBF] rounded-full text-xs focus:border-[#6F8FA8] focus:outline-none text-[#11161F]"
                    >
                      <option value="Super 130s Merino Worsted Blazers">Super 130s Merino Worsted Blazers</option>
                      <option value="2-Ply Egyptian Giza Cotton Shirts">2-Ply Egyptian Giza Cotton Shirts</option>
                      <option value="School Blazers (280-310 GSM Poly-Wool)">School Blazers (280–310 GSM)</option>
                      <option value="School Oxford Shirts & Knife-Pleat Skirts">School Shirts & Pleated Skirts</option>
                      <option value="Custom Woven Jacquard Ties">Custom Woven Jacquard Ties</option>
                      <option value="Complete Corporate Wardrobe Program">Corporate Suiting Program</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#11161F] uppercase tracking-wider mb-1.5">
                      Quantity Bracket *
                    </label>
                    <select
                      value={quantityRange}
                      onChange={(e) => setQuantityRange(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#D3CBBF] rounded-full text-xs focus:border-[#6F8FA8] focus:outline-none text-[#11161F]"
                    >
                      <option value="20 - 50 pieces (Executive Boutique MOQ)">20 – 50 units (Executive MOQ)</option>
                      <option value="50 - 200 pieces (Corporate / Grade Set)">50 – 200 units (Corporate Batch)</option>
                      <option value="200 - 500 pieces (Full Enterprise Batch)">200 – 500 units (Enterprise Batch)</option>
                      <option value="500 - 2000+ pieces (Mega Campus / Multi-Branch)">500 – 2,000+ units (Group Order)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#11161F] uppercase tracking-wider mb-1.5">
                    Specific Requirements or Color Specs
                  </label>
                  <textarea
                    rows={3}
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="e.g. Super 130s navy blazers with genuine horn buttons and custom silk inner lining."
                    className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#D3CBBF] rounded-[1.5rem] text-xs focus:border-[#6F8FA8] focus:outline-none text-[#11161F]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#11161F] text-white hover:bg-[#6F8FA8] font-semibold text-xs uppercase tracking-wider rounded-full shadow-md transition text-center"
                  >
                    Transmit Quote Request to WhatsApp Concierge →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
