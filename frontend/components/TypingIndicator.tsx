export default function TypingIndicator() {
  return (
    <div className="flex items-center mb-3">
      <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-sm mr-2 flex-shrink-0">
        S
      </div>
      <div className="bg-white shadow-sm border border-purple-50 px-4 py-3 rounded-2xl rounded-bl-sm">
        <div className="flex gap-1 items-center">
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
