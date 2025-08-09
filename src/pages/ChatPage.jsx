import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { pageEnterFromRight, pageExitToLeft } from '../animations/pageTransitions.js';
import ChatHistory from '../components/Chat/ChatHistory.jsx';
import ChatInput from '../components/Chat/ChatInput.jsx';

/**
 * ChatPage presents the conversational interface on its own route.  The
 * layout consists of a scrollable history area and an input area at the
 * bottom.  Messages animate into view using GSAP when they are added to
 * the history.  A separate animation module handles page transitions.
 */
function ChatPage() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const pageWrapperRef = useRef(null);

  // Animate the page sliding in from the right on mount and out to the left
  // when unmounting.  The exit animation runs asynchronously but will
  // not block route navigation in this simple setup.
  useEffect(() => {
    const el = pageWrapperRef.current;
    const enterTl = pageEnterFromRight(el);
    return () => {
      // Trigger exit animation; we don't await its completion since
      // React unmounts the component immediately.  In more advanced
      // setups you could hook into route transitions to delay navigation
      // until the animation finishes.
      pageExitToLeft(el);
      enterTl?.kill();
    };
  }, []);

  /**
   * Sends the current user input to the backend and updates the chat
   * history.  A typing indicator is displayed while waiting for the
   * response.  Errors are surfaced as assistant messages.
   */
  const handleSendMessage = async (event) => {
    event.preventDefault();
    const trimmed = userInput.trim();
    if (!trimmed) return;
    const userMsg = { id: Date.now(), text: trimmed, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setUserInput('');
    setLoading(true);
    try {
      const response = await axios.post('/api/finance', { question: trimmed });
      const reply = response?.data?.reply ?? 'No response';
      const botMsg = { id: Date.now() + 1, text: reply, sender: 'ai' };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg = {
        id: Date.now() + 1,
        text: "😕 Oops! Can't reach the server. Please try again.",
        sender: 'ai',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={pageWrapperRef}
      className="flex-1 flex flex-col items-center justify-center px-4 py-8"
    >
      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg flex flex-col h-[70vh]">
        {/* Render chat messages and typing indicator */}
        <ChatHistory messages={messages} loading={loading} containerRef={chatContainerRef} />
        {/* Input area */}
        <ChatInput
          userInput={userInput}
          setUserInput={setUserInput}
          handleSendMessage={handleSendMessage}
          loading={loading}
        />
      </div>
    </section>
  );
}

export default ChatPage;