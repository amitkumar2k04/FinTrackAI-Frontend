import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const stats = [
  { value: 10234, label: 'Questions Answered' },
  { value: 5234, label: 'Budgets Tracked' },
  { value: 3278, label: 'Active Users' },
];

const StatisticsSection = () => {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      numberRefs.current.forEach((el, index) => {
        const target = stats[index].value;
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power1.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-gray-50 px-4 border-t border-gray-200"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Trusted by Thousands
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map(({ label }, idx) => (
            <div key={label} className="flex flex-col items-center">
              <span
                ref={(el) => (numberRefs.current[idx] = el)}
                className="text-4xl font-extrabold text-indigo-600"
              >
                0
              </span>
              <span className="mt-2 text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;