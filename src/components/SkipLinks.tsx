// @ts-nocheck
import React from 'react';

interface SkipLinksProps {
  links?: Array<{
    href: string;
    label: string;
  }>;
}

const defaultLinks = [
  { href: '#main-content', label: 'Skip to main content' },
  { href: '#navigation', label: 'Skip to navigation' },
  { href: '#search', label: 'Skip to search' },
  { href: '#footer', label: 'Skip to footer' }
];

export function SkipLinks({ links = defaultLinks }: SkipLinksProps) {
  return (
    <div className="skip-links" role="navigation" aria-label="Skip links">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="skip-link"
          onClick={(e) => {
            e.preventDefault();
            const target = document.querySelector(link.href);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
              // Set focus to target if it's focusable, otherwise set tabindex
              if (target instanceof HTMLElement) {
                if (target.tabIndex >= 0) {
                  target.focus();
                } else {
                  target.tabIndex = -1;
                  target.focus();
                  // Remove tabindex after focus
                  setTimeout(() => {
                    target.removeAttribute('tabindex');
                  }, 100);
                }
              }
            }
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
