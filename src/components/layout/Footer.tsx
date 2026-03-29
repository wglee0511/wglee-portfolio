import React from 'react';

const Footer = () => {
  return (
    <footer
      className="py-12 px-6 backdrop-blur-sm"
      style={{
        borderTop: '1px solid var(--footer-border)',
        background: 'var(--footer-bg)',
      }}
    >
      <div className="max-w-6xl mx-auto text-center text-sm" style={{ color: 'var(--text-muted)' }}>
        <p>© {new Date().getFullYear()} 이원교. All rights reserved.</p>
        <p className="mt-2">Built with Next.js, Framer Motion & Tailwind CSS</p>
      </div>
    </footer>
  );
};

export default Footer;
