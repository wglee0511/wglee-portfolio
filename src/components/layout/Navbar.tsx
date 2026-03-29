"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const isDark = resolvedTheme === 'dark';

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 glass rounded-full">
      <ul className="flex items-center gap-6 md:gap-8">
        {navItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              style={{ color: 'var(--text-secondary)' }}
              className="text-sm font-medium hover:text-white transition-colors"
            >
              {item.name}
            </a>
          </li>
        ))}
        <li>
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
            style={{ color: 'var(--text-secondary)' }}
          >
            {mounted ? (isDark ? <Sun size={16} /> : <Moon size={16} />) : <span className="w-4 h-4" />}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
