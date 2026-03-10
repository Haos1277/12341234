"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { register, completeOnboarding } from "../lib/api";

type Step = "credentials" | "onboarding";

const bgStyle = {
  background:
    "radial-gradient(ellipse at 30% 40%, rgba(124,111,247,0.2) 0%, transparent 55%)," +
    "radial-gradient(ellipse at 70% 70%, rgba(45,212,191,0.1) 0%, transparent 50%)," +
    "#080c14",
};

const inputClass =
  "w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all";

const inputStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
};

export default function Register() {
  const router = useRouter();
  const [step, setStep]         = useState<Step>("credentials");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [name, setName]         = useState("");
  const [age, setAge]           = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await register(email, password);
      localStorage.setItem("token", data.access_token);
      setStep("onboarding");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await completeOnboarding(name, age ? parseInt(age) : undefined);
      router.push("/chat");
    } catch {
      router.push("/chat");
    }
  };

  const skipOnboarding = () => router.push("/chat");

  const focusGlow  = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.target.style.borderColor = "rgba(124,111,247,0.7)");
  const blurRemove = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.target.style.borderColor = "rgba(255,255,255,0.1)");

  /* ── Onboarding step ── */
  if (step === "onboarding") {
    return (
      <>
        <Head><title>Знакомство — Sofia</title></Head>
        <div className="min-h-screen flex items-center justify-center px-4" style={bgStyle}>
          <div className="glass rounded-3xl p-8 w-full max-w-sm animate-slide-up">
            <div className="text-center mb-8">
              <div
                className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl"
                style={{ background: "linear-gradient(135deg, #7c6ff7, #2dd4bf)" }}
              >
                👋
              </div>
              <h1 className="text-xl font-semibold text-white">Давайте познакомимся</h1>
              <p className="text-slate-400 text-sm mt-1">Это поможет мне лучше вас понять</p>
            </div>

            <form onSubmit={handleOnboarding} className="space-y-4">
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={inputClass}
                style={inputStyle}
                onFocus={focusGlow}
                onBlur={blurRemove}
              />
              <input
                type="number"
                placeholder="Возраст (необязательно)"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min={14}
                max={100}
                className={inputClass}
                style={inputStyle}
                onFocus={focusGlow}
                onBlur={blurRemove}
              />
              <button
                type="submit"
                disabled={loading || !name}
                className="w-full btn-shimmer py-3 rounded-xl text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "..." : "Начать общение"}
              </button>
            </form>

            <button
              onClick={skipOnboarding}
              className="w-full text-center text-sm text-slate-500 mt-4 hover:text-slate-300 transition-colors"
            >
              Пропустить
            </button>
          </div>
        </div>
      </>
    );
  }

  /* ── Registration step ── */
  return (
    <>
      <Head><title>Регистрация — Sofia</title></Head>
      <div className="min-h-screen flex items-center justify-center px-4" style={bgStyle}>
        <div className="glass rounded-3xl p-8 w-full max-w-sm animate-slide-up">
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7c6ff7, #2dd4bf)" }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="10" r="5" fill="white" opacity="0.9" />
                <path d="M5 24c0-5 4-9 9-9s9 4 9 9" fill="white" opacity="0.8" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-white">Создать аккаунт</h1>
            <p className="text-slate-400 text-sm mt-1">10 сообщений в день бесплатно</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
              style={inputStyle}
              onFocus={focusGlow}
              onBlur={blurRemove}
            />
            <input
              type="password"
              placeholder="Пароль (мин. 8 символов)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
              className={inputClass}
              style={inputStyle}
              onFocus={focusGlow}
              onBlur={blurRemove}
            />

            {error && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-shimmer py-3 rounded-xl text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Создаём аккаунт..." : "Зарегистрироваться"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Уже есть аккаунт?{" "}
            <a href="/login" className="text-violet-400 hover:text-violet-300 transition-colors">
              Войти
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
