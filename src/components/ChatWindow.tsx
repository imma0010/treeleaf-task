"use client"
import { useAppDispatch } from "@/redux/hooks";
import { fetchMessages } from "@/redux/messengerSlice";
import { RootState } from "@/redux/store";
import { FunctionComponent, ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";

interface Message {
  text: string;
  sender: 'me' | 'other';
}

interface ChatWindowProps {
//   messages: Message[];
  messages: User[];
}

// const ChatWindow: FunctionComponent<ChatWindowProps> = ({ messages }): ReactElement => {
// const ChatWindow: FunctionComponent = (): ReactElement => {
//     const dispatch = useAppDispatch();
//     const { messages, status, error } = useSelector((state: RootState) => state.messenger);

//     useEffect(() => {
//         if (status === 'idle') {
//             // dispatch(fetchMessages(1));
//             dispatch(fetchMessages(1));
//         }
//     }, [dispatch, status])

//     useEffect(() => {
//         console.log("Current Status: ", status);
//         console.log("Messages: ", messages);
//     }, [status, messages]);

//     if (status === 'loading') {
//         return <div>Loading...</div>;
//     }

//     if (status === 'failed') {
//         return <div>Error: {error}</div>;
//     }

//   return (
//     <div className="flex-1 flex flex-col bg-white p-4 overflow-y-auto">
//       {messages.map((msg, index) => (
//         <div
//           key={index}
//           className={`mb-4 p-3 max-w-sm rounded-lg ${
//             msg.id % 2 == 1
//               ? 'bg-blue-500 text-white self-end'
//               : 'bg-gray-200 text-black self-start'
//           }`}
//         >
//           {msg.name}
//         </div>
//       ))}
//     </div>
//   );
// };

interface User {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
}

const ChatWindow: FunctionComponent<ChatWindowProps> = ({ messages }): ReactElement => {
  return (
    <div className="flex-1 flex flex-col bg-white p-4 overflow-y-auto">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-4 p-3 max-w-sm rounded-lg ${
            msg.id % 2 == 1
              ? 'bg-blue-500 text-white self-end'
              : 'bg-gray-200 text-black self-start'
          }`}
        >
          {msg.name}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
