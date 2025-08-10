import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { pageEnterFromRight, pageExitToLeft } from '../animations/pageTransitions.js';
import ChatHistory from '../components/Chat/ChatHistory.jsx';
import ChatInput from '../components/Chat/ChatInput.jsx';

function ChatPage() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const pageWrapperRef = useRef(null);
  
  useEffect(() => {
    const el = pageWrapperRef.current;
    const enterTl = pageEnterFromRight(el);
    return () => {
      pageExitToLeft(el);
      enterTl?.kill();
    };
  }, []);

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
      const reply = response?.data?.reply;
      if (!reply) {
        throw new Error('Invalid response from server');
      }
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