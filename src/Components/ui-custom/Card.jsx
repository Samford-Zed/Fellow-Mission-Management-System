import React from "react";

export default function Card({
  children,
  className = "",
  hover = false,
  padding = "md",
  variant = "default",
}) {
  const styles = `
    .glass-card {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      backdrop-filter: blur(20px);
      transition: all 0.4s ease;
    }

    .glass-card.hover:hover {
      transform: translateY(-4px);
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .glass-card.solid {
      background: rgba(30, 30, 50, 0.9);
    }

    .glass-card.gradient {
      background: linear-gradient(
        135deg,
        rgba(124, 58, 237, 0.2) 0%,
        rgba(168, 85, 247, 0.1) 100%
      );
      border-color: rgba(168, 85, 247, 0.2);
    }

    .glass-card.padding-none {
      padding: 0;
    }

    .glass-card.padding-sm {
      padding: 1rem;
    }

    .glass-card.padding-md {
      padding: 1.5rem;
    }

    .glass-card.padding-lg {
      padding: 2rem;
    }

    .glass-card.padding-xl {
      padding: 2.5rem;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div
        className={`glass-card ${variant} ${
          hover ? "hover" : ""
        } padding-${padding} ${className}`}
      >
        {children}
      </div>
    </>
  );
}
