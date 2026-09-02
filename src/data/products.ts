export interface Product {
  id: string;
  slug: string;
  name: string;
  division: "executive" | "institutional";
  category: "blazers" | "shirts" | "skirts" | "accessories";
  categoryLabel: string;
  tagline: string;
  fabric: string;
  threadCount?: string;
  gsm: number;
  weave: string;
  construction?: string;
  moq: number;
  leadTime: string;
  features: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  image: string;
  badge?: string;
  description: string;
  careInstructions: string;
  embroideryOptions: string[];
}

export const productCategories = [
  { id: "all", label: "All Collections" },
  { id: "executive-blazers", label: "Executive & Sartorial Blazers" },
  { id: "luxury-shirts", label: "Executive Dress Shirts" },
  { id: "school-blazers", label: "Institutional & School Blazers" },
  { id: "school-uniforms", label: "School Skirts, Shirts & Tunics" },
  { id: "accessories", label: "Silk Ties & Accessories" },
] as const;

export const productsData: Product[] = [
  // -------------------------------------------------------------
  // 1. EXECUTIVE & SARTORIAL DIVISION
  // -------------------------------------------------------------
  {
    id: "exec-super130-merino-blazer",
    slug: "super-130s-merino-worsted-blazer",
    name: "Super 130s Australian Merino Worsted Blazer",
    division: "executive",
    category: "blazers",
    categoryLabel: "Executive Suiting",
    tagline: "The quintessential gentleman's boardroom blazer crafted from pure Australian Merino wool",
    fabric: "100% Super 130s Australian Merino Wool",
    threadCount: "Super 130s High-Twist",
    gsm: 270,
    weave: "Four-Season 2x2 Serge Twill",
    construction: "Half-Canvas with Natural Horsehair Chest Interfacing",
    moq: 20,
    leadTime: "10–14 Days",
    features: [
      "Natural stretch & wrinkle recovery for executive travel",
      "Hand-sewn pick-stitching along lapel edge and pocket flaps",
      "Genuine horn buttons with signature cross-tack finish",
      "Breathable pure Bemberg cuprammonium rayon inner lining",
      "Double back vents and functional surgical cuffs option",
    ],
    colors: [
      { name: "Sartorial Midnight Navy", hex: "#0A1428" },
      { name: "Charcoal Heather Serge", hex: "#2B303A" },
      { name: "Rich Tobacco Houndstooth", hex: "#4A3B32" },
      { name: "Deep British Racing Green", hex: "#16281E" },
    ],
    sizes: ["36R", "38R", "40R", "42R", "44R", "46R", "Custom Bespoke Made-to-Measure"],
    image: "/images/blazers.jpg",
    badge: "Super 130s Merino",
    description:
      "A masterwork of sartorial tailoring. Spun from long-staple Australian Merino fleece, this blazer drapes with extraordinary elegance while retaining natural elasticity. The floating half-canvas chest construction molds organically to the wearer's chest over time, embodying the finest Raymond and Savile Row suiting heritage.",
    careInstructions: "Professional dry clean only. Steam refresh recommended. Store on wide cedar coat hangers.",
    embroideryOptions: [
      "Discreet inner pocket monogramming in silk script",
      "Custom woven corporate crest inside jacket lining",
      "Hand-embroidered club or private crest on chest pocket",
    ],
  },
  {
    id: "exec-italian-herringbone-blazer",
    slug: "italian-herringbone-textured-blazer",
    name: "Heritage Italian Herringbone Textured Blazer",
    division: "executive",
    category: "blazers",
    categoryLabel: "Executive Suiting",
    tagline: "Soft shoulder construction with understated textured herringbone drape",
    fabric: "85% Fine Worsted Wool / 15% Mulberry Silk",
    threadCount: "Super 120s Silk-Wool",
    gsm: 290,
    weave: "Subtle Micro-Herringbone Weave",
    construction: "Soft-Tailored Unstructured Shoulder with Buggy Lining",
    moq: 25,
    leadTime: "12–16 Days",
    features: [
      "Lustrous silk blend catches natural daylight with refined sheen",
      "Soft Neapolitan spalla camicia shirt-sleeve shoulder construction",
      "Patch pockets with curved barchetta chest pocket",
      "Unconstructed back for maximum summer airflow",
    ],
    colors: [
      { name: "French Riviera Navy", hex: "#15243E" },
      { name: "Slate Oyster Grey", hex: "#4E5664" },
      { name: "Warm Camel Twill", hex: "#9E7D59" },
    ],
    sizes: ["38R", "40R", "42R", "44R", "46R", "Bespoke"],
    image: "/images/blazers.jpg",
    badge: "Silk-Wool Blend",
    description:
      "Designed for the modern executive who balances formal conferences with smart-casual club meetings. The micro-herringbone weave provides rich visual texture, while the mulberry silk infusion introduces a luxurious drape and subtle shimmer under lighting.",
    careInstructions: "Dry clean only. Do not tumble dry.",
    embroideryOptions: ["Tonal undercollar embroidery", "Personalized tailor's label on inside pocket"],
  },
  {
    id: "exec-egyptian-giza-shirt",
    slug: "2-ply-egyptian-giza-cotton-shirt",
    name: "2-Ply 100s Egyptian Giza Cotton Boardroom Shirt",
    division: "executive",
    category: "shirts",
    categoryLabel: "Executive Dress Shirts",
    tagline: "Silky 100/2 double-twist combed Giza cotton with hand-turned French cutaway collar",
    fabric: "100% Extra-Long Staple Egyptian Giza Cotton",
    threadCount: "100/2 Double-Twist Combed",
    gsm: 145,
    weave: "Royal Twill Luster Weave",
    construction: "Single-Needle French Seams (22 Stitches Per Inch)",
    moq: 30,
    leadTime: "7–10 Days",
    features: [
      "Silky liquid-hand feel with natural cotton luster",
      "Hand-turned semi-spread cutaway collar with removable brass stays",
      "Genuine Australian Mother-of-Pearl shanked buttons",
      "Split back yoke for comfortable shoulder movement across long desk hours",
      "Available in French Double Cuff or Mitered Convertible Cuff",
    ],
    colors: [
      { name: "Pristine Optic White", hex: "#FFFFFF" },
      { name: "Cornflower Executive Blue", hex: "#93B7D8" },
      { name: "Bengal Butcher Stripe", hex: "#416788" },
      { name: "Champagne Ivory", hex: "#FAF5E8" },
    ],
    sizes: ["38 (15)", "39 (15.5)", "40 (16)", "42 (16.5)", "44 (17.5)", "Custom Collar & Sleeve"],
    image: "/images/shirts.jpg",
    badge: "Egyptian Giza Cotton",
    description:
      "The pinnacle of executive shirting. Woven from extra-long staple Egyptian Giza cotton yarns twisted two-ply for remarkable strength and a luminous hand feel. Built with 22 stitches per inch single-needle tailoring, genuine mother-of-pearl buttons, and reinforced side hem gussets.",
    careInstructions: "Machine wash warm 40°C or commercial laundry. Warm steam iron damp for crisp perfection.",
    embroideryOptions: [
      "Hand-embroidered personal monogram on left cuff or ribcage",
      "Custom corporate insignia in tone-on-tone fine thread",
    ],
  },
  {
    id: "exec-royal-oxford-shirt",
    slug: "royal-oxford-weave-formal-shirt",
    name: "Royal Oxford Weave Executive Formal Shirt",
    division: "executive",
    category: "shirts",
    categoryLabel: "Executive Dress Shirts",
    tagline: "Distinctive honeycomb texture with exceptional breathability and crisp silhouette",
    fabric: "100% Long-Staple Combed Cotton",
    threadCount: "80/2 Combed Cotton",
    gsm: 165,
    weave: "Geometric Royal Oxford Weave",
    construction: "Reinforced 5mm Edge Stitching with Fused Collar Band",
    moq: 40,
    leadTime: "7–10 Days",
    features: [
      "Subtle three-dimensional diamond honeycomb texture",
      "Non-curl stiffened collar stays immaculate with or without a tie",
      "Naturally resists wrinkling throughout 14-hour business days",
      "Clean front placket with reinforced bottom horizontal buttonhole",
    ],
    colors: [
      { name: "Classic White", hex: "#FFFFFF" },
      { name: "Sky Glaze Blue", hex: "#B0CEE5" },
      { name: "Silver Pink Pastille", hex: "#ECD7DB" },
      { name: "French Lilac", hex: "#D8CFE5" },
    ],
    sizes: ["38", "39", "40", "42", "44", "46"],
    image: "/images/shirts.jpg",
    badge: "Royal Oxford",
    description:
      "Royal Oxford is celebrated for its distinctive woven basketweave texture that catches ambient light with understated sophistication. More formal than casual Oxford cloth, it provides superior breathability in warm climates while feeling delightfully substantial under a tailored blazer.",
    careInstructions: "Machine wash 40°C. Easy iron setting.",
    embroideryOptions: ["Cuff monogram", "Discreet chest embroidery"],
  },

  // -------------------------------------------------------------
  // 2. INSTITUTIONAL & ACADEMY DIVISION
  // -------------------------------------------------------------
  {
    id: "blazer-polywool-classic",
    slug: "classic-poly-wool-school-blazer",
    name: "Classic Single-Breasted Poly-Wool School Blazer",
    division: "institutional",
    category: "blazers",
    categoryLabel: "School Blazers",
    tagline: "Our flagship Raymond-grade institutional blazer built for endurance & formal poise",
    fabric: "65% Premium Terene / 35% Australian Merino Wool Blend",
    gsm: 280,
    weave: "Precision 2x2 Twill Weave",
    construction: "Reinforced Chest Canvas with Double-Stitched Armholes",
    moq: 50,
    leadTime: "12–16 Days",
    features: [
      "Wrinkle-recovery shape memory across multi-year student wear",
      "Reinforced double-stitched armholes & pocket corners",
      "Breathable high-density viscose twill lining",
      "Anti-pilling finish (Tested up to 30,000 rubs)",
      "Polished heavy brass or engraved institutional crest buttons",
    ],
    colors: [
      { name: "Royal British Navy", hex: "#0E1C36" },
      { name: "Deep Maroon / Crimson", hex: "#6B1D2F" },
      { name: "Forest Academy Green", hex: "#1A382B" },
      { name: "Charcoal Slate", hex: "#2C3539" },
    ],
    sizes: ["24", "26", "28", "30", "32", "34", "36", "38", "40", "42", "Custom Bespoke"],
    image: "/images/blazers.jpg",
    badge: "Flagship School Blazer",
    description:
      "Engineered specifically for elite educational institutions, the Classic Single-Breasted Poly-Wool Blazer marries the natural warmth and drape of fine wool with the indestructible durability of high-tenacity polyester. Each garment is meticulously tailored with structured chest canvas interfacing and padded shoulders that retain immaculate form across multiple academic terms.",
    careInstructions: "Professional dry clean recommended. Mild steam iron at wool setting. Do not bleach.",
    embroideryOptions: [
      "High-density computerized chest pocket crest (up to 12 colors)",
      "Gold / Silver zari metallic thread bullion badges",
      "Woven piping trims along lapels and cuff edges",
    ],
  },
  {
    id: "blazer-crested-notch",
    slug: "crested-wool-blend-notch-lapel-blazer",
    name: "Crested Institutional Heavyweight Wool-Blend Blazer",
    division: "institutional",
    category: "blazers",
    categoryLabel: "School Blazers",
    tagline: "Traditional boarding school cut with high-luster bullion crest detailing",
    fabric: "70% Poly / 30% Fine Worsted Wool",
    gsm: 310,
    weave: "Worsted Heavy Twill Weave",
    construction: "Structured Canvas with Hand-Guided Lapel Roll",
    moq: 60,
    leadTime: "14–18 Days",
    features: [
      "Tailored 2-button front stance with double side vents",
      "Concealed interior passport and stationery pockets",
      "Enhanced colorfastness under direct sun exposure (Grade 4.5+)",
      "Satin taped seam finishing inside lining",
    ],
    colors: [
      { name: "Midnight Navy", hex: "#081225" },
      { name: "Oxblood Crimson", hex: "#561420" },
      { name: "Dark Emerald Green", hex: "#122A1E" },
    ],
    sizes: ["26", "28", "30", "32", "34", "36", "38", "40", "42", "44"],
    image: "/images/blazers.jpg",
    badge: "Boarding School Edition",
    description:
      "A heavyweight masterpiece designed for heritage boarding schools and convents requiring an unmistakable silhouette of authority and discipline. Constructed with hand-guided notch lapels, durable sleeve headers, and institutional-grade seam binding.",
    careInstructions: "Dry clean only. Store on wooden wishbone hangers.",
    embroideryOptions: [
      "Direct-to-garment pocket embroidery",
      "Handmade metal bullion wire crest patches",
      "Contrast edge braid trimming (1.5mm to 3mm)",
    ],
  },
  {
    id: "shirt-oxford-luxury",
    slug: "crisp-oxford-weave-school-shirt",
    name: "Crisp Pinpoint Oxford School Uniform Shirt",
    division: "institutional",
    category: "shirts",
    categoryLabel: "School Uniforms",
    tagline: "Ultra-breathable basketweave cotton blend that stays crisp from morning assembly to dismissal",
    fabric: "65% Combed Cotton / 35% High-Grade Poly Oxford",
    gsm: 160,
    weave: "Classic 2x1 Pinpoint Oxford Weave",
    construction: "Single-Needle Tailoring with Clean Side Seam Gussets",
    moq: 100,
    leadTime: "7–10 Days",
    features: [
      "Fused non-curl collar points with removable collar stays",
      "Clean single-needle tailoring and reinforced side gussets",
      "Cross-stitched unbreakable resin buttons",
      "Soft brushed interior touch against young skin",
      "Available in both short sleeve and full sleeve with dual-button cuffs",
    ],
    colors: [
      { name: "Pristine Snow White", hex: "#FFFFFF" },
      { name: "Cadet Sky Blue", hex: "#B8D5E8" },
      { name: "Classic French Blue", hex: "#7AA2C8" },
      { name: "Ivory Ecru", hex: "#F7F3E9" },
    ],
    sizes: ["22", "24", "26", "28", "30", "32", "34", "36", "38", "40", "42", "44"],
    image: "/images/shirts.jpg",
    badge: "Daily Assembly Classic",
    description:
      "The quintessential school uniform shirt crafted from tightly combed long-staple cotton blended with tensile polyester. The open pinpoint Oxford weave promotes natural ventilation during humid summer terms while providing full opacity and crisp, sharp structure under ties and blazers.",
    careInstructions: "Machine wash warm 40°C. Easy iron setting or line dry for wrinkle-free finish.",
    embroideryOptions: [
      "Pocket monogram crest embroidery",
      "Left-collar tip emblem embroidery",
      "Woven institutional label inside collar yoke",
    ],
  },
  {
    id: "skirt-knife-pleat",
    slug: "permanent-knife-pleated-gabardine-skirt",
    name: "Permanent Knife-Pleated Gabardine Uniform Skirt",
    division: "institutional",
    category: "skirts",
    categoryLabel: "School Uniforms",
    tagline: "Precision thermal-set pleats guaranteed to never lose sharpness after washing",
    fabric: "65% Heavy Polyester / 35% Rayon Gabardine",
    gsm: 225,
    weave: "Steep Diagonal Gabardine Weave",
    construction: "High-Pressure Steam Baked Thermal Pleats with Growth Waistband",
    moq: 50,
    leadTime: "10–14 Days",
    features: [
      "Steam baked high-pressure permanent knife pleating",
      "Adjustable internal elastic waistband with button stays for growth spurts",
      "Concealed YKK side zipper with safety hook-and-eye closure",
      "Generous 2.5-inch blind hem for height let-down as students grow",
      "Anti-static drape prevents clinging to socks and tights",
    ],
    colors: [
      { name: "Oxford Deep Navy", hex: "#0F1E36" },
      { name: "Charcoal Heather Melange", hex: "#3A3F47" },
      { name: "Bottle Green", hex: "#183226" },
      { name: "Rich Maroon", hex: "#631726" },
    ],
    sizes: ["20", "22", "24", "26", "28", "30", "32", "34", "36", "38", "Custom Lengths"],
    image: "/images/skirts.jpg",
    badge: "Thermal-Set Pleats",
    description:
      "Engineered to endure the rigorous demands of school life, this skirt utilizes thermal-cured permanent pleat technology. Even after repeated machine laundering, the sharp vertical knife pleats remain crisp without laborious hand ironing. The adjustable internal waistband accommodates adolescent growth spurts.",
    careInstructions: "Machine wash 30°C on gentle cycle. Hang damp by the waistband to drip dry. No ironing required on pleats.",
    embroideryOptions: ["Discreet waistband monogram label", "Subtle lower hem crest embroidery"],
  },
  {
    id: "skirt-tartan-pinafore",
    slug: "tartan-box-pleat-academic-pinafore",
    name: "Tartan Box-Pleat Academic Pinafore & Tunic",
    division: "institutional",
    category: "skirts",
    categoryLabel: "School Uniforms",
    tagline: "Traditional Scottish tartan check with deep box pleats and brass accent buttons",
    fabric: "Polyester-Viscose Yarn-Dyed Tartan Twill",
    gsm: 245,
    weave: "Yarn-Dyed 2x2 Twill Check",
    construction: "Structured Front Bib with Reinforced Side In-Seam Pockets",
    moq: 60,
    leadTime: "12–16 Days",
    features: [
      "Custom loom yarn dyeing matched to exact school house color codes",
      "Wide comfortable shoulder straps with side-button bib closure",
      "Twin concealed in-seam pockets for essentials",
      "Colorfast dyes tested to withstand harsh detergents",
    ],
    colors: [
      { name: "Black Watch Tartan (Navy/Green/Black)", hex: "#1B302B" },
      { name: "Royal Stewart Tartan (Red/Navy/Gold)", hex: "#7E1F29" },
      { name: "Grey-Plum Academic Tartan", hex: "#4C3E48" },
    ],
    sizes: ["18", "20", "22", "24", "26", "28", "30", "32", "34", "36"],
    image: "/images/skirts.jpg",
    badge: "Tartan Pinafore",
    description:
      "A timeless academic pinafore woven on precision looms to match an institution's historical house tartans. Features a structured bib front with antique brass button accents, deep box pleats that expand gracefully for sports and playground movement, and side-entry pockets.",
    careInstructions: "Machine wash cold. Turn inside out. Hang dry. Medium press on reverse.",
    embroideryOptions: [
      "Direct chest bib crest embroidery",
      "Custom woven school name side tab",
    ],
  },
  {
    id: "tie-jacquard-crested",
    slug: "custom-jacquard-crested-school-ties",
    name: "Bespoke Woven Jacquard Silk & Micro-Poly Ties",
    division: "institutional",
    category: "accessories",
    categoryLabel: "Silk & Jacquard Ties",
    tagline: "High-density micro-jacquard woven with custom corporate emblems or school house stripes",
    fabric: "100% High-Density Micro-Jacquard / Silk Blend",
    gsm: 180,
    weave: "Precision Computerized Micro-Jacquard",
    construction: "Wool-Blend Floating Interlining for Dimple Recovery",
    moq: 50,
    leadTime: "10–12 Days",
    features: [
      "Computerized loom weaving of intricate crests & logos (up to 8 yarn colors)",
      "Wool-blend interlining for perfect dimple knot recovery",
      "Tipped self-fabric finish on reverse blade with custom branding loop",
      "Bar-tacked stitch reinforcement at both stress joints",
      "Available in Classic 3.25-inch, Slim 2.75-inch, or Junior Clip-On",
    ],
    colors: [
      { name: "Navy & Gold Diagonal Regimental", hex: "#0E1C36" },
      { name: "Maroon & Silver Stripe", hex: "#631726" },
      { name: "Forest Green & Gold Stripe", hex: "#1A382B" },
      { name: "Custom Pantone / Corporate Hues", hex: "#C5A265" },
    ],
    sizes: ["Standard 58-inch Adult", "Junior 48-inch", "Clip-On 14-inch", "Bow-Tie"],
    image: "/images/blazers.jpg",
    badge: "Custom Jacquard",
    description:
      "The definitive hallmark of institutional and executive identity. Our jacquard ties are not printed; every crest, corporate logo, stripe, and motto is woven directly into the fabric using high-density micro-yarns on computerized European looms. Wool-blend inner lining ensures the tie recovers flawlessly after untying day after day.",
    careInstructions: "Spot clean with damp cloth or dry clean. Do not machine wash.",
    embroideryOptions: [
      "Under-knot crest placement",
      "All-over diagonal repeating emblem motif",
      "Woven reverse keeper loop with custom motto",
    ],
  },
];
