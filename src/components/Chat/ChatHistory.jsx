import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { animateMessageBubble, scrollToBottom } from '../../animations/chatAnimations.js';
import TypingIndicator from './TypingIndicator.jsx';

/**
 * ChatHistory renders the list of chat messages and an optional typing
 * indicator.  When messages change, it scrolls to the bottom and
 * animates the newest message bubble using GSAP.  The container
 * should be assigned via `containerRef` so that parent components can
 * programmatically control scrolling if needed.
 *
 * @param {Array<{id: number, text: string, sender: string}>} messages
 * @param {boolean} loading Whether a reply is being fetched from the backend
 * @param {React.MutableRefObject<HTMLElement>} containerRef Ref to the scrollable container
 */
function ChatHistory({ messages, loading, containerRef }) {
  useEffect(() => {
    // Early return if there is no container or no messages
    if (!containerRef?.current || messages.length === 0) return;
    const container = containerRef.current;
    // Scroll to the bottom of the chat history
    scrollToBottom(container);
    // Animate the last message bubble into view
    const bubbles = container.querySelectorAll('.message-bubble');
    const last = bubbles[bubbles.length - 1];
    if (last) {
      animateMessageBubble(last);
    }
  }, [messages, containerRef]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4"
    >
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`message-bubble px-4 py-3 rounded-2xl max-w-xs break-words ${
              msg.sender === 'user'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                : 'bg-gray-100 text-gray-800 shadow'
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
      {/* Render the typing indicator when the backend is processing a reply */}
      {loading && (
        <div className="flex justify-start">
          <TypingIndicator />
        </div>
      )}
    </div>
  );
}

ChatHistory.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  containerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

// Memoize to prevent unnecessary re-renders when props haven't changed.
export default React.memo(ChatHistory);