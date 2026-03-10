"use client";

import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { getChatHistory, sendMessageStream } from "../lib/api";

interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [historyLoading, setHistoryLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getChatHistory()
      .then((history) => setMessages(history))
      .catch(() => {})
      .finally(() => setHistoryLoading(false));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setError("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    // Add streaming placeholder
    setMessages((prev) => [...prev, { role: "assistant", content: "", streaming: true }]);

    sendMessageStream(
      text,
      (chunk) => {
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last?.role === "assistant") {
            next[next.length - 1] = { ...last, content: last.content + chunk };
          }
          return next;
        });
      },
      () => {
        setLoading(false);
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last?.role === "assistant") {
            next[next.length - 1] = { ...last, streaming: false };
          }
          return next;
        });
      },
      (err) => {
        setLoading(false);
        setMessages((prev) => prev.filter((m) => !(m.role === "assistant" && m.content === "")));
        setError(err);
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
        {historyLoading && (
          <p className="text-center text-gray-400 text-sm mt-8">Загрузка...</p>
        )}
        {!historyLoading && messages.length === 0 && (
          <div className="text-center mt-16 px-8">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-3xl mx-auto mb-4">
              🌸
            </div>
            <h2 className="text-lg font-medium text-gray-700 mb-2">Привет, я Sofia</h2>
            <p className="text-gray-400 text-sm">
              Я здесь, чтобы выслушать тебя. Расскажи, что у тебя на душе?
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          msg.content === "" && msg.streaming
            ? <TypingIndicator key={i} />
            : <MessageBubble key={i} role={msg.role} content={msg.content} streaming={msg.streaming} />
        ))}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg mx-4 mb-2">
            {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-purple-100 bg-white p-4">
        <div className="flex gap-2 items-end max-w-3xl mx-auto">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Напиши что-нибудь..."
            rows={1}
            disabled={loading}
            className="flex-1 resize-none rounded-2xl border border-purple-200 px-4 py-3 text-sm outline-none focus:border-purple-400 transition-colors bg-purple-50 placeholder-gray-400 max-h-32 overflow-y-auto"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-full bg-purple-400 hover:bg-purple-500 disabled:opacity-40 flex items-center justify-center transition-colors flex-shrink-0"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <p className="text-center text-xs text-gray-300 mt-2">Enter — отправить · Shift+Enter — новая строка</p>
      </div>
    </div>
  );
}
