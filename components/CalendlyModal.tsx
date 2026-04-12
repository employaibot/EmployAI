"use client";

import { useEffect, useState } from "react";
import { PopupModal } from "react-calendly";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export function CalendlyModal({ isOpen, onClose, url }: CalendlyModalProps) {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootElement(document.body);
  }, []);

  if (!rootElement || !url) return null;

  return (
    <PopupModal
      url={url}
      rootElement={rootElement}
      onModalClose={onClose}
      open={isOpen}
    />
  );
}
