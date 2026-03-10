import React from "react";

interface Props {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

export default function MessageBubble({ role, content, streaming }: Props) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-sm mr-2 flex-shrink-0 self-end">
          S
        </div>
      )}
      <div
        className={`
          max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
          ${isUser
            ? "bg-purple-100 text-gray-800 rounded-br-sm"
            : "bg-white shadow-sm text-gray-800 rounded-bl-sm border border-purple-50"
          }
        `}
      >
        {content}
        {streaming && (
          <span className="inline-block w-1 h-4 bg-purple-400 ml-1 animate-pulse rounded-sm align-middle" />
        )}
      </div>
    </div>
  );
}
