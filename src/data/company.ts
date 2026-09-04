export interface CompanyInfo {
  name: string;
  tagline: string;
  established: number;
  yearsOfHeritage: number;
  phone: string;
  displayPhone: string;
  whatsappNumber: string;
  email: string;
  salesEmail: string;
  corporateEmail: string;
  gstNumber: string;
  address: {
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  stats: {
    clientsEquipped: string;
    monthlyProduction: string;
    fabricVarieties: string;
    reorderRate: string;
  };
  divisions: string[];
  certifications: string[];
}

export const companyData: CompanyInfo = {
  name: "RoozTextile",
  tagline: "Fine Worsted Suiting, Executive Attire & Institutional Uniforms Since 1994",
  established: 1994,
  yearsOfHeritage: 30,
  phone: "+918900300307",
  displayPhone: "+91 89003 00307",
  whatsappNumber: process.env.WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918900300307",
  email: "concierge@rooztextile.com",
  salesEmail: "b2b@rooztextile.com",
  corporateEmail: "corporate@rooztextile.com",
  gstNumber: "19FXSPR5726Q1Z1",
  address: {
    street: "Bajeprotappur, Subjalapul",
    area: "Beside Hanuman Mandir",
    city: "Burdwan",
    state: "West Bengal",
    pincode: "713101",
    country: "India",
  },
  stats: {
    clientsEquipped: "500+ Corporations & Schools",
    monthlyProduction: "65,000+ Suiting Articles",
    fabricVarieties: "160+ Luxury Weaves",
    reorderRate: "98.7%",
  },
  divisions: [
    "The Sartorial Atelier (Executive Blazers & Bespoke Suiting)",
    "The Executive Shirtmaker (2-Ply Giza & Oxford Cotton)",
    "Institutional & Academy Division (School Attire & Crested Uniforms)",
    "Private Label & Corporate Contracts (Aviation, Luxury Hospitality & Corporate Wear)",
  ],
  certifications: [
    "Woolmark Certified Australian Merino Blends",
    "ISO 9001:2015 Quality Management Certified",
    "OEKO-TEX® Standard 100 Non-Toxic Dyes",
    "AATCC Grade 4.5+ Colorfastness & Tensile Durability",
    "Sedex SMETA Audited Fair-Wage Mill",
  ],
};
