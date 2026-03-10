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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }
    getProfile()
      .then(setProfile)
      .catch(() => {
        localStorage.removeItem("token");
        router.replace("/login");
      });
  }, [router]);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const FREE_LIMIT = 10;

  return (
    <>
      <Head><title>Sofia — AI психолог</title></Head>
      <div className="flex flex-col h-screen bg-[#fdf8f5]">
        {/* Header */}
        <header className="bg-white border-b border-purple-100 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center text-lg">🌸</div>
            <div>
              <div className="font-semibold text-gray-800 text-sm">Sofia</div>
              <div className="text-xs text-green-500">Онлайн</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {profile && profile.subscription === "free" && (
              <div className="text-xs text-gray-400">
                {profile.messages_today}/{FREE_LIMIT} сегодня
              </div>
            )}
            {profile && profile.subscription === "paid" && (
              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">Pro</span>
            )}

            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)} className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 hover:bg-purple-200 transition-colors text-sm font-medium">
                {profile?.name?.[0]?.toUpperCase() || "U"}
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-10 bg-white rounded-xl shadow-lg border border-purple-100 py-2 w-48 z-10">
                  <div className="px-4 py-2 text-xs text-gray-400">{profile?.email}</div>
                  <hr className="border-purple-50 my-1" />
                  {profile?.subscription === "free" && (
                    <a href="/subscribe" className="block px-4 py-2 text-sm text-purple-600 hover:bg-purple-50">
                      ✨ Оформить подписку
                    </a>
                  )}
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                    Выйти
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Chat */}
        <div className="flex-1 overflow-hidden max-w-3xl w-full mx-auto">
          <ChatWindow />
        </div>
      </div>
    </>
  );
}
