export default function TypingIndicator() {
  return (
    <div className="flex items-center mb-3 animate-msg-in">
      {/* Sofia avatar */}
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center mr-2 flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #7c6ff7, #2dd4bf)" }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="4.5" r="2.5" fill="white" opacity="0.9" />
          <path d="M1 13c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="white" opacity="0.8" />
        </svg>
      </div>

      {/* Bubble with wave dots */}
      <div
        className="px-4 py-3 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderBottomLeftRadius: "4px",
        }}
      >
        <div className="flex gap-1.5 items-end h-4">
          {/* Dot 1 */}
          <span
            className="w-2 h-2 rounded-full animate-wave-1"
            style={{ background: "linear-gradient(135deg, #a78bfa, #7c6ff7)" }}
          />
          {/* Dot 2 */}
          <span
            className="w-2 h-2 rounded-full animate-wave-2"
            style={{ background: "linear-gradient(135deg, #818cf8, #2dd4bf)" }}
          />
          {/* Dot 3 */}
          <span
            className="w-2 h-2 rounded-full animate-wave-3"
            style={{ background: "linear-gradient(135deg, #2dd4bf, #34d399)" }}
          />
        </div>
      </div>
    </div>
  );
}
