"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { queryCatalogEngine, ChatMessage } from "@/lib/ai-catalog-engine";
import { getAIEscalationUrl } from "@/lib/whatsapp";

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const initialMessage: ChatMessage = {
    role: "assistant",
    content:
      "Greetings. I am the **RoozTextile Suiting Concierge**. I can assist you with fabric specifications (Super 130s Merino Wool, 2-Ply Egyptian Giza Cotton, Poly-Wool Twills), minimum order quantities (MOQ), luxury swatch presentation boxes, and bespoke crest or monogramming options. How may I serve your organization today?",
    whatsappUrl: getAIEscalationUrl("Inquiry from Suiting Concierge"),
    suggestedQuestions: [
      "Tell me about Super 130s Merino Blazers",
      "What is the MOQ for executive dress shirts?",
      "What school uniforms do you manufacture?",
      "Request a luxury fabric swatch box",
    ],
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || loading) return;

    setHasInteracted(true);
    setInputQuery("");

    // Append user message
    const userMsg: ChatMessage = { role: "user", content: query };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, data]);
      } else {
        const fallback = queryCatalogEngine(query);
        setMessages((prev) => [...prev, fallback]);
      }
    } catch {
      const fallback = queryCatalogEngine(query);
      setMessages((prev) => [...prev, fallback]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setHasInteracted(true);
          }}
          className="relative group flex items-center gap-3 bg-[#11161F] text-white border-2 border-[#6F8FA8] pl-4 pr-5 py-3.5 rounded-full shadow-2xl hover:bg-[#1E2633] transition-all duration-300 animate-fadeIn cursor-pointer"
          aria-label="Open RoozTextile Suiting Concierge"
        >
          <div className="relative w-8 h-8 rounded-full bg-[#1C2430] border border-[#8BA8BF] p-1 flex items-center justify-center shrink-0">
            <Image
              src="/images/rooz-logo.png"
              alt="Crest"
              width={22}
              height={22}
              className="object-contain filter brightness-125"
            />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#8BA8BF] rounded-full ring-2 ring-[#11161F]" />
          </div>
          <div className="text-left">
            <span className="block text-[9px] uppercase font-bold tracking-widest text-[#8BA8BF]">
              Suiting Concierge
            </span>
            <span className="text-xs font-semibold text-white tracking-wide">
              Ask Fabrics & MOQs
            </span>
          </div>
          {!hasInteracted && (
            <span className="absolute -top-2 -left-2 bg-[#7D1826] text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/40 shadow-xs">
              Online
            </span>
          )}
        </button>
      )}

      {/* Slide-Up Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[590px] max-h-[85vh] bg-[#FDFBF7] rounded-[2rem] shadow-2xl border border-[#E5DDD0] flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-[#6F8FA8] text-white p-4 border-b border-[#56758D] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white p-1.5 flex items-center justify-center">
                <Image
                  src="/images/rooz-logo.png"
                  alt="Crest"
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-editorial-heading text-base font-normal tracking-wide text-white flex items-center gap-1.5">
                  RoozTextile Concierge
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </h3>
                <p className="text-[10px] text-white/80 uppercase tracking-widest font-light">
                  Fine Suiting & Uniform Archives
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition"
                aria-label="Close chat window"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FAF7F0] text-xs">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[86%] rounded-2xl p-3.5 shadow-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#11161F] text-white"
                      : "bg-[#FFFFFF] text-[#11161F] border border-[#E5DDD0]"
                  }`}
                >
                  <div className="whitespace-pre-line prose-xs font-light">
                    {msg.content.split("\n").map((line, lIdx) => {
                      if (line.startsWith("• ") || line.startsWith("- ")) {
                        return (
                          <div key={lIdx} className="ml-2 my-0.5">
                            {line}
                          </div>
                        );
                      }
                      if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ")) {
                        return (
                          <div key={lIdx} className="ml-2 my-0.5 font-medium">
                            {line}
                          </div>
                        );
                      }
                      return (
                        <p key={lIdx} className="my-1">
                          {line}
                        </p>
                      );
                    })}
                  </div>

                  {/* Matched Products Preview */}
                  {msg.matchedProducts && msg.matchedProducts.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-[#E5DDD0] space-y-2">
                      <span className="block text-[9px] font-bold text-[#6F8FA8] uppercase tracking-wider">
                        Matching Suiting Articles:
                      </span>
                      {msg.matchedProducts.map((p, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-center gap-2 p-1.5 bg-[#FAF7F0] rounded-xl border border-[#E5DDD0]"
                        >
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-neutral-300">
                            <Image src={p.image} alt={p.name} fill className="object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-neutral-900 truncate text-[11px]">
                              {p.name}
                            </div>
                            <div className="text-[10px] text-neutral-500">
                              {p.gsm} GSM • MOQ: {p.moq} pcs
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Inline WhatsApp Escalation Button */}
                  {msg.whatsappUrl && msg.role === "assistant" && (
                    <div className="mt-3 pt-2.5 border-t border-[#E5DDD0]">
                      <a
                        href={msg.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#11161F] text-white hover:bg-[#6F8FA8] rounded-full font-semibold text-[10px] uppercase tracking-wider transition w-full justify-center shadow-xs"
                      >
                        <span>Chat with Specialist on WhatsApp</span>
                        <span>→</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Suggested prompt chips */}
                {msg.suggestedQuestions && index === messages.length - 1 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
                    {msg.suggestedQuestions.map((chip, chipIdx) => (
                      <button
                        key={chipIdx}
                        onClick={() => handleSendMessage(chip)}
                        className="text-[10px] text-[#11161F] bg-white hover:bg-[#FAF7F0] border border-[#6F8FA8]/60 hover:border-[#6F8FA8] px-3 py-1 rounded-full font-medium transition cursor-pointer text-left shadow-2xs"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-neutral-500 italic text-[11px] p-2 bg-white rounded-full w-max border border-neutral-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F8FA8] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F8FA8] animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F8FA8] animate-bounce delay-200" />
                <span>Consulting suiting archives & fabric specs...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#E5DDD0] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about Super 130s, Giza cotton, blazers..."
              className="flex-1 px-3.5 py-2 text-xs bg-[#FAF7F0] border border-[#D3CBBF] rounded-full focus:outline-none focus:border-[#6F8FA8] text-[#11161F]"
            />
            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="px-4 py-2 bg-[#11161F] text-white hover:bg-[#6F8FA8] disabled:opacity-40 rounded-full font-semibold text-xs transition uppercase tracking-wider"
              aria-label="Send message"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
