"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { register, completeOnboarding } from "../lib/api";

type Step = "credentials" | "onboarding";

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  if (step === "onboarding") {
    return (
      <>
        <Head><title>Знакомство — Sofia</title></Head>
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-8 w-full max-w-sm">
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">👋</div>
              <h1 className="text-xl font-semibold text-gray-800">Давайте познакомимся</h1>
              <p className="text-gray-400 text-sm mt-1">Это поможет мне лучше вас понять</p>
            </div>
            <form onSubmit={handleOnboarding} className="space-y-4">
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-purple-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400 bg-purple-50"
              />
              <input
                type="number"
                placeholder="Возраст (необязательно)"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min={14}
                max={100}
                className="w-full border border-purple-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400 bg-purple-50"
              />
              <button
                type="submit"
                disabled={loading || !name}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl text-sm font-medium transition-colors disabled:opacity-60"
              >
                {loading ? "..." : "Начать общение"}
              </button>
            </form>
            <button onClick={skipOnboarding} className="w-full text-center text-sm text-gray-400 mt-4 hover:text-gray-600">
              Пропустить
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head><title>Регистрация — Sofia</title></Head>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-8 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🌸</div>
            <h1 className="text-xl font-semibold text-gray-800">Создать аккаунт</h1>
            <p className="text-gray-400 text-sm mt-1">10 сообщений в день бесплатно</p>
          </div>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-purple-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400 bg-purple-50"
            />
            <input
              type="password"
              placeholder="Пароль (мин. 8 символов)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
              className="w-full border border-purple-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400 bg-purple-50"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl text-sm font-medium transition-colors disabled:opacity-60"
            >
              {loading ? "Создаём аккаунт..." : "Зарегистрироваться"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-400 mt-6">
            Уже есть аккаунт?{" "}
            <a href="/login" className="text-purple-500 hover:underline">Войти</a>
          </p>
        </div>
      </div>
    </>
  );
}
