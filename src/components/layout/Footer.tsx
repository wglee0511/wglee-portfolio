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
        <address className="not-italic mb-3 flex items-center justify-center gap-3 flex-wrap">
          <a href="mailto:ranazang@naver.com" rel="author" className="hover:underline" style={{ color: 'var(--text-muted)' }}>ranazang@naver.com</a>
          <span aria-hidden="true">·</span>
          <a href="https://github.com/wglee0511" rel="me noopener noreferrer" target="_blank" className="hover:underline" style={{ color: 'var(--text-muted)' }}>GitHub</a>
          <span aria-hidden="true">·</span>
          <a href="https://velog.io/@wglee0511" rel="me noopener noreferrer" target="_blank" className="hover:underline" style={{ color: 'var(--text-muted)' }}>Velog</a>
        </address>
        <p>© {new Date().getFullYear()} 이원교. All rights reserved.</p>
        <p className="mt-2">Built with Next.js, Framer Motion & Tailwind CSS</p>
      </div>
    </footer>
  );
};

export default Footer;
