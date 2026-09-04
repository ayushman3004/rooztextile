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
  { id: "all", label: "All School Uniforms" },
  { id: "school-blazers", label: "School Blazers & Coats" },
  { id: "school-shirts", label: "Uniform Shirts & Blouses" },
  { id: "school-skirts", label: "Pleated Skirts & Pinafores" },
  { id: "school-knitwear", label: "Cardigans & Sweaters" },
  { id: "accessories", label: "Crested Ties & Regalia" },
] as const;

export const productsData: Product[] = [
  // -------------------------------------------------------------
  // 1. INSTITUTIONAL SCHOOL UNIFORM CATALOG
  // -------------------------------------------------------------
  {
    id: "boys-uniform-full-set",
    slug: "boys-formal-assembly-uniform-set",
    name: "Boys Senior Assembly Uniform Set (Shirt, Regimental Tie & Trousers)",
    division: "institutional",
    category: "shirts",
    categoryLabel: "Complete School Sets",
    tagline: "The definitive boys school attire: crisp Oxford shirt, woven regimental tie, and tailored pleated trousers",
    fabric: "65% Combed Cotton / 35% High-Tenacity Poly Blend",
    threadCount: "80s Double-Ply Assembly Weave",
    gsm: 195,
    weave: "Reinforced School Twill & Oxford Weave",
    construction: "Double-Stitched Seams with Expandable Waistband",
    moq: 30,
    leadTime: "7–10 Days",
    features: [
      "Wrinkle-resistant pinpoint Oxford fabric that stays crisp throughout the school day",
      "Stain-repellent Teflon finish on trousers for effortless daily maintenance",
      "High-density computerized school house regimental stripe tie with dimple recovery",
      "Adjustable interior waistband buttons accommodating adolescent growth",
      "Reinforced knee panels and pocket bar-tacking for athletic playground endurance",
    ],
    colors: [
      { name: "White Shirt & Charcoal Grey Trousers", hex: "#3A3F47" },
      { name: "Cadet Blue Shirt & Navy Trousers", hex: "#0E1C36" },
      { name: "Ecru Ivory & Dark Olive Trousers", hex: "#2A3628" },
    ],
    sizes: ["Age 6-8", "Age 8-10", "Age 10-12", "Age 12-14", "Age 14-16", "Senior 36-44", "Custom Sizing"],
    image: "/images/boys-uniform.jpg",
    badge: "Most Popular Set",
    description:
      "A complete institutional uniform set designed for senior schools and boarding academies. Includes a crisp white pinpoint Oxford shirt with fused non-curl collar points, a high-density jacquard woven school crest tie, and durable wrinkle-free trousers engineered to withstand daily school routines.",
    careInstructions: "Machine wash warm 40°C. Easy iron or drip dry. Do not bleach.",
    embroideryOptions: [
      "Left chest pocket school crest embroidery (up to 12 colors)",
      "Woven school house name tag inside collar",
      "Embroidered monogram initials on cuffs",
    ],
  },
  {
    id: "girls-uniform-cardigan-set",
    slug: "girls-academic-knit-cardigan-and-pleated-skirt-set",
    name: "Girls Academic Knit Cardigan & Pleated Uniform Set",
    division: "institutional",
    category: "skirts",
    categoryLabel: "Complete School Sets",
    tagline: "Year-round academic elegance: fine-gauge knit cardigan, Peter Pan collar blouse, and permanent knife-pleated skirt",
    fabric: "High-Twist Wool-Touch Acrylic / Cotton Poplin / Rayon Gabardine",
    gsm: 240,
    weave: "Fine-Gauge 12GG Interlock Knit & Steep Diagonal Gabardine",
    construction: "Seamless Linked Sleeves with Baked Thermal Permanent Pleats",
    moq: 30,
    leadTime: "10–12 Days",
    features: [
      "Ultra-soft anti-pilling cardigan yarn retains vibrant color after 50+ washes",
      "Peter Pan rounded collar blouse with soft-touch cotton for sensitive skin",
      "Knife pleats baked under high steam pressure to remain sharp without ironing",
      "Internal button-hole elastic waistband for seamless growth adjustment",
      "Deep side-seam pockets concealed within pleats for stationery and essentials",
    ],
    colors: [
      { name: "Academic Navy Cardigan & Oxford Navy Skirt", hex: "#0E1C36" },
      { name: "Deep Maroon Cardigan & Grey Melange Skirt", hex: "#631726" },
      { name: "Bottle Green Cardigan & Tartan Check Skirt", hex: "#1A382B" },
    ],
    sizes: ["Age 5-7", "Age 7-9", "Age 9-11", "Age 11-13", "Age 13-15", "Senior 24-34 Waist"],
    image: "/images/girls-uniform.jpg",
    badge: "Flagship Girls Set",
    description:
      "Engineered specifically for convent schools and international day-boarding academies. Combines a cozy 12-gauge knit cardigan with button closure, a breathable easy-care Peter Pan blouse, and an indestructible permanent knife-pleated skirt that stays immaculate through hundreds of school hours.",
    careInstructions: "Machine wash gentle cycle 30°C. Hang damp to drip dry. No pleat ironing required.",
    embroideryOptions: [
      "Direct chest pocket or cardigan crest embroidery",
      "Woven institutional label inside neckband",
      "Subtle skirt hem monogramming",
    ],
  },
  {
    id: "knit-cardigan-academy",
    slug: "academy-v-neck-fine-gauge-pullover-cardigan",
    name: "Academy V-Neck Fine-Gauge School Pullover & Cardigan",
    division: "institutional",
    category: "skirts",
    categoryLabel: "School Knitwear",
    tagline: "Anti-pilling 12GG knitwear tailored to layer perfectly over school collared shirts and ties",
    fabric: "50% Merino Wool / 50% Anti-Pilling Low-Shrink Acrylic",
    gsm: 260,
    weave: "12-Gauge Fully Fashioned Interlock",
    construction: "Reinforced Ribbed V-Neck with Double-Layer Cuffs & Hem",
    moq: 40,
    leadTime: "10–14 Days",
    features: [
      "Low-shrinkage treated wool blend resists washer felting and stretching",
      "Spandex-reinforced cuffs and hem maintain snug fit over multiple school terms",
      "Engineered V-neck depth frames school ties and shirt collars perfectly",
      "Colorfast reactive dyes match official institutional school Pantone standards",
      "Available in both button-down cardigan and pullover sweater silhouettes",
    ],
    colors: [
      { name: "Heritage Academy Navy", hex: "#0E1C36" },
      { name: "Oxblood Crimson", hex: "#5C1523" },
      { name: "Bottle Green", hex: "#183226" },
      { name: "Steel Heather Grey", hex: "#4A5260" },
    ],
    sizes: ["24", "26", "28", "30", "32", "34", "36", "38", "40", "42"],
    image: "/images/girls-uniform.jpg",
    badge: "12-Gauge Knitwear",
    description:
      "A winter essential for premier academies. Spun from a resilient blend of fine Merino wool and anti-pilling acrylic yarns. Provides warmth during frosty morning assemblies while remaining lightweight and breathable inside heated classrooms.",
    careInstructions: "Machine wash cold on wool cycle. Dry flat. Do not wring or tumble dry.",
    embroideryOptions: [
      "Direct-to-knit computerized chest crest embroidery",
      "Contrast neckband stripe tipping (1 or 2 house colors)",
    ],
  },
  {
    id: "shirt-cadet-blue",
    slug: "cadet-sky-blue-assembly-school-shirt",
    name: "Cadet Sky Blue Daily Assembly School Shirt",
    division: "institutional",
    category: "shirts",
    categoryLabel: "School Shirts",
    tagline: "Breathable pinpoint weave in signature school sky blue with reinforced seams",
    fabric: "65% Combed Cotton / 35% High-Grade Poly Oxford",
    gsm: 155,
    weave: "Pinpoint Oxford Weave",
    construction: "Fused Collar & Cuffs with Cross-Stitched Resin Buttons",
    moq: 60,
    leadTime: "7–10 Days",
    features: [
      "High opacity fabric prevents show-through under harsh sunlight",
      "Antimicrobial odor-resistant treatment keeps students fresh all day",
      "Shatter-proof cross-stitched buttons tested to 90N pull strength",
      "Reinforced chest pocket sized specifically for school student ID cards",
      "Full sleeve and half sleeve options available",
    ],
    colors: [
      { name: "Cadet Sky Blue", hex: "#9EC2E0" },
      { name: "Pristine White", hex: "#FFFFFF" },
      { name: "Pastel Ecru", hex: "#F3EBDD" },
    ],
    sizes: ["22", "24", "26", "28", "30", "32", "34", "36", "38", "40", "42"],
    image: "/images/shirts.jpg",
    badge: "Assembly Standard",
    description:
      "Engineered specifically for daily assembly wear, this cadet sky blue shirt utilizes combed cotton fibers that breathe effortlessly during hot summer terms. The fused collar band ensures ties sit straight without collar curl.",
    careInstructions: "Machine wash warm 40°C. Easy iron or tumble dry low.",
    embroideryOptions: [
      "Direct left pocket institutional monogram",
      "Collar tip embroidered insignia",
    ],
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
    image: "/images/boys-uniform.jpg",
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
