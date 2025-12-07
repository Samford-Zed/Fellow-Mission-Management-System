import React from "react";

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  disabled = false,
  name,
  autoComplete,
}) {
  const styles = `
    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .input-label {
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.875rem;
      font-weight: 500;
    }

    .input-label .required {
      color: #f87171;
      margin-left: 2px;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: 1rem;
      color: rgba(255, 255, 255, 0.4);
      pointer-events: none;
      transition: color 0.3s ease;
    }

    .custom-input {
      width: 100%;
      padding: 0.875rem 1rem;
      padding-left: ${Icon ? "2.75rem" : "1rem"};
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 12px;
      color: white;
      font-size: 1rem;
      font-family: inherit;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .custom-input::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }

    .custom-input:focus {
      outline: none;
      border-color: #a855f7;
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.15);
    }

    .custom-input:focus + .input-icon,
    .input-wrapper:focus-within .input-icon {
      color: #a855f7;
    }

    .custom-input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .custom-input.has-error {
      border-color: #f87171;
    }

    .custom-input.has-error:focus {
      box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.15);
    }

    .input-error {
      color: #f87171;
      font-size: 0.8125rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className='input-group'>
        {label && (
          <label className='input-label'>
            {label}
            {required && <span className='required'>*</span>}
          </label>
        )}
        <div className='input-wrapper'>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            autoComplete={autoComplete}
            className={`custom-input ${error ? "has-error" : ""}`}
          />
          {Icon && <Icon size={18} className='input-icon' />}
        </div>
        {error && <span className='input-error'>{error}</span>}
      </div>
    </>
  );
}
