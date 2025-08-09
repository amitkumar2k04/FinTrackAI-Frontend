import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * @param {HTMLElement} el The message element to animate
 */
export function animateMessageBubble(el) {
  gsap.from(el, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: 'power2.out',
  });
}

/**
 * @param {HTMLElement} container The scrolling container
 */
export function scrollToBottom(container) {
  container.scrollTop = container.scrollHeight;
}

/**
 * @param {NodeListOf<HTMLElement>|HTMLElement[]} dots A collection of dot elements
 */
export function animateTypingIndicator(dots) {
  return gsap.to(dots, {
    keyframes: {
      y: ['0%', '-30%', '0%'],
    },
    duration: 0.6,
    ease: 'sine.inOut',
    repeat: -1,
    stagger: {
      each: 0.1,
    },
  });
}