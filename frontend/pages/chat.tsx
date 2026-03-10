"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ChatWindow from "../components/ChatWindow";
import { getProfile } from "../lib/api";

interface Profile {
  name: string | null;
  email: string;
  subscription: string;
  messages_today: number;
}

export default function Chat() {
  const router = useRouter();
  const [profile, setProfile]   = useState<Profile | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.replace("/login"); return; }
    getProfile()
      .then(setProfile)
      .catch(() => { localStorage.removeItem("token"); router.replace("/login"); });
  }, [router]);

  const logout = () => { localStorage.removeItem("token"); router.push("/"); };

  const FREE_LIMIT = 10;

  return (
    <>
      <Head><title>Sofia — AI психолог</title></Head>

      <div
        className="flex flex-col h-screen"
        style={{ background: "#080c14" }}
      >
        {/* ── Header ── */}
        <header
          className="flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{
            background: "rgba(13,20,37,0.9)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Sofia identity */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #7c6ff7, #2dd4bf)" }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="6.5" r="3.5" fill="white" opacity="0.9" />
                <path d="M2 16c0-3.9 3.1-7 7-7s7 3.1 7 7" fill="white" opacity="0.8" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-white text-sm">Sofia</div>
              <div className="flex items-center gap-1 text-xs text-teal-400">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
                Онлайн
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {profile?.subscription === "free" && (
              <div className="text-xs text-slate-500">
                {profile.messages_today}/{FREE_LIMIT} сегодня
              </div>
            )}
            {profile?.subscription === "paid" && (
              <span
                className="text-xs px-2 py-1 rounded-full font-medium"
                style={{
                  background: "rgba(124,111,247,0.15)",
                  border: "1px solid rgba(124,111,247,0.3)",
                  color: "#a78bfa",
                }}
              >
                Pro
              </span>
            )}

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white transition-all"
                style={{
                  background: "rgba(124,111,247,0.2)",
                  border: "1px solid rgba(124,111,247,0.3)",
                }}
                onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.background = "rgba(124,111,247,0.35)")}
                onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.background = "rgba(124,111,247,0.2)")}
              >
                {profile?.name?.[0]?.toUpperCase() || "U"}
              </button>

              {menuOpen && (
                <div
                  className="absolute right-0 top-10 py-2 w-52 z-20 rounded-xl"
                  style={{
                    background: "rgba(13,20,37,0.95)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="px-4 py-2 text-xs text-slate-500">{profile?.email}</div>
                  <hr style={{ borderColor: "rgba(255,255,255,0.07)" }} className="my-1" />
                  {profile?.subscription === "free" && (
                    <a
                      href="/subscribe"
                      className="block px-4 py-2 text-sm text-violet-400 hover:bg-violet-500/10 transition-colors"
                    >
                      ✦ Оформить подписку
                    </a>
                  )}
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-slate-400 hover:bg-white/5 transition-colors"
                  >
                    Выйти
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── Chat area ── */}
        <div className="flex-1 overflow-hidden max-w-3xl w-full mx-auto">
          <ChatWindow />
        </div>
      </div>
    </>
  );
}
