"use client";

import { createContext, useContext, useState } from "react";
import { CalendlyModal } from "@/components/CalendlyModal";

interface CalendlyContextValue {
  openCalendly: () => void;
}

const CalendlyContext = createContext<CalendlyContextValue | null>(null);

export function CalendlyProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CalendlyContext.Provider value={{ openCalendly: () => setIsOpen(true) }}>
      {children}
      <CalendlyModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        url={process.env.NEXT_PUBLIC_CALENDLY_URL ?? ""}
      />
    </CalendlyContext.Provider>
  );
}

export function useCalendly(): CalendlyContextValue {
  const ctx = useContext(CalendlyContext);
  if (!ctx) throw new Error("useCalendly must be used within CalendlyProvider");
  return ctx;
}
