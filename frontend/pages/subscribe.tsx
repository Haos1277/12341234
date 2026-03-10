import Head from "next/head";
import { useRouter } from "next/router";

const bgStyle = {
  background:
    "radial-gradient(ellipse at 30% 40%, rgba(124,111,247,0.18) 0%, transparent 55%)," +
    "radial-gradient(ellipse at 75% 70%, rgba(45,212,191,0.1) 0%, transparent 50%)," +
    "#080c14",
};

export default function Subscribe() {
  const router = useRouter();

  return (
    <>
      <Head><title>Подписка — Sofia</title></Head>

      <div className="min-h-screen flex items-center justify-center px-4" style={bgStyle}>
        <div className="max-w-md w-full animate-slide-up">

          {/* Back */}
          <button
            onClick={() => router.back()}
            className="text-slate-500 hover:text-slate-300 text-sm mb-6 inline-flex items-center gap-1 transition-colors"
          >
            ← Назад
          </button>

          {/* Title */}
          <div className="text-center mb-6">
            <div
              className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl"
              style={{ background: "linear-gradient(135deg, #7c6ff7, #2dd4bf)" }}
            >
              ✦
            </div>
            <h1 className="text-2xl font-bold text-white">Pro подписка</h1>
            <p className="text-slate-400 text-sm mt-1">Безлимитное общение с Sofia</p>
          </div>

          {/* Pro card */}
          <div
            className="rounded-3xl p-8 mb-4"
            style={{
              background: "rgba(124,111,247,0.08)",
              border: "1px solid rgba(124,111,247,0.25)",
              boxShadow: "0 0 40px rgba(124,111,247,0.1)",
            }}
          >
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-white">490 ₽</div>
              <div className="text-slate-400 text-sm">в месяц</div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "Безлимитные сообщения",
                "Долгосрочная память — Sofia помнит вас",
                "Приоритетные ответы",
                "История чата за всё время",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="gradient-text font-bold">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button className="w-full btn-shimmer py-3 rounded-xl text-sm font-medium shadow-lg shadow-violet-900/30">
              Оформить через ЮKassa
            </button>
          </div>

          {/* Free plan */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="text-center text-sm text-slate-500 mb-4">Бесплатный план</div>
            <ul className="space-y-2">
              {["10 сообщений в день", "Базовая память сессии"].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-600">
                  <span className="text-slate-700">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
