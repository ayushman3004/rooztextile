import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIChatWidget from "@/components/AIChatWidget";
import { companyData } from "@/data/company";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rooztextile.com"),
  title: "Rooz Textile | Fine Worsted Suiting, Executive Attire & Institutional Mills Since 1994",
  description:
    "Premier manufacturer of fine worsted suiting: Super 130s Merino wool blazers, 2-ply Egyptian Giza cotton shirts, and Raymond-grade institutional school uniforms. Equipping 500+ corporations, luxury labels, and prestigious academies.",
  keywords: [
    "executive blazers wholesale manufacturer",
    "super 130s merino wool suiting",
    "egyptian giza cotton shirts manufacturer",
    "wholesale school uniform manufacturer",
    "bespoke corporate suiting India",
    "poly-wool school blazers wholesale",
    "fine worsted suiting mill India",
    "Raymond grade suiting fabric manufacturer",
  ],
  authors: [{ name: "Rooz Textile Mills" }],
  creator: "Rooz Textile",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rooztextile.com",
    title: "Rooz Textile | Premier Wholesale School Uniform Manufacturer Since 1994",
    description:
      "Raymond-grade school blazers, shirts, and skirts engineered for prestigious educational institutions. Contextual WhatsApp quoting and institutional sample kits.",
    siteName: "Rooz Textile",
    images: [
      {
        url: "/images/blazers.jpg",
        width: 1200,
        height: 900,
        alt: "Rooz Textile Flagship Poly-Wool School Blazer",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyData.name,
    description: companyData.tagline,
    url: "https://rooztextile.com",
    logo: "https://rooztextile.com/images/rooz-logo.png",
    telephone: companyData.phone,
    taxID: companyData.gstNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${companyData.address.street}, ${companyData.address.area}`,
      addressLocality: companyData.address.city,
      addressRegion: companyData.address.state,
      postalCode: companyData.address.pincode,
      addressCountry: companyData.address.country,
    },
    foundingDate: "1994",
    areaServed: ["India", "United Arab Emirates", "United Kingdom"],
    sameAs: ["https://wa.me/" + companyData.whatsappNumber],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#19212E] selection:bg-[#C5A265]/30 selection:text-[#0B1320]">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <AIChatWidget />
      </body>
    </html>
  );
}
