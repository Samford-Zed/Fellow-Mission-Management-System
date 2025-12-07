import React from "react";
import { Loader2 } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  onClick,
  type = "button",
  className = "",
}) {
  const baseStyles = `
    .custom-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-weight: 600;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: inherit;
      text-decoration: none;
    }

    .custom-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Variants */
    .custom-btn.primary {
      background: linear-gradient(135deg, #7c3aed, #a855f7);
      color: white;
      box-shadow: 0 4px 20px rgba(124, 58, 237, 0.3);
    }

    .custom-btn.primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(124, 58, 237, 0.4);
    }

    .custom-btn.secondary {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      backdrop-filter: blur(10px);
    }

    .custom-btn.secondary:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
    }

    .custom-btn.ghost {
      background: transparent;
      color: rgba(255, 255, 255, 0.8);
    }

    .custom-btn.ghost:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .custom-btn.danger {
      background: linear-gradient(135deg, #dc2626, #ef4444);
      color: white;
      box-shadow: 0 4px 20px rgba(220, 38, 38, 0.3);
    }

    .custom-btn.danger:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(220, 38, 38, 0.4);
    }

    .custom-btn.success {
      background: linear-gradient(135deg, #059669, #10b981);
      color: white;
      box-shadow: 0 4px 20px rgba(5, 150, 105, 0.3);
    }

    .custom-btn.success:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(5, 150, 105, 0.4);
    }

    /* Sizes */
    .custom-btn.sm {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }

    .custom-btn.md {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }

    .custom-btn.lg {
      padding: 1rem 2rem;
      font-size: 1.125rem;
    }

    .custom-btn.full-width {
      width: 100%;
    }

    .btn-spinner {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{baseStyles}</style>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || isLoading}
        className={`custom-btn ${variant} ${size} ${
          fullWidth ? "full-width" : ""
        } ${className}`}
      >
        {isLoading ? (
          <Loader2 size={18} className='btn-spinner' />
        ) : Icon ? (
          <Icon size={18} />
        ) : null}
        {children}
      </button>
    </>
  );
}
