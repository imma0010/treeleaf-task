"use client"
import { FunctionComponent, ReactElement, useState } from 'react';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';

const MessengerTab: FunctionComponent = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'me' | 'other' }[]>([]);

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { text: message, sender: 'me' }]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        className="p-3 bg-blue-500 text-white rounded-full shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close' : 'Chat'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col mt-4">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-blue-500 text-white rounded-t-lg">
            <h4 className="text-lg font-bold">Messenger</h4>
            <button
              className="text-white font-bold"
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <ChatWindow messages={messages} />
          </div>

          {/* Input Field */}
          <MessageInput onSend={handleSendMessage} />
        </div>
      )}
    </div>
  );
};

export default MessengerTab;
