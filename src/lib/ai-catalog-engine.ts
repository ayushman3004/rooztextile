import { productsData } from "../data/products";
import { getAIEscalationUrl } from "./whatsapp";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  whatsappUrl?: string;
  suggestedQuestions?: string[];
  matchedProducts?: Array<{
    name: string;
    categoryLabel: string;
    fabric: string;
    gsm: number;
    moq: number;
    image: string;
  }>;
}

export function queryCatalogEngine(userQuery: string): ChatMessage {
  const query = userQuery.toLowerCase().trim();

  // 1. Executive Blazers & Suiting
  if (
    query.includes("executive") ||
    query.includes("merino") ||
    query.includes("super 130") ||
    query.includes("super 120") ||
    query.includes("suit") ||
    query.includes("herringbone") ||
    query.includes("boardroom") ||
    query.includes("gentleman") ||
    query.includes("bespoke")
  ) {
    const execBlazers = productsData.filter((p) => p.division === "executive");
    return {
      role: "assistant",
      content: `At **RoozTextile's Sartorial Atelier**, we weave and tailor executive blazers for corporate leadership, luxury retail labels, and bespoke suiting:

• **Super 130s Australian Merino Worsted Blazer (270 GSM):** Pure high-twist wool with natural crease-recovery, floating half-canvas horsehair interfacing, pick-stitched lapels, and genuine horn buttons. (MOQ: 20 pcs)
• **Heritage Italian Herringbone Blazer (290 GSM):** Fine worsted wool blended with 15% Mulberry silk, featuring soft Neapolitan unconstructed shoulders and Bemberg lining. (MOQ: 25 pcs)

All executive blazers feature custom silk lining options, internal passport pockets, and personalized monogramming.`,
      whatsappUrl: getAIEscalationUrl(
        userQuery,
        "Inquiry regarding Executive Super 130s Merino Suiting and Blazers"
      ),
      matchedProducts: execBlazers.map((b) => ({
        name: b.name,
        categoryLabel: b.categoryLabel,
        fabric: b.fabric,
        gsm: b.gsm,
        moq: b.moq,
        image: b.image,
      })),
      suggestedQuestions: [
        "What is the MOQ for Executive Blazers?",
        "Can we request an Executive Swatch Box?",
        "Do you make bespoke corporate uniforms?",
      ],
    };
  }

  // 2. Luxury Dress Shirts (Egyptian Giza / Royal Oxford)
  if (
    query.includes("giza") ||
    query.includes("egyptian") ||
    query.includes("dress shirt") ||
    query.includes("boardroom shirt") ||
    query.includes("mother of pearl") ||
    query.includes("french cuff")
  ) {
    const execShirts = productsData.filter(
      (p) => p.division === "executive" && p.category === "shirts"
    );
    return {
      role: "assistant",
      content: `Our executive shirting division utilizes the world's most coveted cotton varieties:

• **2-Ply 100s Egyptian Giza Cotton Shirt (145 GSM):** Spun from extra-long staple Giza cotton with double-twist yarns. Tailored with 22 stitches per inch, hand-turned cutaway collars, and genuine Australian Mother-of-Pearl buttons.
• **Royal Oxford Weave Formal Shirt (165 GSM):** Sophisticated 3D honeycomb weave with high breathability, fused non-curl collar, and wrinkle resistance across 14-hour executive days.

Available for executive wardrobes, corporate gifting, and luxury retail private labeling (MOQ: 30 units).`,
      whatsappUrl: getAIEscalationUrl(
        userQuery,
        "Inquiry regarding 2-Ply Egyptian Giza Cotton Executive Shirts"
      ),
      matchedProducts: execShirts.map((s) => ({
        name: s.name,
        categoryLabel: s.categoryLabel,
        fabric: s.fabric,
        gsm: s.gsm,
        moq: s.moq,
        image: s.image,
      })),
      suggestedQuestions: [
        "Can you add custom embroidered monograms?",
        "What collar styles are available?",
        "Request Giza cotton fabric swatches",
      ],
    };
  }

  // 3. School Blazers & Institutional Attire
  if (
    query.includes("school") ||
    query.includes("student") ||
    query.includes("academy") ||
    query.includes("poly-wool") ||
    query.includes("terene") ||
    query.includes("uniform")
  ) {
    const schoolItems = productsData.filter((p) => p.division === "institutional");
    return {
      role: "assistant",
      content: `**RoozTextile** has equipped over 250+ prestigious schools, boarding academies, and convents since 1994:

1. **Classic Poly-Wool School Blazer (280 GSM):** 65/35 Terene-Wool blend built with structured horsehair canvas, double-needle armholes, and anti-pilling finish tested to 30,000 rubs.
2. **Heavyweight Crested Notch Blazer (310 GSM):** Boarding school edition with hand-embroidered bullion wire crests.
3. **Pinpoint Oxford Uniform Shirts (160 GSM):** High opacity, breathable long-staple cotton with non-curl fused collars.
4. **Permanent Knife-Pleat Skirts (225 GSM):** Steam-cured thermal pleats with internal adjustable growth waistbands.`,
      whatsappUrl: getAIEscalationUrl(
        userQuery,
        "Inquiry regarding School Uniform & Blazer Manufacturing"
      ),
      matchedProducts: schoolItems.slice(0, 3).map((b) => ({
        name: b.name,
        categoryLabel: b.categoryLabel,
        fabric: b.fabric,
        gsm: b.gsm,
        moq: b.moq,
        image: b.image,
      })),
      suggestedQuestions: [
        "What is the MOQ for School Blazers?",
        "Can we request a School Sizing Trial Set?",
        "Do you make custom jacquard house ties?",
      ],
    };
  }

  // 4. Minimum Order Quantities (MOQ)
  if (
    query.includes("moq") ||
    query.includes("minimum order") ||
    query.includes("minimum quantity") ||
    query.includes("how many pieces")
  ) {
    return {
      role: "assistant",
      content: `Our minimum order quantities (MOQ) are structured for both corporate and institutional programs:

**Executive Sartorial Division:**
• **Merino Wool & Silk Blazers:** 20 pieces per style/colorway
• **Egyptian Giza Cotton Shirts:** 30 pieces
• **Bespoke Made-to-Measure Programs:** Flexible custom batches

**Institutional Uniform Division:**
• **School Blazers:** 50 pieces per crest/shade
• **Oxford Uniform Shirts:** 100 pieces
• **Pleated Skirts & Pinafores:** 50 pieces
• **Woven Jacquard Ties:** 50 pieces

Volume rebates are available for annual corporate contracts and school-wide replenishment orders (500+ to 5,000+ units).`,
      whatsappUrl: getAIEscalationUrl(
        userQuery,
        "Inquiry regarding wholesale MOQ tiers for executive suiting and uniforms"
      ),
      suggestedQuestions: [
        "What are your volume pricing tiers?",
        "Request an official swatch presentation box",
        "Connect with sales on WhatsApp",
      ],
    };
  }

  // 5. Swatch Boxes & Sample Kits
  if (
    query.includes("sample") ||
    query.includes("swatch") ||
    query.includes("fabric box") ||
    query.includes("feel") ||
    query.includes("touch")
  ) {
    return {
      role: "assistant",
      content: `We courier two types of **Complimentary Luxury Presentation Kits**:

1. **The Executive Suiting Swatch Box:** Features Super 130s Merino worsted wools, Italian silk-wool blends, 100/2 Giza cotton shirting cards, and mother-of-pearl button samples.
2. **The Institutional Uniform & Sizing Kit:** Complete poly-wool color ring (Navy, Maroon, Bottle Green, Slate), Oxford fabric cards, and a loaner rack of trial blazers (Chest 24 to 44) for student fit sessions.

Dispatched via express courier within 48 to 72 hours across India and overseas.`,
      whatsappUrl: getAIEscalationUrl(
        userQuery,
        "Requesting Luxury Swatch Presentation Box / Sample Kit"
      ),
      suggestedQuestions: [
        "Request an Executive Swatch Box",
        "Request a School Uniform Sizing Set",
        "What are your production lead times?",
      ],
    };
  }

  // Default fallback
  return {
    role: "assistant",
    content: `Welcome to **RoozTextile**—distinguished manufacturer of fine worsted suiting, executive attire, and institutional school uniforms since 1994.

Whether you require **Super 130s Merino Wool Blazers** and **2-Ply Egyptian Giza Cotton Shirts** for executive leadership, or Raymond-grade **Poly-Wool Blazers** for your academy, our master weavers are at your service.

How may I assist your wardrobe or institutional procurement today?`,
    whatsappUrl: getAIEscalationUrl(userQuery),
    suggestedQuestions: [
      "Tell me about your Super 130s Merino Blazers",
      "What is the MOQ for executive dress shirts?",
      "Explore School Uniforms & Blazers",
      "Request a luxury fabric swatch box",
    ],
  };
}
