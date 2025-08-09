import React from 'react';
import PropTypes from 'prop-types';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

/**
 * ChatInput renders the form used to send messages.  It delegates
 * controlled input state and message submission to the parent via
 * props.  This separation allows the input to remain stateless and
 * reusable in other contexts.  The send button is disabled while
 * messages are being fetched or when the input is empty.
 *
 * @param {string} userInput The current value of the input
 * @param {(string) => void} setUserInput Setter for the input value
 * @param {(event: React.FormEvent) => void} handleSendMessage Submit handler
 * @param {boolean} loading Whether a reply is being fetched
 */
function ChatInput({ userInput, setUserInput, handleSendMessage, loading }) {
  return (
    <form
      onSubmit={handleSendMessage}
      className="p-4 flex space-x-2 border-t border-gray-200"
    >
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your question..."
        aria-label="Type your question"
        className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        disabled={loading || userInput.trim() === ''}
        className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center"
      >
        <PaperAirplaneIcon className="h-6 w-6 transform -rotate-45" />
      </button>
    </form>
  );
}

ChatInput.propTypes = {
  userInput: PropTypes.string.isRequired,
  setUserInput: PropTypes.func.isRequired,
  handleSendMessage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default React.memo(ChatInput);