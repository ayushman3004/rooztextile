import { companyData } from "../data/company";

/**
 * Sanitizes phone number to purely digits for wa.me URL
 */
export function getCleanWhatsAppNumber(rawNumber?: string): string {
  const num = rawNumber || companyData.whatsappNumber;
  return num.replace(/[^0-9]/g, "");
}

/**
 * Generates an encoded WhatsApp deep-link
 */
export function getWhatsAppUrl(message: string, customPhone?: string): string {
  const phone = getCleanWhatsAppNumber(customPhone);
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${phone}?text=${encodedText}`;
}

/**
 * WhatsApp message for a specific product wholesale or corporate inquiry
 */
export function getProductInquiryUrl(product: {
  name: string;
  categoryLabel: string;
  moq: number;
  fabric: string;
  division?: string;
}): string {
  const isExec = product.division === "executive";
  const text = `*${isExec ? "Executive Suiting & Wholesale Inquiry" : "Institutional Wholesale Inquiry"} — RoozTextile*

Hello RoozTextile Concierge,
I am inquiring regarding wholesale manufacturing / bulk orders for:
• *Garment:* ${product.name}
• *Collection:* ${product.categoryLabel}
• *Fabric Spec:* ${product.fabric}
• *Minimum Order Qty:* ${product.moq} units

Please provide your formal wholesale quotation sheet, fabric swatch availability, and production lead times.

*Company / Institution Name:* 
*Estimated Quantity Required:* 
*City / Delivery Location:* `;

  return getWhatsAppUrl(text);
}

/**
 * WhatsApp message for requesting a luxury swatch box or institutional sample kit
 */
export function getSampleKitUrl(params?: {
  clientName?: string;
  contactPerson?: string;
  division?: "executive" | "institutional" | "both";
  articles?: string[];
  notes?: string;
}): string {
  const divisionLabel =
    params?.division === "executive"
      ? "Executive Suiting & Giza Cotton Swatch Box"
      : params?.division === "institutional"
      ? "Institutional Uniform & Blazer Sizing Kit"
      : "Complete Mill Swatch Archive (Executive & Institutional)";

  const articles = params?.articles?.length ? params.articles.join(", ") : "Blazers, Shirts & Fabric Swatches";

  const text = `*Luxury Swatch Box & Sample Request — RoozTextile*

Dear Concierge Desk,
We would like to request an official Fabric Swatch Presentation Kit for our evaluation:

• *Organization / School / Firm:* ${params?.clientName || "[Enter Firm or School Name]"}
• *Contact Person:* ${params?.contactPerson || "[Enter Name & Designation]"}
• *Kit Category:* ${divisionLabel}
• *Articles of Interest:* ${articles}
${params?.notes ? `• *Special Notes:* ${params.notes}` : ""}

Please confirm express courier dispatch to our office. Thank you!`;

  return getWhatsAppUrl(text);
}

/**
 * WhatsApp message for full custom quote builder
 */
export function getCustomQuoteUrl(data: {
  clientName: string;
  contactName: string;
  phone: string;
  orderType: string;
  quantityRange: string;
  requirements?: string;
}): string {
  const text = `*B2B Custom Quotation Request — RoozTextile*

*Organization / Firm:* ${data.clientName}
*Contact Person:* ${data.contactName}
*WhatsApp / Phone:* ${data.phone}
*Division / Garment:* ${data.orderType}
*Target Quantity:* ${data.quantityRange}
${data.requirements ? `*Custom Specifications:* ${data.requirements}` : ""}

Kindly share formal wholesale price sheet with FOB/Doorstep delivery terms.`;

  return getWhatsAppUrl(text);
}

/**
 * WhatsApp escalation from AI assistant
 */
export function getAIEscalationUrl(userQuery: string, aiSummary?: string): string {
  const text = `*Client Inquiry Escalation — RoozTextile Concierge*

Hello Sales Team,
I was exploring your suiting and apparel collection on the website and have a specific inquiry:

"${userQuery}"
${aiSummary ? `\n*Context:* ${aiSummary}` : ""}

Could a senior suiting specialist assist me with fabric swatches, sizing, and quotation?`;

  return getWhatsAppUrl(text);
}
