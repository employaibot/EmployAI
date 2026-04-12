"use client";

import { useState } from "react";
import Link from "next/link";

interface GradientPillButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const GRADIENT = "linear-gradient(to right, #f4745a, #e8417a, #7b3fe4)";
const GLOW =
  "0 0 18px 3px rgba(232,65,122,0.45), 0 0 36px 6px rgba(123,63,228,0.25)";

export default function GradientPillButton({
  children,
  href,
  onClick,
  className = "",
}: GradientPillButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const style: React.CSSProperties = {
    background: GRADIENT,
    boxShadow: hovered ? GLOW : "none",
    filter: hovered ? "brightness(1.1)" : "brightness(1)",
    transform: pressed ? "scale(0.97)" : "scale(1)",
    transition: "filter 200ms ease, box-shadow 200ms ease, transform 200ms ease",
  };

  const baseClass = `inline-flex items-center justify-center rounded-full px-8 py-3 text-[15px] font-medium text-white ${className}`;

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => { setHovered(false); setPressed(false); },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
  };

  if (href) {
    return (
      <Link href={href} className={baseClass} style={style} {...handlers}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClass} style={style} {...handlers}>
      {children}
    </button>
  );
}
