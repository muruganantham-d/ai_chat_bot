"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);

  async function sendMessage() {
    const res = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setChat([...chat, { role: "user", content: input }, { role: "bot", content: data.reply }]);
    setInput("");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow p-4 space-y-4">
        <div className="h-80 overflow-y-auto border p-2 rounded-lg bg-gray-50">
          {chat.map((msg, i) => (
            <div key={i} className={`p-2 my-1 rounded-lg ${msg.role === "user" ? "bg-blue-200 text-right" : "bg-green-200 text-left"}`}>
              {msg.content}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded-l-lg p-2"
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r-lg">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
