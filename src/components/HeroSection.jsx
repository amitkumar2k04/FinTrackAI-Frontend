import React from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';


import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';


const HeroSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
      });
      gsap.from(subheadingRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
      });
      gsap.from(ctaRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        delay: 0.4,
        ease: 'back.out(1.4)',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={sectionRef}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 px-4 text-center"
    >
      <div className="max-w-4xl mx-auto">
        <h1 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-4">
          Personal Finance Assistant
        </h1>
        <p ref={subheadingRef} className="text-lg md:text-xl mb-8">
          Get instant answers and insights for budgeting, saving and investing.
        </p>
        <a
          ref={ctaRef}
          href="/chat"
          onClick={(e) => {
            e.preventDefault();
            navigate('/chat');
          }}
          onMouseEnter={() => {
            gsap.to(ctaRef.current, { scale: 1.05, duration: 0.2, ease: 'power1.out' });
          }}
          onMouseLeave={() => {
            gsap.to(ctaRef.current, { scale: 1.0, duration: 0.2, ease: 'power1.out' });
          }}
          className="inline-flex items-center bg-white text-blue-600 font-semibold py-3 px-6 rounded-md shadow-md hover:bg-gray-100 transition-colors"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6 mr-2" />
          Start Chatting
        </a>
      </div>
    </header>
  );
};

export default HeroSection;