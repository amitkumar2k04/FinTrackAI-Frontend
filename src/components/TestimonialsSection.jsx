import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const testimonials = [
  {
    quote:
      "This assistant completely changed how I manage my finances. I feel more in control than ever before!",
    author: 'Arjun P.',
  },
  {
    quote:
      "I love the personalized insights and how easy it is to get quick advice on budgeting and investing.",
    author: 'Sara K.',
  },
  {
    quote:
      "The chat feels like talking to a friend who understands money. Highly recommended!",
    author: 'Vikram N.',
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, idx) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          delay: idx * 0.2,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-white px-4 border-t border-gray-200"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ quote, author }, idx) => (
            <div
              key={author}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <p className="text-gray-700 italic mb-4">“{quote}”</p>
              <p className="font-semibold text-indigo-600">— {author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;