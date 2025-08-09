import React, { useEffect, useRef } from 'react';
import { animateTypingIndicator } from '../../animations/chatAnimations.js';


function TypingIndicator() {
  const dotRefs = useRef([]);

  useEffect(() => {
    const dots = dotRefs.current;
    // Start the bounce animation; store the timeline so we can clean it up
    const tl = animateTypingIndicator(dots);
    return () => {
      // Stop the animation when the indicator is removed
      tl && tl.kill();
    };
  }, []);

  return (
    <div className="message-bubble px-4 py-3 rounded-2xl bg-gray-100 text-gray-500 italic flex space-x-1">
      <span
        ref={(el) => (dotRefs.current[0] = el)}
        className="inline-block"
      >
        •
      </span>
      <span
        ref={(el) => (dotRefs.current[1] = el)}
        className="inline-block"
      >
        •
      </span>
      <span
        ref={(el) => (dotRefs.current[2] = el)}
        className="inline-block"
      >
        •
      </span>
    </div>
  );
}

export default TypingIndicator;