import React, { useEffect, useRef } from 'react';
import {
  BanknotesIcon,
  ChartBarIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const features = [
  {
    title: 'Smart Budgeting',
    description:
      'Track your expenses and stay on top of your budget with personalized advice.',
    icon: BanknotesIcon,
  },
  {
    title: 'Investment Insights',
    description:
      'Receive tailored suggestions for investments based on your financial goals.',
    icon: ChartBarIcon,
  },
  {
    title: 'Financial Literacy',
    description:
      'Learn the fundamentals of saving, investing and managing money wisely.',
    icon: LightBulbIcon,
  },
];

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Register ScrollTrigger once when the component mounts
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 bg-white px-4" id="features" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Features
        </h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, idx) => (
            <div
              key={title}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Icon className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;