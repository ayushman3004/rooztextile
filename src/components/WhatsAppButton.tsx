import React from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  message: string;
  label?: string;
  variant?: "primary" | "secondary" | "gold" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: boolean;
}

export default function WhatsAppButton({
  message,
  label = "Inquire on WhatsApp",
  variant = "primary",
  size = "md",
  className = "",
  icon = true,
}: WhatsAppButtonProps) {
  const url = getWhatsAppUrl(message);

  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none rounded-sm shadow-sm active:translate-y-px tracking-wide";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5 font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-[#141C2B] text-[#FBF9F5] border border-[#273449] hover:bg-[#0B1320] hover:border-[#C5A265] hover:text-[#E4CA95]",
    secondary:
      "bg-[#25D366] text-white hover:bg-[#1EBE5D] border border-[#1EBE5D]",
    gold:
      "bg-[#C5A265] text-[#0B1320] font-semibold hover:bg-[#D8B878] border border-[#9F7E3B] shadow-md",
    outline:
      "bg-transparent text-[#141C2B] border border-[#C5A265] hover:bg-[#C5A265]/10 hover:border-[#9F7E3B]",
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && (
        <svg
          className={size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4"}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.086-.177.18-.076.354.101.173.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.375-.044.102-.115.433-.505.549-.679.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824zm-3.392-10.416c-4.283 0-7.766 3.483-7.766 7.766 0 1.37.356 2.656.974 3.774l-1.034 3.778 3.865-1.014c1.077.587 2.316.924 3.636.924 4.283 0 7.766-3.483 7.766-7.766 0-4.283-3.483-7.766-7.766-7.766zm0 14.075c-1.157 0-2.287-.311-3.271-.9l-.234-.139-2.431.637.649-2.37-.153-.244c-.646-1.026-.987-2.213-.987-3.43 0-3.479 2.831-6.31 6.31-6.31s6.31 2.831 6.31 6.31-2.831 6.31-6.31 6.31z" />
        </svg>
      )}
      <span>{label}</span>
    </a>
  );
}
