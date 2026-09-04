import React from "react";
import Image from "next/image";
import { getWhatsAppUrl, getSampleKitUrl } from "@/lib/whatsapp";

export default function AboutPage() {
  return (
    <main className="w-full bg-[#FDFBF7] text-[#11161F]">
      {/* 1. HERO SECTION (Inspired by Image 1 & 5) */}
      <section className="relative w-full min-h-[50vh] sm:min-h-[58vh] flex items-center justify-center overflow-hidden bg-[#11161F] text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/school-hero.jpg"
            alt="The Rooz Textile School Uniform Atelier"
            fill
            priority
            className="object-cover object-center filter brightness-[0.72]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20 space-y-4">
          <span className="font-serif-brand text-2xl sm:text-3xl tracking-tight text-white/90 font-normal">
            rooz textile
          </span>
          <h1 className="font-display-bold text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-none drop-shadow-md">
            SOUL, SUBSTANCE & SARTORIAL ART
          </h1>
          <p className="text-sm sm:text-base text-neutral-200 max-w-xl mx-auto font-light leading-relaxed">
            Three decades of bespoke school blazers, fine shirting, and institutional academy uniform excellence since 1994.
          </p>
        </div>
      </section>

      {/* 2. SPLIT PHILOSOPHY & HERITAGE (Inspired by Image 3) */}
      <section className="py-20 sm:py-28 bg-[#6F8FA8] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Bold Typography & Heritage */}
            <div className="lg:col-span-6 space-y-8">
              <div className="font-serif-brand text-3xl sm:text-4xl tracking-tight text-white font-normal">
                the atelier tradition
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 block">
                  HERITAGE SINCE 1994
                </span>
                <h3 className="font-display-bold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight text-white">
                  WEAVING THE FUTURE<br />OF TIMELESS APPAREL
                </h3>
              </div>

              <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">
                Drawing inspiration from historic woolen houses like Raymond and the tailoring ateliers of Savile Row, Rooz Textile established its first weaving looms in 1994. We set out to eliminate the false divide between luxurious drape and industrial longevity.
              </p>

              <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">
                Today, our vertical weaving, CAD cutting, and computerized embroidery mills produce over 65,000 tailored garments each month, serving corporate leadership, luxury labels, and 250+ prestigious academies worldwide.
              </p>

              <div className="pt-2 flex items-center gap-8 border-t border-white/30 pt-6">
                <div>
                  <span className="font-display-bold text-3xl sm:text-4xl text-white block">
                    1994
                  </span>
                  <span className="text-[10px] text-white/80 uppercase tracking-widest">
                    Founded
                  </span>
                </div>
                <div>
                  <span className="font-display-bold text-3xl sm:text-4xl text-white block">
                    500+
                  </span>
                  <span className="text-[10px] text-white/80 uppercase tracking-widest">
                    Organizations
                  </span>
                </div>
                <div>
                  <span className="font-display-bold text-3xl sm:text-4xl text-white block">
                    98.7%
                  </span>
                  <span className="text-[10px] text-white/80 uppercase tracking-widest">
                    Retention
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Large Rounded Portrait */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-[#56758D] shadow-2xl">
                <Image
                  src="/images/boys-uniform.jpg"
                  alt="Rooz Textile School Uniform Craftsmanship"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ROUNDED WORKSHOP SHOWCASE (Inspired by Image 2 Cards) */}
      <section className="py-20 sm:py-28 bg-[#FAF7F0] border-t border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7D1826] font-medium">
              Vertical Production
            </span>
            <h2 className="font-editorial-heading text-3xl sm:text-4xl text-[#11161F] font-normal">
              Four Pillars of Mill Craftsmanship
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative p-8 sm:p-10 bg-white rounded-[2.5rem] border border-[#E5DDD0] space-y-3 shadow-sm hover:shadow-md transition">
              <span className="text-xs uppercase tracking-[0.2em] text-[#6F8FA8] font-semibold block">
                01 • LOOM WEAVING
              </span>
              <h3 className="text-2xl font-light text-[#11161F]">
                Precision Rapier Weaving
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed pt-2">
                High-speed electronic looms weaving Super 130s Merino worsted wools, royal Oxfords, and steep twill gabardines under strict tension and humidity controls.
              </p>
            </div>

            <div className="relative p-8 sm:p-10 bg-white rounded-[2.5rem] border border-[#E5DDD0] space-y-3 shadow-sm hover:shadow-md transition">
              <span className="text-xs uppercase tracking-[0.2em] text-[#6F8FA8] font-semibold block">
                02 • PATTERN CUTTING
              </span>
              <h3 className="text-2xl font-light text-[#11161F]">
                Automated Vacuum CAD
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed pt-2">
                Multi-ply vacuum cutting tables ensuring 0.5mm precision across both bespoke made-to-measure orders and institutional student sizing charts.
              </p>
            </div>

            <div className="relative p-8 sm:p-10 bg-white rounded-[2.5rem] border border-[#E5DDD0] space-y-3 shadow-sm hover:shadow-md transition">
              <span className="text-xs uppercase tracking-[0.2em] text-[#6F8FA8] font-semibold block">
                03 • CONSTRUCTION
              </span>
              <h3 className="text-2xl font-light text-[#11161F]">
                Floating Half-Canvas
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed pt-2">
                Natural horsehair canvas hand-inserted into blazer foreparts, ensuring lapels and chest panels mold organically to the wearer&apos;s shape over time.
              </p>
            </div>

            <div className="relative p-8 sm:p-10 bg-white rounded-[2.5rem] border border-[#E5DDD0] space-y-3 shadow-sm hover:shadow-md transition">
              <span className="text-xs uppercase tracking-[0.2em] text-[#6F8FA8] font-semibold block">
                04 • QUALITY CONTROL
              </span>
              <h3 className="text-2xl font-light text-[#11161F]">
                5-Stage Rigorous QC
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed pt-2">
                Every finished garment undergoes button pull testing (70N standard), Martindale rub cycles, steam contour pressing, and automated needle detection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SHOWROOM & VISIT BANNER (Inspired by Image 5) */}
      <section className="relative w-full py-24 sm:py-32 bg-[#11161F] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/girls-uniform.jpg"
            alt="School Uniform Consultation"
            fill
            className="object-cover object-center filter brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="font-serif-brand text-xl sm:text-2xl tracking-tight text-white/90 font-normal">
            rooz textile
          </span>

          <h2 className="font-editorial-heading text-4xl sm:text-6xl font-normal text-white tracking-tight leading-[1.05]">
            Tour Our Mills &<br />Private Showroom
          </h2>

          <p className="text-sm sm:text-base text-neutral-200 max-w-lg mx-auto font-light leading-relaxed">
            We welcome corporate leadership teams, uniform committees, and designers to inspect our active looms, fabric archives, and sample racks.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <a
              href={getWhatsAppUrl("Hello Rooz Textile, We would like to schedule an appointment to visit your mill and executive showroom.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#11161F] font-semibold text-xs sm:text-sm tracking-wide rounded-full shadow-lg transition uppercase hover:bg-[#FAF7F0]"
            >
              Book Showroom Visit on WhatsApp →
            </a>
            <a
              href={getSampleKitUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent text-white border border-white/60 font-semibold text-xs sm:text-sm tracking-wide rounded-full hover:bg-white/10 transition uppercase"
            >
              Order Swatch Box
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
