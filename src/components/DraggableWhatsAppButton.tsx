"use client";

import React, { useState, useEffect, useRef } from "react";
import { companyData } from "@/data/company";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function DraggableWhatsAppButton() {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const dragStartRef = useRef<{
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    hasMoved: boolean;
  }>({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    hasMoved: false,
  });

  // Calculate default position: directly above the chatbot (bottom-right)
  useEffect(() => {
    const updateDefaultPos = () => {
      const btnSize = 56;
      const rightOffset = 24;
      const bottomOffset = 96; // directly above the chatbot trigger (24px bottom + ~54px height + 18px gap)
      const x = window.innerWidth - btnSize - rightOffset;
      const y = window.innerHeight - btnSize - bottomOffset;
      setPosition({ x: Math.max(16, x), y: Math.max(16, y) });
    };

    updateDefaultPos();
    window.addEventListener("resize", updateDefaultPos);
    return () => window.removeEventListener("resize", updateDefaultPos);
  }, []);

  const openWhatsApp = () => {
    const url = getWhatsAppUrl(
      `Hello ${companyData.name}, I would like to inquire about your school uniform catalogue and wholesale pricing.`
    );
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // ---------------- MOUSE DRAG HANDLERS ----------------
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!position) return;
    e.preventDefault();

    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y,
      hasMoved: false,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - dragStartRef.current.startX;
      const deltaY = moveEvent.clientY - dragStartRef.current.startY;

      if (!dragStartRef.current.hasMoved && (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4)) {
        dragStartRef.current.hasMoved = true;
        setIsDragging(true);
      }

      if (dragStartRef.current.hasMoved) {
        const btnSize = 56;
        const padding = 12;
        const maxX = window.innerWidth - btnSize - padding;
        const maxY = window.innerHeight - btnSize - padding;

        const newX = Math.min(Math.max(padding, dragStartRef.current.initialX + deltaX), maxX);
        const newY = Math.min(Math.max(padding, dragStartRef.current.initialY + deltaY), maxY);

        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      if (!dragStartRef.current.hasMoved) {
        openWhatsApp();
      }

      setTimeout(() => {
        setIsDragging(false);
      }, 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // ---------------- TOUCH DRAG HANDLERS ----------------
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!position || e.touches.length !== 1) return;
    const touch = e.touches[0];

    dragStartRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      initialX: position.x,
      initialY: position.y,
      hasMoved: false,
    };

    const handleTouchMove = (moveEvent: TouchEvent) => {
      if (moveEvent.touches.length !== 1) return;
      const moveTouch = moveEvent.touches[0];
      const deltaX = moveTouch.clientX - dragStartRef.current.startX;
      const deltaY = moveTouch.clientY - dragStartRef.current.startY;

      if (!dragStartRef.current.hasMoved && (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4)) {
        dragStartRef.current.hasMoved = true;
        setIsDragging(true);
      }

      if (dragStartRef.current.hasMoved) {
        moveEvent.preventDefault(); // prevent window scrolling while dragging button
        const btnSize = 56;
        const padding = 12;
        const maxX = window.innerWidth - btnSize - padding;
        const maxY = window.innerHeight - btnSize - padding;

        const newX = Math.min(Math.max(padding, dragStartRef.current.initialX + deltaX), maxX);
        const newY = Math.min(Math.max(padding, dragStartRef.current.initialY + deltaY), maxY);

        setPosition({ x: newX, y: newY });
      }
    };

    const handleTouchEnd = () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);

      if (!dragStartRef.current.hasMoved) {
        openWhatsApp();
      }

      setTimeout(() => {
        setIsDragging(false);
      }, 50);
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
  };

  if (!position) return null;

  return (
    <div
      ref={buttonRef}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      className="fixed top-0 left-0 z-50 select-none touch-none will-change-transform"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="relative group">
        {/* Tooltip */}
        {showTooltip && !isDragging && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap bg-[#11161F] text-white text-xs px-3 py-1.5 rounded-xl shadow-xl border border-white/10 font-medium flex items-center gap-1.5 animate-fadeIn">
            <span>Direct WhatsApp</span>
            <span className="text-[10px] text-neutral-400">• Drag to move</span>
          </div>
        )}

        {/* Round WhatsApp Draggable Button */}
        <button
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          aria-label="Contact RoozTextile on WhatsApp (Draggable)"
          className={`relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#25D366] to-[#1EBE5D] text-white shadow-2xl flex items-center justify-center border-2 border-white/80 transition-transform duration-150 active:scale-95 ${
            isDragging ? "cursor-grabbing scale-110 shadow-emerald-500/50" : "cursor-grab hover:scale-105"
          }`}
        >
          {/* Subtle Outer Ping Ring */}
          {!isDragging && (
            <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
          )}

          {/* Official WhatsApp SVG Logo */}
          <svg
            className="w-7 h-7 fill-white drop-shadow-sm shrink-0"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.086-.177.18-.076.354.101.173.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.375-.044.102-.115.433-.505.549-.679.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824zm-3.392-10.416c-4.283 0-7.766 3.483-7.766 7.766 0 1.37.356 2.656.974 3.774l-1.034 3.778 3.865-1.014c1.077.587 2.316.924 3.636.924 4.283 0 7.766-3.483 7.766-7.766 0-4.283-3.483-7.766-7.766-7.766zm0 14.075c-1.157 0-2.287-.311-3.271-.9l-.234-.139-2.431.637.649-2.37-.153-.244c-.646-1.026-.987-2.213-.987-3.43 0-3.479 2.831-6.31 6.31-6.31s6.31 2.831 6.31 6.31-2.831 6.31-6.31 6.31z" />
          </svg>

          {/* Mini Status Online Indicator */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#11161F] rounded-full flex items-center justify-center p-0.5">
            <span className="w-full h-full bg-emerald-400 rounded-full" />
          </span>
        </button>
      </div>
    </div>
  );
}
