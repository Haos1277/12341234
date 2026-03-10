import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

/* ── 3-D Orbital Sphere (pure SVG + SMIL animations) ── */
const HeroOrb = () => (
  <svg
    width="320"
    height="320"
    viewBox="0 0 320 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="animate-orbit-glow"
  >
    <defs>
      {/* Sphere — off-centre radial gradient gives 3-D depth */}
      <radialGradient id="sphereGrad" cx="34%" cy="28%" r="72%">
        <stop offset="0%"   stopColor="#c4b5fd" />
        <stop offset="30%"  stopColor="#7c6ff7" />
        <stop offset="65%"  stopColor="#3730a3" />
        <stop offset="100%" stopColor="#1a1040" />
      </radialGradient>

      {/* Ambient background glow */}
      <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#7c6ff7" stopOpacity="0.28" />
        <stop offset="55%"  stopColor="#2dd4bf" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#7c6ff7" stopOpacity="0" />
      </radialGradient>

      {/* Sphere specular highlight */}
      <radialGradient id="highlight" cx="30%" cy="24%" r="42%">
        <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>

      {/* Orbital ring gradients — fade in/out so ring looks solid not flat */}
      <linearGradient id="ring1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#7c6ff7" stopOpacity="0" />
        <stop offset="25%"  stopColor="#7c6ff7" stopOpacity="0.95" />
        <stop offset="75%"  stopColor="#2dd4bf" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="ring2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#2dd4bf" stopOpacity="0" />
        <stop offset="25%"  stopColor="#2dd4bf" stopOpacity="0.75" />
        <stop offset="75%"  stopColor="#a78bfa" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="ring3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#a78bfa" stopOpacity="0" />
        <stop offset="25%"  stopColor="#a78bfa" stopOpacity="0.55" />
        <stop offset="75%"  stopColor="#7c6ff7" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#7c6ff7" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* ── Ambient glow halo ── */}
    <circle cx="160" cy="160" r="155" fill="url(#ambientGlow)" />

    {/* ── Outer orbital ring — slowly rotates ── */}
    <ellipse cx="160" cy="160" rx="148" ry="44" fill="none" stroke="url(#ring1)" strokeWidth="1.8">
      <animateTransform
        attributeName="transform" type="rotate"
        from="0 160 160" to="360 160 160"
        dur="16s" repeatCount="indefinite"
      />
    </ellipse>

    {/* ── Middle ring — counter-clockwise, different tilt ── */}
    <ellipse cx="160" cy="160" rx="116" ry="33" fill="none" stroke="url(#ring2)" strokeWidth="1.3" transform="rotate(55 160 160)">
      <animateTransform
        attributeName="transform" type="rotate"
        from="55 160 160" to="-305 160 160"
        dur="22s" repeatCount="indefinite"
      />
    </ellipse>

    {/* ── Inner ring ── */}
    <ellipse cx="160" cy="160" rx="88" ry="24" fill="none" stroke="url(#ring3)" strokeWidth="1" transform="rotate(-25 160 160)">
      <animateTransform
        attributeName="transform" type="rotate"
        from="-25 160 160" to="335 160 160"
        dur="30s" repeatCount="indefinite"
      />
    </ellipse>

    {/* ── Main sphere body ── */}
    <circle cx="160" cy="160" r="84" fill="url(#sphereGrad)" />

    {/* ── Specular overlay for 3-D sheen ── */}
    <circle cx="160" cy="160" r="84" fill="url(#highlight)" />

    {/* ── Surface detail: broad soft highlight ── */}
    <ellipse cx="133" cy="128" rx="22" ry="14" fill="white" opacity="0.1" transform="rotate(-22 133 128)" />
    {/* ── Sharp specular dot ── */}
    <circle cx="127" cy="122" r="6" fill="white" opacity="0.22" />

    {/* ── Neural nodes — pulsing opacity ── */}
    <circle cx="224" cy="96" r="5.5" fill="#a78bfa" opacity="0.9">
      <animate attributeName="opacity" values="0.9;0.3;0.9" dur="3s"   repeatCount="indefinite" />
    </circle>
    <circle cx="90"  cy="87" r="4.5" fill="#2dd4bf" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="4.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="238" cy="208" r="4.5" fill="#c4b5fd" opacity="0.75">
      <animate attributeName="opacity" values="0.75;0.2;0.75" dur="5s" repeatCount="indefinite" />
    </circle>
    <circle cx="78"  cy="212" r="4"   fill="#2dd4bf" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="188" cy="58" r="3.5"  fill="#818cf8" opacity="0.65">
      <animate attributeName="opacity" values="0.65;0.1;0.65" dur="6s" repeatCount="indefinite" />
    </circle>
    <circle cx="62"  cy="152" r="3"   fill="#a78bfa" opacity="0.55">
      <animate attributeName="opacity" values="0.55;0.1;0.55" dur="4.8s" repeatCount="indefinite" />
    </circle>

    {/* ── Neural-network connection lines ── */}
    <line x1="160" y1="160" x2="224" y2="96"  stroke="#7c6ff7" strokeWidth="0.8" opacity="0.25" />
    <line x1="160" y1="160" x2="90"  y2="87"  stroke="#2dd4bf" strokeWidth="0.8" opacity="0.2" />
    <line x1="160" y1="160" x2="238" y2="208" stroke="#c4b5fd" strokeWidth="0.8" opacity="0.2" />
    <line x1="160" y1="160" x2="78"  y2="212" stroke="#2dd4bf" strokeWidth="0.8" opacity="0.2" />
    <line x1="160" y1="160" x2="188" y2="58"  stroke="#818cf8" strokeWidth="0.8" opacity="0.18" />
    <line x1="160" y1="160" x2="62"  y2="152" stroke="#a78bfa" strokeWidth="0.8" opacity="0.18" />
  </svg>
);

/* ── Feature icons ── */
const IconHeart = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 30S5 23 5 13.5A8.5 8.5 0 0 1 18 8a8.5 8.5 0 0 1 13 5.5C31 23 18 30 18 30z"
      fill="none" stroke="url(#hg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="hg" x1="0" y1="0" x2="36" y2="36">
        <stop stopColor="#a78bfa" /><stop offset="1" stopColor="#2dd4bf" />
      </linearGradient>
    </defs>
  </svg>
);

const IconBrain = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="13" cy="18" rx="8" ry="10" fill="none" stroke="url(#bg)" strokeWidth="2" />
    <ellipse cx="23" cy="18" rx="8" ry="10" fill="none" stroke="url(#bg)" strokeWidth="2" />
    <line x1="18" y1="8" x2="18" y2="28" stroke="url(#bg)" strokeWidth="1.5" />
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="36" y2="36">
        <stop stopColor="#a78bfa" /><stop offset="1" stopColor="#2dd4bf" />
      </linearGradient>
    </defs>
  </svg>
);

const IconShield = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 3L5 9v8c0 7.4 5.5 14.3 13 16 7.5-1.7 13-8.6 13-16V9L18 3z"
      fill="none" stroke="url(#sg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 18l4 4 8-8" stroke="url(#sg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="sg" x1="0" y1="0" x2="36" y2="36">
        <stop stopColor="#a78bfa" /><stop offset="1" stopColor="#2dd4bf" />
      </linearGradient>
    </defs>
  </svg>
);

/* ── Floating background particle ── */
const Particle = ({ className, style }: { className: string; style: React.CSSProperties }) => (
  <div className={`absolute rounded-full pointer-events-none ${className}`} style={style} />
);

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.replace("/chat");
  }, [router]);

  return (
    <>
      <Head>
        <title>Sofia — AI психолог</title>
        <meta name="description" content="Профессиональная психологическая поддержка 24/7" />
      </Head>

      <main
        className="min-h-screen flex flex-col relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 20% 45%, rgba(124,111,247,0.18) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 80% 15%, rgba(45,212,191,0.12) 0%, transparent 50%)," +
            "radial-gradient(ellipse at 60% 80%, rgba(124,111,247,0.1) 0%, transparent 45%)," +
            "#080c14",
        }}
      >
        {/* ── Floating particles ── */}
        <Particle className="w-2 h-2 bg-violet-400/35 animate-particle-1"   style={{ top: "18%",  left: "12%" }} />
        <Particle className="w-1.5 h-1.5 bg-teal-400/30 animate-particle-2"   style={{ top: "62%",  left: "82%" }} />
        <Particle className="w-1 h-1 bg-violet-300/45 animate-particle-3"   style={{ top: "38%",  left: "72%" }} />
        <Particle className="w-2.5 h-2.5 bg-teal-300/25 animate-particle-4"   style={{ top: "75%",  left: "22%" }} />
        <Particle className="w-1 h-1 bg-violet-500/30 animate-particle-5"   style={{ top: "28%",  left: "55%" }} />
        <Particle className="w-1.5 h-1.5 bg-teal-400/20 animate-particle-1"   style={{ top: "88%",  left: "48%" }} />
        <Particle className="w-1 h-1 bg-violet-300/35 animate-particle-3"   style={{ top: "50%",  left: "5%"  }} />

        {/* ── Header ── */}
        <header className="flex justify-between items-center px-8 py-6 max-w-5xl mx-auto w-full animate-slide-up">
          {/* Logo */}
          <div className="flex items-center gap-2.5 text-xl font-semibold text-white">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="28" y2="28">
                  <stop stopColor="#a78bfa" /><stop offset="1" stopColor="#2dd4bf" />
                </linearGradient>
              </defs>
              <circle cx="14" cy="14" r="13" stroke="url(#logoGrad)" strokeWidth="1.5" />
              <circle cx="14" cy="10" r="4.5" fill="url(#logoGrad)" opacity="0.9" />
              <path d="M6 23c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="url(#logoGrad)" opacity="0.8" />
            </svg>
            <span className="gradient-text">Sofia</span>
          </div>

          {/* Nav */}
          <div className="flex gap-3 items-center">
            <a
              href="/login"
              className="text-sm text-slate-400 hover:text-white px-4 py-2 transition-colors"
            >
              Войти
            </a>
            <a
              href="/register"
              className="text-sm btn-shimmer px-5 py-2 rounded-full font-medium shadow-lg shadow-violet-900/30"
            >
              Начать
            </a>
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
          {/* 3-D Orb */}
          <div className="mb-8 animate-float" style={{ animationDelay: "0.2s" }}>
            <HeroOrb />
          </div>

          {/* Heading */}
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Психологическая поддержка<br />
            <span className="gradient-text">в любое время</span>
          </h1>

          {/* Sub */}
          <p
            className="text-lg text-slate-400 mb-10 max-w-lg animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Sofia — ваш личный AI-психолог. Помогает разобраться в чувствах, справиться со стрессом и найти ресурс для жизни.
          </p>

          {/* CTA */}
          <a
            href="/register"
            className="btn-shimmer text-base font-semibold px-12 py-4 rounded-full shadow-xl shadow-violet-900/40 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            Попробовать бесплатно
          </a>
          <p
            className="text-sm text-slate-600 mt-4 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            10 сообщений в день бесплатно
          </p>
        </section>

        {/* ── Feature cards ── */}
        <section
          className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto px-8 pb-20 animate-slide-up"
          style={{ animationDelay: "0.5s" }}
        >
          {[
            { icon: <IconHeart />, title: "Без осуждения",     desc: "Безопасное пространство для любых тем" },
            { icon: <IconBrain />, title: "Научный подход",    desc: "КПТ, ACT и mindfulness техники" },
            { icon: <IconShield />, title: "Конфиденциально", desc: "Ваши данные защищены и зашифрованы" },
          ].map((f) => (
            <div
              key={f.title}
              className="glass tilt-card rounded-2xl p-6 text-center"
            >
              <div className="flex justify-center mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-slate-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
