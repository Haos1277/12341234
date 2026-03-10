import Head from "next/head";
import { useRouter } from "next/router";

export default function Subscribe() {
  const router = useRouter();

  return (
    <>
      <Head><title>Подписка — Sofia</title></Head>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <button onClick={() => router.back()} className="text-purple-400 hover:text-purple-600 text-sm mb-6 inline-block">
              ← Назад
            </button>
            <div className="text-4xl mb-3">✨</div>
            <h1 className="text-2xl font-bold text-gray-800">Pro подписка</h1>
            <p className="text-gray-400 text-sm mt-2">Безлимитное общение с Sofia</p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-8 mb-4">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-gray-800">490 ₽</div>
              <div className="text-gray-400 text-sm">в месяц</div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "Безлимитные сообщения",
                "Долгосрочная память — Sofia помнит вас",
                "Приоритетные ответы",
                "История чата за всё время",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="text-purple-400">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl text-sm font-medium transition-colors">
              Оформить через ЮKassa
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-purple-100 p-6">
            <div className="text-center text-sm text-gray-500 mb-4">Бесплатный план</div>
            <ul className="space-y-2 mb-4">
              {["10 сообщений в день", "Базовая память сессии"].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-gray-500">
                  <span className="text-gray-300">✓</span>
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
