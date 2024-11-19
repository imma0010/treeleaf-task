"use client"
import React, { FunctionComponent, ReactElement, useState } from 'react';

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput: FunctionComponent<MessageInputProps> = ({ onSend }): ReactElement => {
  const [message, setMessage] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleSend();
    }
  }

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center p-4 border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 p-2 border rounded-lg outline-none"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSend}
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
