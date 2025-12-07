import React from "react";
import Sidebar from "./Sidebar";

export default function AppLayout({ children, isAdmin = false }) {
  const styles = `
    .app-layout {
      min-height: 100vh;
      background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .app-main {
      margin-left: 260px;
      min-height: 100vh;
      padding: 2rem;
    }

    @media (max-width: 1024px) {
      .app-main {
        margin-left: 0;
        padding: 4rem 1.5rem 2rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className='app-layout'>
        <Sidebar isAdmin={isAdmin} />
        <main className='app-main'>{children}</main>
      </div>
    </>
  );
}
