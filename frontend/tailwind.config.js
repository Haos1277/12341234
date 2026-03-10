/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary":   "#080c14",
        "bg-secondary": "#0d1425",
        accent: {
          DEFAULT: "#7c6ff7",
          light:   "#a78bfa",
          teal:    "#2dd4bf",
        },
      },
      animation: {
        "float":      "float 6s ease-in-out infinite",
        "glow":       "glow-pulse 3.5s ease-in-out infinite",
        "slide-up":   "slide-up 0.5s ease-out both",
        "wave-1":     "wave-dot 1.4s ease-in-out 0ms infinite",
        "wave-2":     "wave-dot 1.4s ease-in-out 160ms infinite",
        "wave-3":     "wave-dot 1.4s ease-in-out 320ms infinite",
        "blink":      "blink-cursor 1.2s step-end infinite",
        "particle-1": "particle-float 7s ease-in-out 0s infinite",
        "particle-2": "particle-float 9s ease-in-out 2s infinite",
        "particle-3": "particle-float 11s ease-in-out 4s infinite",
        "particle-4": "particle-float 8s ease-in-out 1s infinite",
        "particle-5": "particle-float 10s ease-in-out 3s infinite",
        "msg-in":     "msg-in 0.25s ease-out both",
        "orbit-glow": "orbit-glow 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-14px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%":       { opacity: "0.85", transform: "scale(1.06)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "wave-dot": {
          "0%, 60%, 100%": { transform: "translateY(0)" },
          "30%":            { transform: "translateY(-8px)" },
        },
        "blink-cursor": {
          "0%, 45%":   { opacity: "1" },
          "55%, 100%": { opacity: "0" },
        },
        "particle-float": {
          "0%, 100%": { transform: "translateY(0) translateX(0)",       opacity: "0.35" },
          "40%":      { transform: "translateY(-18px) translateX(8px)", opacity: "0.75" },
          "70%":      { transform: "translateY(-8px) translateX(-6px)", opacity: "0.5"  },
        },
        "msg-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "orbit-glow": {
          "0%, 100%": { filter: "drop-shadow(0 0 4px rgba(124,111,247,0.6))" },
          "50%":       { filter: "drop-shadow(0 0 14px rgba(45,212,191,0.9))" },
        },
      },
    },
  },
  plugins: [],
};
