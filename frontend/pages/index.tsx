import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/chat");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Sofia — AI психолог</title>
        <meta name="description" content="Профессиональная психологическая поддержка 24/7" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-6 max-w-5xl mx-auto w-full">
          <div className="text-xl font-semibold text-purple-700">🌸 Sofia</div>
          <div className="flex gap-3">
            <a href="/login" className="text-sm text-purple-600 hover:text-purple-800 px-4 py-2">
              Войти
            </a>
            <a href="/register" className="text-sm bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full transition-colors">
              Начать
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center text-5xl mb-8 shadow-lg">
            🌸
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Психологическая поддержка<br />
            <span className="text-purple-500">в любое время</span>
          </h1>
          <p className="text-lg text-gray-500 mb-10 max-w-lg">
            Sofia — ваш личный AI-психолог. Помогает разобраться в чувствах, справиться со стрессом и найти ресурс для жизни.
          </p>
          <a href="/register" className="bg-purple-500 hover:bg-purple-600 text-white text-lg px-8 py-4 rounded-full shadow-md transition-colors">
            Попробовать бесплатно
          </a>
          <p className="text-sm text-gray-400 mt-4">10 сообщений в день бесплатно</p>
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-8 pb-16">
          {[
            { icon: "💜", title: "Без осуждения", desc: "Безопасное пространство для любых тем" },
            { icon: "🧠", title: "Научный подход", desc: "КПТ, ACT и mindfulness техники" },
            { icon: "🔒", title: "Конфиденциально", desc: "Ваши данные защищены" },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-purple-50 text-center">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-gray-700 mb-1">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
