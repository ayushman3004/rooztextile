export interface Product {
  id: string;
  slug: string;
  name: string;
  division: "institutional" | "executive";
  category: "uniform-sets" | "house-polos" | "tracksuits" | "blazers" | "knitwear" | "accessories" | "pe-sets" | "shirts" | "skirts";
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
  { id: "all", label: "All Catalogue Uniforms" },
  { id: "uniform-sets", label: "Assembly Uniform Sets" },
  { id: "house-polos", label: "House & PT Polos" },
  { id: "tracksuits", label: "Tracksuits & Track Pants" },
  { id: "blazers", label: "Formal School Blazers" },
  { id: "knitwear", label: "Sweaters & Cardigans" },
  { id: "accessories", label: "Accessories (Ties, Belts, Socks)" },
  { id: "pe-sets", label: "Junior PE Sets" },
] as const;

export const productsData: Product[] = [
  // -------------------------------------------------------------
  // 1. SCHOOL UNIFORMS: CLASSIC ASSEMBLY SETS (Page 2 & Flyer 1)
  // -------------------------------------------------------------
  {
    id: "boys-assembly-uniform-set",
    slug: "boys-formal-assembly-uniform-set",
    name: "Boys Senior Assembly Uniform Set (Shirt, Tie & Pleated Trousers)",
    division: "institutional",
    category: "uniform-sets",
    categoryLabel: "Assembly Uniform Sets",
    tagline: "The definitive boys school attire: crisp Oxford shirt, woven regimental tie, and tailored pleated trousers",
    fabric: "65% Combed Cotton / 35% High-Tenacity Poly Blend",
    threadCount: "80s Double-Ply Assembly Weave",
    gsm: 195,
    weave: "Reinforced School Twill & Pinpoint Oxford Weave",
    construction: "Double-Stitched Seams with Expandable Waistband & Fused Collar",
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
      { name: "White Shirt & Khaki Beige Trousers", hex: "#C2B280" },
      { name: "White Shirt & Charcoal Grey Trousers", hex: "#3A3F47" },
      { name: "Cadet Blue Shirt & Navy Trousers", hex: "#0E1C36" },
    ],
    sizes: ["Age 6-8", "Age 8-10", "Age 10-12", "Age 12-14", "Age 14-16", "Senior 36-44", "Custom Sizing"],
    image: "/images/catalogue/page-2.png",
    badge: "Catalogue Flagship",
    description:
      "A complete institutional school uniform set tailored for senior schools and boarding academies. Features a pristine pinpoint Oxford shirt with non-curl collar points, a high-density jacquard woven school crest tie, and tailored wrinkle-free trousers engineered to withstand daily school routines.",
    careInstructions: "Machine wash warm 40°C. Easy iron or drip dry. Do not bleach.",
    embroideryOptions: [
      "Left chest pocket school crest embroidery (up to 12 colors)",
      "Woven school house name tag inside collar",
      "Embroidered monogram initials on cuffs",
    ],
  },
  {
    id: "girls-assembly-uniform-set",
    slug: "girls-formal-assembly-uniform-set",
    name: "Girls Academic Blouse & Permanent Knife-Pleated Skirt Set",
    division: "institutional",
    category: "uniform-sets",
    categoryLabel: "Assembly Uniform Sets",
    tagline: "Crisp Oxford uniform blouse, regimental crest tie, and permanent steam-baked knife-pleated skirt",
    fabric: "65% Combed Cotton / 35% Rayon-Poly Gabardine Blend",
    threadCount: "80s Double-Ply Blouse & Heavy Gabardine Twill",
    gsm: 215,
    weave: "Pinpoint Oxford & Steep Diagonal Gabardine",
    construction: "Steam Baked Thermal Permanent Pleats with Internal Growth Waistband",
    moq: 30,
    leadTime: "7–10 Days",
    features: [
      "Steam-baked permanent knife pleats guaranteed to never lose sharpness after washing",
      "Breathable combed cotton blouse with soft touch against sensitive skin",
      "Adjustable internal button-hole elastic waistband for seamless growth adjustment",
      "Deep concealed side-seam pocket integrated into pleats",
      "High-luster colorfast dyes matching school Pantone specifications",
    ],
    colors: [
      { name: "White Blouse & Khaki Beige Skirt", hex: "#C2B280" },
      { name: "White Blouse & Navy Blue Skirt", hex: "#0E1C36" },
      { name: "White Blouse & Charcoal Grey Skirt", hex: "#3A3F47" },
    ],
    sizes: ["Age 6-8", "Age 8-10", "Age 10-12", "Age 12-14", "Age 14-16", "Senior 24-36 Waist"],
    image: "/images/catalogue/flyer-shirt.png",
    badge: "Official Archive",
    description:
      "Engineered specifically for convent schools and premier academies. Combines an easy-care breathable Oxford blouse with an indestructible permanent knife-pleated gabardine skirt that stays immaculate through hundreds of school hours without manual ironing.",
    careInstructions: "Machine wash gentle cycle 30°C. Hang damp to drip dry. No pleat ironing required.",
    embroideryOptions: [
      "Direct chest pocket crest embroidery",
      "Woven institutional label inside neckband",
      "Subtle skirt waistband monogramming",
    ],
  },

  // -------------------------------------------------------------
  // 2. SCHOOL / PT UNIFORMS (Page 3)
  // -------------------------------------------------------------
  {
    id: "school-pt-polo-uniform",
    slug: "school-pt-sports-polo-uniform",
    name: "School & PT Performance Sports Polo T-Shirt",
    division: "institutional",
    category: "house-polos",
    categoryLabel: "House & PT Polos",
    tagline: "Breathable moisture-wicking pique polo with contrast shoulder piping and tipped knit collar",
    fabric: "60% Combed Cotton / 40% High-Wick Poly Pique Mesh",
    gsm: 210,
    weave: "Aerated Double Pique Honeycomb Weave",
    construction: "Reinforced 3-Button Placket with Split Hem & Contrast Sleeve Rib",
    moq: 40,
    leadTime: "7–10 Days",
    features: [
      "Micro-honeycomb knit channels airflow and wicks sweat rapidly during physical education",
      "Contrast shoulder and side piping adds distinct school athletic styling",
      "Anti-curl rib collar and sleeve bands maintain sharp structure after repeated laundering",
      "Shatter-proof cross-stitched resin buttons built for playground endurance",
      "Tested for AATCC Grade 4.5+ sun fastness and color retention",
    ],
    colors: [
      { name: "Royal Blue & Yellow Piping", hex: "#1A56C4" },
      { name: "Scarlet Red & White Piping", hex: "#C41E3A" },
      { name: "Bottle Green & White Piping", hex: "#183226" },
      { name: "Canary Gold & Navy Piping", hex: "#E8B228" },
    ],
    sizes: ["22", "24", "26", "28", "30", "32", "34", "36", "38", "40", "42"],
    image: "/images/catalogue/page-3.png",
    badge: "PT Essential",
    description:
      "The premier Physical Training & Sports Day uniform t-shirt. Crafted from double-pique honeycomb knit that delivers superior breathability under hot sun while maintaining a dignified, polished school aesthetic.",
    careInstructions: "Machine wash warm 40°C. Tumble dry low or line dry. Do not iron directly on crest.",
    embroideryOptions: [
      "Computerized high-density school crest embroidery on chest",
      "Screen-printed school name on reverse back yoke",
      "Custom color rib collar tipping",
    ],
  },

  // -------------------------------------------------------------
  // 3. HOUSE COLOUR UNIFORMS (Page 4 & Flyer 2)
  // -------------------------------------------------------------
  {
    id: "house-colour-sports-polo",
    slug: "house-colour-sports-day-polo-tshirt",
    name: "Official 4-House Colour Sports Day Polo T-Shirt (Red, Blue, Green, Yellow)",
    division: "institutional",
    category: "house-polos",
    categoryLabel: "House & PT Polos",
    tagline: "Vibrant colorfast House jerseys with twin white chest racing stripes for sports day & inter-house athletics",
    fabric: "100% Combed Compact Cotton Pique / Breathable Poly-Rich Blend",
    gsm: 220,
    weave: "Sport Pique Mesh with Engineered Chest Bands",
    construction: "Double-Stitched Reinforced Shoulders with Side Vent Gussets",
    moq: 50,
    leadTime: "7–10 Days",
    features: [
      "Available across all 4 official school houses: Red House, Blue House, Green House, Yellow House",
      "Signature twin white engineered chest stripes for instantaneous athletic recognition",
      "Reactive dye technology prevents cross-staining and fading through entire sports calendar",
      "Ultra-soft interior finish prevents chafing during track and field events",
      "Available in full size grading from Kindergarten (Size 22) through Senior (Size 40)",
    ],
    colors: [
      { name: "Red House (Crimson Scarlet)", hex: "#D62828" },
      { name: "Blue House (Royal Azure)", hex: "#003049" },
      { name: "Green House (Emerald Forest)", hex: "#2A9D8F" },
      { name: "Yellow House (Sunburst Gold)", hex: "#E9C46A" },
    ],
    sizes: ["22", "24", "26", "28", "30", "32", "34", "36", "38", "40"],
    image: "/images/catalogue/page-4.png",
    badge: "4 House Colors",
    description:
      "Specifically engineered for annual athletic meets and inter-house competitions. Features bright, fade-resistant house shades adorned with athletic twin white horizontal chest stripes and customized school house insignia embroidery.",
    careInstructions: "Machine wash cold. Turn inside out. Warm iron on reverse.",
    embroideryOptions: [
      "Direct left chest house emblem and motto embroidery",
      "School house name printed on back",
      "Custom sleeve badge patch",
    ],
  },

  // -------------------------------------------------------------
  // 4. SCHOOL TRACKSUITS & JACKETS (Page 5)
  // -------------------------------------------------------------
  {
    id: "school-tracksuit-jacket-set",
    slug: "school-sports-tracksuit-and-jacket-set",
    name: "Academy Full-Zip Athletic Tracksuit & Jacket Set",
    division: "institutional",
    category: "tracksuits",
    categoryLabel: "Tracksuits & Track Pants",
    tagline: "Heavy-duty windproof zip tracksuit jacket with contrast chest panel and matching jogger track pants",
    fabric: "100% Premium Poly Interlock with Brushed Fleece Backing",
    gsm: 280,
    weave: "High-Tenacity Double Knit Interlock",
    construction: "Full-Front YKK Zipper with Stand-Up Mandarin Collar & Elasticated Cuffs",
    moq: 35,
    leadTime: "10–14 Days",
    features: [
      "Brushed fleece interior provides warmth during chilly winter assemblies and early morning training",
      "Engineered contrast horizontal chest panel in school house color combinations",
      "Heavy-duty YKK zipper with soft chin-guard prevents neck irritation",
      "Deep zipped handwarmer pockets on jacket and track pants",
      "Reinforced elasticated cuffs and hem maintain snug fit and seal out wind",
    ],
    colors: [
      { name: "Navy Blue & White Chest Panel", hex: "#0E1C36" },
      { name: "Navy Blue & Crimson Red Panel", hex: "#6B1D2F" },
      { name: "Royal Blue & White Panel", hex: "#1A56C4" },
      { name: "Gold Yellow & Navy Panel", hex: "#E8B228" },
    ],
    sizes: ["Age 6-8", "Age 8-10", "Age 10-12", "Age 12-14", "Age 14-16", "Senior 36-44"],
    image: "/images/catalogue/page-5.png",
    badge: "Winter Tracksuit",
    description:
      "A complete athletic tracksuit suite designed for winter sports and daily physical education. Includes a stand-collar zip-up jacket with contrast chest blocking and matching tapered track pants with ankle zippers.",
    careInstructions: "Machine wash warm 40°C. Do not bleach. Hang dry.",
    embroideryOptions: [
      "Chest school crest embroidery in up to 8 thread colors",
      "Institution name arch embroidery on reverse back panel",
      "Custom color contrast piping along zip and sleeves",
    ],
  },

  // -------------------------------------------------------------
  // 5. SCHOOL TRACK PANTS (Flyer 4)
  // -------------------------------------------------------------
  {
    id: "school-athletic-track-pant",
    slug: "school-athletic-contrast-stripe-track-pant",
    name: "Performance School Track Pant with Contrast Side Stripe",
    division: "institutional",
    category: "tracksuits",
    categoryLabel: "Tracksuits & Track Pants",
    tagline: "Comfort that moves with you: breathable interlock fabric, contrast side panel, and elastic drawstring waist",
    fabric: "65% High-Grade Poly / 35% Cotton Stretch Interlock",
    gsm: 250,
    weave: "Flexible Performance Interlock",
    construction: "Bar-Tacked Pocket Corners with Flatlock Anti-Chafe Seams",
    moq: 40,
    leadTime: "7–10 Days",
    features: [
      "Sweat-absorbent interior knit keeps students fresh and dry during rigorous sporting activities",
      "Broad contrast vertical side stripe matching official school house uniform guidelines",
      "Comfortable wide elastic waistband with adjustable reinforced braided drawstring",
      "Deep dual side pockets for athletic accessories and school stationery",
      "Tapered athletic ankle cuffs prevent dragging on wet grounds",
    ],
    colors: [
      { name: "Navy Blue with White Side Stripe", hex: "#0E1C36" },
      { name: "Jet Black with Gold Side Stripe", hex: "#111111" },
      { name: "Charcoal Grey with Red Side Stripe", hex: "#3A3F47" },
    ],
    sizes: ["22", "24", "26", "28", "30", "32", "34", "36", "38", "40", "42"],
    image: "/images/catalogue/flyer-trackpant.png",
    badge: "Active Wear",
    description:
      "Built for everyday sports performance and physical education sessions. Offers total freedom of movement with soft-touch breathable interlock yarn, heavy bar-tacked stress joints, and an adjustable drawstring waistband.",
    careInstructions: "Machine wash cold. Drip dry or tumble dry low. No iron required.",
    embroideryOptions: [
      "Thigh school monogram crest embroidery",
      "School name lettering down side stripe",
    ],
  },

  // -------------------------------------------------------------
  // 6. FORMAL BLAZER UNIFORMS (Page 6)
  // -------------------------------------------------------------
  {
    id: "school-formal-blazer-uniform",
    slug: "formal-institutional-single-breasted-school-blazer",
    name: "Classic Single-Breasted Formal School Blazer & Vest",
    division: "institutional",
    category: "blazers",
    categoryLabel: "Formal School Blazers",
    tagline: "Raymond-grade tailored poly-wool blazer with crested brass buttons, structured lapels, and bullion crest",
    fabric: "65% Premium Terene / 35% Australian Merino Wool Blend",
    gsm: 285,
    weave: "Precision 2x2 Worsted Suiting Twill",
    construction: "Reinforced Floating Chest Canvas with Padded Shoulder Architecture",
    moq: 30,
    leadTime: "12–16 Days",
    features: [
      "Wrinkle-recovery shape memory across multi-year student wear and morning assemblies",
      "Reinforced double-stitched armholes and bar-tacked flap pocket corners",
      "Breathable high-density viscose twill lining with interior stationery pocket",
      "Anti-pilling treatment tested up to 30,000 friction cycles",
      "Polished engraved brass or crest-embossed institutional buttons",
    ],
    colors: [
      { name: "Royal British Navy", hex: "#0E1C36" },
      { name: "Deep Maroon / Crimson", hex: "#6B1D2F" },
      { name: "Forest Academy Green", hex: "#1A382B" },
      { name: "Midnight Charcoal", hex: "#2C3539" },
    ],
    sizes: ["24", "26", "28", "30", "32", "34", "36", "38", "40", "42", "Custom Bespoke"],
    image: "/images/catalogue/page-6.png",
    badge: "Sartorial Blazer",
    description:
      "The pinnacle of institutional authority and elegance. Meticulously tailored using worsted poly-wool suiting with structured chest interfacing, hand-rolled lapels, and custom bullion gold/silver zari crest embroidery.",
    careInstructions: "Professional dry clean recommended. Mild steam press at wool setting.",
    embroideryOptions: [
      "High-density computerized chest pocket crest (up to 12 colors)",
      "Gold / Silver metallic zari bullion wire crest patches",
      "Woven piping trims along lapels and pocket flaps",
    ],
  },

  // -------------------------------------------------------------
  // 7. SWEATER UNIFORMS (Page 7)
  // -------------------------------------------------------------
  {
    id: "school-v-neck-sweater-uniform",
    slug: "academy-v-neck-knit-sweater-and-pullover",
    name: "Heritage Academy V-Neck School Sweater & Cardigan",
    division: "institutional",
    category: "knitwear",
    categoryLabel: "Sweaters & Cardigans",
    tagline: "Anti-pilling 12GG fine-gauge knitwear with contrast tricolor stripe tipping along V-neck, cuffs & hem",
    fabric: "50% Fine Merino Wool / 50% Anti-Pilling Low-Shrink Acrylic",
    gsm: 260,
    weave: "12-Gauge Fully Fashioned Interlock Knit",
    construction: "Spandex-Reinforced Ribbed V-Neck with Double-Layer Cuffs",
    moq: 40,
    leadTime: "10–14 Days",
    features: [
      "Low-shrinkage treated yarn resists washer felting, stretching, and pilling",
      "Spandex-reinforced cuffs and hem maintain snug fit over multiple school terms",
      "Engineered V-neck depth frames school ties and shirt collars with precision",
      "Signature contrast tricolor stripe tipping along neckband, cuffs, and bottom hem",
      "Available in both V-neck pullover and button-down cardigan silhouettes",
    ],
    colors: [
      { name: "Heritage Navy with Red/White Tipping", hex: "#0E1C36" },
      { name: "Oxblood Crimson with White/Navy Tipping", hex: "#5C1523" },
      { name: "Bottle Green with Gold/White Tipping", hex: "#183226" },
      { name: "Steel Heather Grey with Navy Tipping", hex: "#4A5260" },
    ],
    sizes: ["24", "26", "28", "30", "32", "34", "36", "38", "40", "42"],
    image: "/images/catalogue/page-7.png",
    badge: "12-Gauge Knit",
    description:
      "A winter staple for premier boarding schools and day academies. Spun from a resilient blend of fine Merino wool and anti-pilling acrylic yarns to deliver cozy warmth during frosty assemblies without overheating in classrooms.",
    careInstructions: "Machine wash cold on gentle wool cycle. Dry flat. Do not wring or tumble dry.",
    embroideryOptions: [
      "Direct-to-knit computerized chest crest embroidery",
      "Contrast collar tipping in 1, 2, or 3 school house colors",
    ],
  },

  // -------------------------------------------------------------
  // 8. SCHOOL UNIFORM ACCESSORIES (Page 8 & Flyer 3)
  // -------------------------------------------------------------
  {
    id: "school-accessories-suite",
    slug: "institutional-school-uniform-accessories-suite",
    name: "Complete Institutional School Uniform Accessories Suite",
    division: "institutional",
    category: "accessories",
    categoryLabel: "Accessories (Ties, Belts, Socks)",
    tagline: "Micro-jacquard crested ties, custom logo engraved metal buckle belts, ribbed socks, embroidered badges & lanyards",
    fabric: "Jacquard Micro-Poly / Genuine Leather & Nylon / Combed Cotton",
    gsm: 180,
    weave: "Computerized Jacquard & Ribbed Knit",
    construction: "Wool-Blend Floating Interlining & Heavy-Duty Solid Brass Hardware",
    moq: 50,
    leadTime: "7–10 Days",
    features: [
      "Bespoke woven jacquard school ties with micro-woven crests and regimental house stripes",
      "Custom metal buckle belts featuring laser-engraved or stamped school coat of arms",
      "Cushioned breathable cotton school socks with twin house-colored striped cuffs",
      "High-definition embroidered and gold bullion iron-on / sew-on school crest badges",
      "Waterproof customized school ID card holders with silk-screened branded neck lanyards",
    ],
    colors: [
      { name: "Navy & Gold Academy Regalia", hex: "#0E1C36" },
      { name: "Maroon & Silver Stripe Regalia", hex: "#631726" },
      { name: "Forest Green & Gold Regalia", hex: "#1A382B" },
      { name: "Bespoke Institutional Colors", hex: "#C5A265" },
    ],
    sizes: ["Universal Student Sizes", "Adjustable Belt Lengths (20-40 inch)", "Junior & Senior Ties"],
    image: "/images/catalogue/page-8.png",
    badge: "5-in-1 Accessories",
    description:
      "A complete accessories suite ensuring every student presents an immaculate, uniform identity. Includes jacquard woven ties, engraved buckle belts, house-stripe ribbed cotton socks, computerized blazer badges, and student lanyards.",
    careInstructions: "Ties: Dry clean or spot clean. Socks: Machine wash warm. Belts: Wipe clean.",
    embroideryOptions: [
      "Computerized crest weaving directly into tie jacquard blades",
      "Custom buckle laser engraving with school motto",
      "Knitted school initial monogram on sock ankles",
    ],
  },
  {
    id: "bespoke-jacquard-school-tie",
    slug: "bespoke-micro-jacquard-crested-school-tie",
    name: "Bespoke Woven Jacquard Crested School Tie",
    division: "institutional",
    category: "accessories",
    categoryLabel: "Accessories (Ties, Belts, Socks)",
    tagline: "High-density micro-jacquard tie with woven school emblem, house stripes, and wrinkle-recovery wool interlining",
    fabric: "100% High-Density Micro-Jacquard Polyester / Silk Blend",
    gsm: 175,
    weave: "Precision Computerized Micro-Jacquard Weave",
    construction: "Wool-Blend Floating Interlining with Bar-Tacked Stress Points & Quick-Adjust Strap Option",
    moq: 50,
    leadTime: "7–10 Days",
    features: [
      "Intricate computerized loom weaving of school motto and crest in up to 8 yarn colors",
      "Wool-blend inner canvas lining provides immediate knot dimple recovery",
      "Available in Classic Blade (3.25 in), Slim Blade (2.75 in), and Junior Quick-Release Elastic Strap",
      "Stain-resistant fluorocarbon coating repels liquid spills and daily cafeteria stains",
      "Tipped self-fabric finish on reverse blade with custom woven keeper loop",
    ],
    colors: [
      { name: "Navy with Diagonal Crimson & Gold Stripes", hex: "#0E1C36" },
      { name: "Maroon with Gold Crest & Silver Stripes", hex: "#631726" },
      { name: "Bottle Green with Navy & Gold Stripes", hex: "#183226" },
    ],
    sizes: ["Junior 14-inch Elastic", "Standard 48-inch Student", "Senior 58-inch Adult"],
    image: "/images/catalogue/flyer-tie.png",
    badge: "Micro-Jacquard",
    description:
      "Woven directly on computerized precision looms, each tie carries the institution's heraldic crest with pristine clarity. The resilient floating wool-blend lining guarantees the tie recovers its perfect drape morning after morning.",
    careInstructions: "Spot clean with damp cloth or dry clean. Do not machine wash.",
    embroideryOptions: [
      "Under-knot crest motif placement",
      "All-over repeating diagonal coat of arms",
      "Custom woven school motto on reverse keeper loop",
    ],
  },

  // -------------------------------------------------------------
  // 9. JUNIOR / PRE-PRIMARY PE T-SHIRT & SHORTS (Flyer 5)
  // -------------------------------------------------------------
  {
    id: "junior-pe-tshirt-shorts-set",
    slug: "junior-pre-primary-pe-tshirt-and-shorts-set",
    name: "Pre-Primary & Junior PE T-Shirt & Athletic Shorts Set",
    division: "institutional",
    category: "pe-sets",
    categoryLabel: "Junior PE Sets",
    tagline: "Soft ring-spun cotton jersey T-shirt with contrast crew neck piping and matching elastic play shorts",
    fabric: "100% Combed Compact Ring-Spun Cotton Jersey",
    gsm: 190,
    weave: "Single Jersey Knit with Spandex Rib Neck",
    construction: "Coverstitched Hems with Reinforced Double-Needle Inseams",
    moq: 50,
    leadTime: "7–10 Days",
    features: [
      "100% hypoallergenic natural cotton gentle on sensitive toddler and kindergarten skin",
      "Contrast piping along neckline and shoulders creates a lively, sporty appearance",
      "Encased elastic waistband on shorts allows rapid self-dressing for younger students",
      "Twin side seam ventilation panels keep active children cool and comfortable",
      "Preshrunk fabric retains shape, collar elasticity, and color across frequent washes",
    ],
    colors: [
      { name: "Vibrant Green & Sky Blue Piping", hex: "#2A9D8F" },
      { name: "Bright Yellow & Royal Blue Piping", hex: "#E9C46A" },
      { name: "Crimson Red & White Piping", hex: "#D62828" },
      { name: "Sky Blue & Navy Piping", hex: "#457B9D" },
    ],
    sizes: ["Age 3-4 (Size 18)", "Age 4-5 (Size 20)", "Age 5-6 (Size 22)", "Age 6-7 (Size 24)", "Age 7-8 (Size 26)"],
    image: "/images/catalogue/flyer-junior-pe.png",
    badge: "Pre-Primary PE",
    description:
      "Designed specifically for kindergarten, Montessori, and junior school physical education. Made from ultra-soft ring-spun cotton that breathes effortlessly, with an elasticated waistband and durable flatlock stitching.",
    careInstructions: "Machine wash warm 40°C. Tumble dry low. Warm iron on reverse.",
    embroideryOptions: [
      "Direct chest screen-print or soft embroidery badge",
      "Student name patch option on shorts waistband",
    ],
  },

  // -------------------------------------------------------------
  // 10. CUSTOM FABRIC & DESIGN PROGRAM (Page 9)
  // -------------------------------------------------------------
  {
    id: "custom-school-fabric-program",
    slug: "custom-school-uniform-fabrics-and-design-program",
    name: "Custom School Uniform Fabric & Design Swatch Program",
    division: "institutional",
    category: "uniform-sets",
    categoryLabel: "Assembly Uniform Sets",
    tagline: "Custom Pantone shade matching, 160+ weave varieties, computerized embroidery & nationwide bulk supply",
    fabric: "Worsted Suiting / Combed Cotton / Interlock / Gabardine",
    gsm: 240,
    weave: "Bespoke Mill Weaves & Custom Yarn Dyes",
    construction: "Full Custom Specification & Size Grading",
    moq: 100,
    leadTime: "12–18 Days",
    features: [
      "Exact Pantone color matching across 12 standard shades and bespoke school hues",
      "Direct mill partnerships with Raymond, Arvind, and RoozTextile proprietary looms",
      "Free physical swatch kit and pre-production prototype sample delivery",
      "ISO 9001:2015 & OEKO-TEX certified non-toxic, skin-friendly dyes",
      "Dedicated institutional concierge managing end-to-end sizing and logistics",
    ],
    colors: [
      { name: "Milky White", hex: "#FFFFFF" },
      { name: "Rich Red", hex: "#B22222" },
      { name: "New Navy", hex: "#0E1C36" },
      { name: "Bright Lemon", hex: "#FFF44F" },
      { name: "Fresh Royal", hex: "#4169E1" },
      { name: "Kiwi Mint", hex: "#8EE53F" },
      { name: "Pitch Black", hex: "#111111" },
      { name: "Regular Gold", hex: "#DAA520" },
      { name: "Mid Grey", hex: "#708090" },
      { name: "Powder Blue", hex: "#B0E0E6" },
    ],
    sizes: ["All Custom Academic Grades & Specifications"],
    image: "/images/catalogue/page-9.png",
    badge: "Custom Swatches",
    description:
      "RoozTextile's institutional design atelier works directly with school trusts, principals, and administrative boards to formulate bespoke uniform identities. We provide Pantone-accurate yarn dyeing, specialized anti-wrinkle finishing, and computerized embroidery.",
    careInstructions: "Refer to specific fabric swatch technical specification sheet.",
    embroideryOptions: [
      "Custom crest digitizing and multi-color embroidery strike-off",
      "Woven institutional neck tapes and side labels",
    ],
  },
];
