import { NextRequest, NextResponse } from "next/server";
import { queryCatalogEngine } from "@/lib/ai-catalog-engine";
import { productsData } from "@/data/products";
import { companyData } from "@/data/company";
import { getAIEscalationUrl } from "@/lib/whatsapp";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, messages } = body;

    const userQuery = message || (messages && messages[messages.length - 1]?.content) || "";

    if (!userQuery) {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 }
      );
    }

    // Check if external LLM API key is provided
    const apiKey = process.env.LLM_API_KEY || process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY;

    if (apiKey && process.env.OPENAI_API_KEY) {
      try {
        const systemPrompt = `You are the distinguished B2B suiting and apparel concierge for "Rooz Textile", a premier manufacturer of fine worsted suiting (Super 130s Australian Merino blazers, 2-ply Egyptian Giza cotton shirts) and Raymond-grade institutional school uniforms (poly-wool blazers, Oxford shirts, pleated skirts, crested ties) since 1994. 
You speak to corporate executives, luxury brand directors, and school principals with refined, luxury heritage hospitality.
Keep answers informative and elegant. Highlight fabric specs (e.g., Super 130s Merino 270 GSM, Egyptian Giza 145 GSM, Poly-wool 280 GSM), MOQs (executive blazers: 20 pcs, shirts: 30 pcs, school blazers: 50 pcs), half-canvas construction, and custom monogramming/crests.
Encourage contacting the concierge desk on WhatsApp for fabric swatch presentation boxes and formal quote sheets.
Catalog data: ${JSON.stringify(productsData)}
Company data: ${JSON.stringify(companyData)}`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemPrompt },
              ...(messages || [{ role: "user", content: userQuery }]),
            ],
            temperature: 0.7,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices[0]?.message?.content || "";
          return NextResponse.json({
            role: "assistant",
            content: reply,
            whatsappUrl: getAIEscalationUrl(userQuery, "AI Assistance Escalation"),
            suggestedQuestions: [
              "What is the MOQ for school blazers?",
              "Request an Institutional Sample Kit",
              "Connect on WhatsApp with a uniform specialist",
            ],
          });
        }
      } catch (err) {
        console.warn("External LLM proxy call failed, falling back to catalog engine:", err);
      }
    }

    // Default intelligent offline catalog engine (zero downtime, high accuracy)
    const result = queryCatalogEngine(userQuery);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        role: "assistant",
        content:
          "Thank you for contacting Rooz Textile. Our procurement specialists are ready to assist with fabric samples, school crest embroidery, and bulk tier quotes directly on WhatsApp.",
        whatsappUrl: getAIEscalationUrl("General Inquiry"),
      },
      { status: 200 }
    );
  }
}
