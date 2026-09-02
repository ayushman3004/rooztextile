"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { getProductInquiryUrl } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
}

export default function ProductCard({ product, onOpenModal }: ProductCardProps) {
  const whatsappUrl = getProductInquiryUrl(product);
  const isExecutive = product.division === "executive";

  return (
    <div className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-[#E5DDD0] hover:border-[#6F8FA8] transition-all duration-300 hover:shadow-xl relative">
      {/* Image Container */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#11161F] cursor-pointer"
        onClick={() => onOpenModal(product)}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Division Pill */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 items-start">
          <span
            className={`text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full backdrop-blur-md shadow-xs ${
              isExecutive
                ? "bg-white text-[#11161F]"
                : "bg-[#6F8FA8] text-white"
            }`}
          >
            {isExecutive ? "Sartorial Atelier" : "Institutional Division"}
          </span>
          {product.badge && (
            <span className="bg-black/60 backdrop-blur-md text-white text-[9px] uppercase font-medium tracking-wider px-2.5 py-0.5 rounded-full border border-white/20">
              {product.badge}
            </span>
          )}
        </div>

        {/* GSM / Thread Count Badge */}
        <div className="absolute bottom-3.5 right-3.5 bg-black/75 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full border border-white/20">
          {product.threadCount ? `${product.threadCount} • ` : ""}{product.gsm} GSM
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-neutral-500 mb-1.5">
            <span>{product.categoryLabel}</span>
            <span className="font-semibold text-[#11161F]">MOQ: {product.moq} pcs</span>
          </div>

          <h3
            onClick={() => onOpenModal(product)}
            className="font-editorial-heading text-xl font-normal text-[#11161F] group-hover:text-[#6F8FA8] transition-colors cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          <p className="text-xs text-neutral-600 line-clamp-2 mt-2 font-light leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Specifications & Actions */}
        <div className="pt-3 border-t border-[#F0EAE1] space-y-3">
          <div className="text-[11px] text-neutral-500 space-y-1">
            <div className="flex justify-between">
              <span>Fabric:</span>
              <span className="font-medium text-[#11161F] truncate max-w-[170px]">{product.fabric}</span>
            </div>
            {product.construction && (
              <div className="flex justify-between">
                <span>Details:</span>
                <span className="font-medium text-[#11161F] truncate max-w-[170px]">{product.construction}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => onOpenModal(product)}
              className="py-2.5 px-3 text-xs uppercase tracking-wider font-semibold rounded-full border border-[#D3CBBF] text-[#11161F] hover:bg-[#FAF7F0] transition text-center"
            >
              Specs
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 text-xs uppercase tracking-wider font-semibold rounded-full bg-[#11161F] text-white hover:bg-[#6F8FA8] transition text-center shadow-xs flex items-center justify-center gap-1"
            >
              <span>WhatsApp</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
