import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { gsap } from 'gsap';

/**
 * ChatBox handles the interactive conversation between the user and the
 * financial assistant.  Messages are stored in local component state and
 * sent to the backend via the existing `/api/finance` endpoint.  Loading
 * and error states are surfaced to the user to maintain transparency.  The
 * UI makes use of Tailwind utilities to provide a clean, responsive chat
 * interface with messages aligned to the left or right depending on the
 * sender.
 */
const ChatBox = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const wrapperRef = useRef(null);

  // Scroll to the bottom whenever a new message is added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Animate the chat box into view on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(wrapperRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power2.out',
      });
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  /**
   * Sends the current user input to the backend and updates the chat history.
   */
  const handleSendMessage = async (event) => {
    event.preventDefault();
    const trimmed = userInput.trim();
    if (!trimmed) return;

    const newMessage = { text: trimmed, sender: 'user' };
    setChatHistory((prev) => [...prev, newMessage]);
    setUserInput('');
    setLoading(true);

    try {
      // Preserve existing backend endpoint
      const response = await axios.post('/api/finance', { question: trimmed });
      const botReply = response.data.reply;
      setChatHistory((prev) => [...prev, newMessage, { text: botReply, sender: 'ai' }]);
    } catch (error) {
      console.error('Error while sending message:', error);
      setChatHistory((prev) => [
        ...prev,
        newMessage,
        {
          text: "😕 Oops! Can’t reach the server. Please try again.",
          sender: 'ai',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="chat"
      ref={wrapperRef}
      className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md flex flex-col h-[500px]"
    >
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 border-b border-gray-200"
      >
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                msg.sender === 'user'
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-lg bg-gray-100 text-gray-500 italic">
              Processing...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 flex space-x-2">
        <input
          type="text"
          placeholder="Type your question..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          type="submit"
          className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;