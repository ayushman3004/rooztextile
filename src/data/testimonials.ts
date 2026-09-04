export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  institution: string;
  city: string;
  uniformTypes: string;
  studentCount: string;
  rating: number;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    quote:
      "RoozTextile has supplied our entire secondary school body with winter poly-wool blazers and summer Oxford shirts for over 8 consecutive academic sessions. The dye consistency across multiple reorders is extraordinary—a freshman blazer looks identical in color tone to a senior's. Their attention to reinforced stitching saves our parents considerable money.",
    author: "Dr. Alistair Henderson",
    role: "Head of Administration & Procurement",
    institution: "St. Xavier's Heritage Academy",
    city: "Dehradun, UK",
    uniformTypes: "Blazers, Shirts & Jacquard Ties",
    studentCount: "2,400+ Students",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "Managing uniforms for 1,800 girls across 4 house factions was a logistics nightmare until we partnered with RoozTextile. Their permanent knife-pleated skirts genuinely hold up to industrial machine washes without losing their pleats. Their sample approval turnaround via WhatsApp was under 72 hours.",
    author: "Sister Mary Margaret",
    role: "Principal & Trustee",
    institution: "Convent of Jesus & Mary High School",
    city: "Pune, MH",
    uniformTypes: "Knife-Pleat Skirts & Poplin Blouses",
    studentCount: "1,800+ Students",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "What sets Rooz apart from standard garment vendors is their Raymond-level textile pedigree. They understand yarn count, GSM, and tensile strength. When we needed bespoke tartan pinafores woven to exact PMS shade specifications, they delivered sample strike-offs within days and executed our 3,500-piece order on time.",
    author: "Col. Rajeshwardeep Singh (Retd.)",
    role: "Bursar & Director of Facilities",
    institution: "The Lawrence Valley Boarding School",
    city: "Himachal Pradesh",
    uniformTypes: "Tartan Pinafores & Heavy Crested Blazers",
    studentCount: "3,200+ Students",
    rating: 5,
  },
];
