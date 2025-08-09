import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

/**
 * A simple top navigation bar that introduces the brand and allows users to
 * quickly navigate to sections of the page.  The nav fades in on mount and
 * becomes sticky at the top of the viewport thanks to Tailwind’s utility
 * classes.  Additional links can be added to the navLinks array below.
 */

const navLinks = [
  // When external is true, the link is rendered as a React Router Link
  { label: 'Home', href: '/', external: true },
  { label: 'Features', href: '#features', external: false },
  { label: 'Chat', href: '/chat', external: true },
];

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    // Fade in the navbar when it appears
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power2.out',
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md shadow z-50"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          FinTrackAI
        </Link>
        <ul className="flex space-x-6 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.external ? (
                <Link
                  to={link.href}
                  className="hover:text-indigo-600 transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className="hover:text-indigo-600 transition-colors"
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;