"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { login } from "../lib/api";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-8 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🌸</div>
            <h1 className="text-xl font-semibold text-gray-800">Добро пожаловать</h1>
            <p className="text-gray-400 text-sm mt-1">Войдите в свой аккаунт</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-purple-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400 bg-purple-50"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl text-sm font-medium transition-colors disabled:opacity-60"
            >
              {loading ? "Вход..." : "Войти"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-400 mt-6">
            Нет аккаунта?{" "}
            <a href="/register" className="text-purple-500 hover:underline">Зарегистрироваться</a>
          </p>
        </div>
      </div>
    </>
  );
}
