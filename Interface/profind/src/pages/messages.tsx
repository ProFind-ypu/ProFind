// // components/AIMessages.tsx
// import { useState, useEffect, useRef } from "react";

// interface Message {
//   id: string;
//   text: string;
//   sender: "user" | "ai";
//   timestamp: Date;
// }

// export default function AIMessages() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const sendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text: input,
//       sender: "user",
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("loaclhost:5678/webhook/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userMessage.text }),
//       });

//       const data = await response.json();

//       const aiMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         text: data.response,
//         sender: "ai",
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (error) {
//       console.error("AI message error:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: (Date.now() + 2).toString(),
//           text: "Sorry, I encountered an error. Please try again.",
//           sender: "ai",
//           timestamp: new Date(),
//         },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen  ml-[20%]">
//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`max-w-[80%] p-3 rounded-lg ${
//               msg.sender === "user"
//                 ? "ml-auto bg-blue-600 text-white"
//                 : "mr-auto bg-white text-black border border-gray-200"
//             }`}
//           >
//             <p>{msg.text}</p>
//             <span className="text-xs opacity-70 mt-1 block">
//               {msg.timestamp.toLocaleTimeString()}
//             </span>
//           </div>
//         ))}
//         {isLoading && (
//           <div className="mr-auto bg-white border border-gray-200 p-3 rounded-lg">
//             <div className="animate-pulse">...</div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <form onSubmit={sendMessage} className=" p-4 ">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 p-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             disabled={isLoading}
//           />
//           <button
//             type="submit"
//             disabled={!input.trim() || isLoading}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

export const AIMessages = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <iframe
        className="w-[80%] h-[98%] ml-[20%] bg-black"
        src="http://localhost:5678/webhook/1cd71ada-1728-4d9a-8788-03b2ec9d1f6e/chat"
        title="n8n AI Chat"
      />
    </div>
  );
};
