import React from "react";

interface Props {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

export default function MessageBubble({ role, content, streaming }: Props) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3 animate-msg-in`}>

      {/* Sofia avatar */}
      {!isUser && (
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center text-xs mr-2 flex-shrink-0 self-end"
          style={{ background: "linear-gradient(135deg, #7c6ff7, #2dd4bf)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="4.5" r="2.5" fill="white" opacity="0.9" />
            <path d="M1 13c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="white" opacity="0.8" />
          </svg>
        </div>
      )}

      {/* Bubble */}
      <div
        className="max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed text-slate-100"
        style={
          isUser
            ? {
                background: "rgba(124,111,247,0.22)",
                border: "1px solid rgba(124,111,247,0.3)",
                borderBottomRightRadius: "4px",
              }
            : {
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderBottomLeftRadius: "4px",
              }
        }
      >
        {content}
        {streaming && (
          <span
            className="inline-block w-0.5 h-4 ml-1 rounded-sm align-middle animate-blink"
            style={{ background: "linear-gradient(180deg, #a78bfa, #2dd4bf)" }}
          />
        )}
      </div>
    </div>
  );
}
