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
  const [messages, setMessages]           = useState<Message[]>([]);
  const [input, setInput]                 = useState("");
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState("");
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
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="flex flex-col h-full">
      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">

        {historyLoading && (
          <p className="text-center text-slate-600 text-sm mt-8">Загрузка...</p>
        )}

        {/* Empty state */}
        {!historyLoading && messages.length === 0 && (
          <div className="text-center mt-16 px-8 animate-slide-up">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: "linear-gradient(135deg, #7c6ff7, #2dd4bf)" }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="9" r="5" fill="white" opacity="0.95" />
                <path d="M4 26c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="white" opacity="0.85" />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-white mb-2">Привет, я Sofia</h2>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
              Я здесь, чтобы выслушать тебя. Расскажи, что у тебя на душе?
            </p>
          </div>
        )}

        {messages.map((msg, i) =>
          msg.content === "" && msg.streaming
            ? <TypingIndicator key={i} />
            : <MessageBubble key={i} role={msg.role} content={msg.content} streaming={msg.streaming} />
        )}

        {error && (
          <div
            className="text-red-400 text-sm px-4 py-2 rounded-xl mx-4 mb-2"
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
            }}
          >
            {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ── */}
      <div
        className="p-4 flex-shrink-0"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(13,20,37,0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex gap-2 items-end max-w-3xl mx-auto">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Напиши что-нибудь..."
            rows={1}
            disabled={loading}
            className="flex-1 resize-none rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all max-h-32 overflow-y-auto"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(124,111,247,0.6)")}
            onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-30"
            style={{
              background: "linear-gradient(135deg, #7c6ff7, #2dd4bf)",
            }}
            onMouseEnter={(e) => { if (!loading && input.trim()) (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.15)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.filter = ""; }}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <p className="text-center text-xs text-slate-700 mt-2">
          Enter — отправить · Shift+Enter — новая строка
        </p>
      </div>
    </div>
  );
}
