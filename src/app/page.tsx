// "use client"
// import { ReactElement, useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import ChatWindow from '../components/ChatWindow';
// import MessageInput from '../components/MessageInput';
// import { NextPage } from 'next';

interface Contact {
  id: number;
  name: string;
}

// const Home: NextPage = (): ReactElement => {
//   const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
//   const [messages, setMessages] = useState<{ text: string; sender: 'me' | 'other' }[]>([]);

//   const contacts: Contact[] = [
//     { id: 1, name: 'Alice' },
//     { id: 2, name: 'Bob' },
//   ];

//   const handleSendMessage = (message: string) => {
//     setMessages([...messages, { text: message, sender: 'me' }]);
//   };

//   return (
//     <div className="flex h-screen">
//       <Sidebar contacts={contacts} onSelectContact={setSelectedContact} />
//       {/* {selectedContact ? ( */}
//         <div className="flex flex-col flex-1">
//           {/* <ChatWindow messages={messages} /> */}
//           <ChatWindow />
//           <MessageInput onSend={handleSendMessage} />
//         </div>
//       {/* ) : (
//         <div className="flex flex-1 items-center justify-center text-gray-500">
//           Select a contact to start chatting
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default Home;

"use client";

import { ReactElement, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchMessages, addMessage, incrementPage } from "@/redux/messengerSlice";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import Sidebar from "../components/Sidebar";

const Home = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { messages, status, page } = useAppSelector((state) => state.messenger);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fetch initial messages
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMessages(page));
    }
  }, [dispatch, status, page]);

  // Scroll to bottom
  const scrollToBottom = () => {
    scrollContainerRef.current?.scrollTo({
      top: scrollContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  // Handle sending a new message
  const handleSendMessage = (message: string) => {
    dispatch(
      addMessage({
        id: Date.now(), // Unique ID
        text: message,
        sender: "me", // Outgoing message
      })
    );
    scrollToBottom(); // Automatically scroll to the bottom
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const atTop = container.scrollTop === 0;
    const atBottom = Math.abs(container.scrollHeight - container.scrollTop - container.clientHeight) < 5;

    setIsScrolledToBottom(atBottom);

    if (atTop) {
      // Save the current scroll height
      const previousScrollHeight = container.scrollHeight;

      console.log("At top, fetching older messages..."); // Debugging
      dispatch(incrementPage());
      dispatch(fetchMessages(page + 1)).then(() => {
        // Restore the scroll position after messages are added
        const newScrollHeight = container.scrollHeight;
        container.scrollTop = newScrollHeight - previousScrollHeight;
      });
    }
  };


  return (
    <div className="flex h-screen">
      <Sidebar contacts={[]} onSelectContact={setSelectedContact} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto" ref={scrollContainerRef} onScroll={handleScroll}>
          <ChatWindow messages={messages} />
          {/* <div ref={messagesEndRef} /> */}
        </div>
        <MessageInput onSend={handleSendMessage} />
        {!isScrolledToBottom && (
          <button
            className="fixed bottom-20 right-8 p-2 px-4 rounded-full bg-blue-800 text-white"
            onClick={scrollToBottom}
          >
            ↓
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
