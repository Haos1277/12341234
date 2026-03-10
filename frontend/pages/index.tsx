import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const HeroIllustration = () => (
  <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#EDE9FE" />
        <stop offset="100%" stopColor="#F5D0FE" />
      </radialGradient>
      <linearGradient id="figureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#A855F7" />
      </linearGradient>
      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#D946EF" stopOpacity="0.15" />
      </linearGradient>
    </defs>
    {/* Background */}
    <circle cx="90" cy="90" r="88" fill="url(#bgGrad)" />
    {/* Concentric rings */}
    <circle cx="90" cy="90" r="78" fill="none" stroke="url(#ringGrad)" strokeWidth="1" />
    <circle cx="90" cy="90" r="64" fill="none" stroke="url(#ringGrad)" strokeWidth="0.8" />
    {/* Head */}
    <circle cx="90" cy="58" r="22" fill="url(#figureGrad)" opacity="0.9" />
    {/* Shoulders/body arc */}
    <path d="M 50 125 C 50 98 130 98 130 125" fill="url(#figureGrad)" opacity="0.8" />
    {/* Glow dot center */}
    <circle cx="90" cy="58" r="8" fill="white" opacity="0.25" />
    {/* Neural sparkle lines — right */}
    <line x1="118" y1="44" x2="132" y2="34" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="122" y1="56" x2="138" y2="54" stroke="#A855F7" strokeWidth="1" strokeLinecap="round" />
    <line x1="116" y1="70" x2="130" y2="76" stroke="#8B5CF6" strokeWidth="1" strokeLinecap="round" />
    {/* Neural sparkle lines — left */}
    <line x1="62" y1="44" x2="48" y2="34" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="58" y1="56" x2="42" y2="54" stroke="#A855F7" strokeWidth="1" strokeLinecap="round" />
    <line x1="64" y1="70" x2="50" y2="76" stroke="#8B5CF6" strokeWidth="1" strokeLinecap="round" />
    {/* Accent dots */}
    <circle cx="135" cy="34" r="3" fill="#A855F7" opacity="0.7" />
    <circle cx="140" cy="54" r="2" fill="#C084FC" opacity="0.6" />
    <circle cx="132" cy="76" r="2.5" fill="#8B5CF6" opacity="0.5" />
    <circle cx="45" cy="34" r="3" fill="#A855F7" opacity="0.7" />
    <circle cx="40" cy="54" r="2" fill="#C084FC" opacity="0.6" />
    <circle cx="48" cy="76" r="2.5" fill="#8B5CF6" opacity="0.5" />
    {/* Small floating dots */}
    <circle cx="90" cy="155" r="3" fill="#C4B5FD" opacity="0.5" />
    <circle cx="110" cy="150" r="2" fill="#DDD6FE" opacity="0.5" />
    <circle cx="70" cy="150" r="2" fill="#DDD6FE" opacity="0.5" />
  </svg>
);

const IconHeart = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 27S4 20 4 11.5A7.5 7.5 0 0 1 16 7a7.5 7.5 0 0 1 12 4.5C28 20 16 27 16 27z"
      fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconBrain = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6C9.8 6 8 7.8 8 10c0 .7.2 1.3.5 1.9C6.5 12.5 5 14.1 5 16c0 1.6.9 3 2.2 3.7C7.1 20.1 7 20.5 7 21c0 2.2 1.8 4 4 4v-2c-1.1 0-2-.9-2-2 0-.4.1-.8.3-1.1l.5-1-.9-.7C7.7 17.6 7 16.9 7 16c0-1.2.9-2.3 2.2-2.7l1.1-.3-.4-1.1C9.7 11.5 9.5 11 9.5 10.5 9.5 9.1 10.6 8 12 8c.6 0 1.2.2 1.6.6l.8.7.8-.7c1-.9 2.3-1.4 3.8-1.4V6c-1.8 0-3.3.6-4.5 1.5-.5-.3-1-.5-1.5-.5z"
      fill="#8B5CF6" />
    <path d="M20 6c-1.8 0-3.3.6-4.5 1.5C16.5 8.4 17.5 9.9 17.5 11.5c0 .2 0 .3-.1.5H18c3.3 0 6 2.7 6 6 0 1.9-.9 3.7-2.4 4.8C21.8 23.6 22 24.3 22 25c0 1.1-.9 2-2 2v2c2.2 0 4-1.8 4-4 0-.3 0-.6-.1-.9C25.8 22.7 27 20.5 27 18c0-4.2-3.4-7.6-7.6-7.9C19.8 9.5 20 8.8 20 8c0-.7-.2-1.4-.5-2C19.7 6 19.8 6 20 6z"
      fill="#A855F7" opacity="0.8" />
  </svg>
);

const IconShield = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3L5 8v7c0 6.6 4.7 12.7 11 14 6.3-1.3 11-7.4 11-14V8L16 3z"
      fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 16l3 3 7-7" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
          <div className="flex items-center gap-2 text-xl font-semibold text-purple-700">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" stroke="#7C3AED" strokeWidth="1.5" />
              <circle cx="12" cy="9" r="4" fill="#7C3AED" opacity="0.85" />
              <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" fill="#7C3AED" opacity="0.7" />
            </svg>
            Sofia
          </div>
          <div className="flex gap-3">
            <a href="/login" className="text-sm text-purple-600 hover:text-purple-800 px-4 py-2">
              Войти
            </a>
            <a href="/register" className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition-colors font-medium">
              Начать
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
          <div className="mb-8 drop-shadow-md">
            <HeroIllustration />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Психологическая поддержка<br />
            <span className="text-purple-600">в любое время</span>
          </h1>
          <p className="text-lg text-gray-500 mb-10 max-w-lg">
            Sofia — ваш личный AI-психолог. Помогает разобраться в чувствах, справиться со стрессом и найти ресурс для жизни.
          </p>
          <a href="/register" className="bg-purple-600 hover:bg-purple-700 text-white text-base font-semibold px-10 py-4 rounded-full shadow-lg transition-colors">
            Попробовать бесплатно
          </a>
          <p className="text-sm text-gray-400 mt-4">10 сообщений в день бесплатно</p>
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-8 pb-16">
          {[
            { icon: <IconHeart />, title: "Без осуждения", desc: "Безопасное пространство для любых тем" },
            { icon: <IconBrain />, title: "Научный подход", desc: "КПТ, ACT и mindfulness техники" },
            { icon: <IconShield />, title: "Конфиденциально", desc: "Ваши данные защищены" },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-purple-50 text-center">
              <div className="flex justify-center mb-3">{f.icon}</div>
              <h3 className="font-semibold text-gray-700 mb-1">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
