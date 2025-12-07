import React from "react";

export default function PageHeader({ title, subtitle, icon: Icon, action }) {
  const styles = `
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .page-header-content {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .page-header-icon {
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(168, 85, 247, 0.2));
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #c4b5fd;
    }

    .page-header-text h1 {
      color: white;
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0;
      letter-spacing: -0.5px;
    }

    .page-header-text p {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.9375rem;
      margin: 0.25rem 0 0 0;
    }

    @media (max-width: 640px) {
      .page-header {
        flex-direction: column;
      }
      .page-header-icon {
        width: 48px;
        height: 48px;
      }
      .page-header-text h1 {
        font-size: 1.5rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <header className='page-header'>
        <div className='page-header-content'>
          {Icon && (
            <div className='page-header-icon'>
              <Icon size={28} />
            </div>
          )}
          <div className='page-header-text'>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
        {action && <div className='page-header-action'>{action}</div>}
      </header>
    </>
  );
}
