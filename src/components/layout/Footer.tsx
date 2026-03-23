import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Lee Won-kyu. All rights reserved.</p>
        <p className="mt-2">Built with Next.js, Framer Motion & Tailwind CSS</p>
      </div>
    </footer>
  );
};

export default Footer;
