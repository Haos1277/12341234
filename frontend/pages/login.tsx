"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { login } from "../lib/api";

export default function Login() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.access_token);
      router.push("/chat");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head><title>Войти — Sofia</title></Head>

      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(124,111,247,0.2) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 70% 70%, rgba(45,212,191,0.1) 0%, transparent 50%)," +
            "#080c14",
        }}
      >
        {/* Floating accent orb behind card */}
        <div
          className="absolute w-72 h-72 rounded-full animate-glow pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(124,111,247,0.15) 0%, transparent 70%)",
            top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          }}
        />

        <div className="glass rounded-3xl p-8 w-full max-w-sm animate-slide-up relative z-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7c6ff7, #2dd4bf)" }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="10" r="5" fill="white" opacity="0.9" />
                <path d="M5 24c0-5 4-9 9-9s9 4 9 9" fill="white" opacity="0.8" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-white">Добро пожаловать</h1>
            <p className="text-slate-400 text-sm mt-1">Войдите в свой аккаунт</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(124,111,247,0.7)")}
              onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(124,111,247,0.7)")}
              onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />

            {error && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-shimmer py-3 rounded-xl text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {loading ? "Вход..." : "Войти"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Нет аккаунта?{" "}
            <a href="/register" className="text-violet-400 hover:text-violet-300 transition-colors">
              Зарегистрироваться
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
