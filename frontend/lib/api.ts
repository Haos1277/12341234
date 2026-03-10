const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function register(email: string, password: string, name?: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Ошибка регистрации");
  }
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Неверный email или пароль");
  }
  return res.json();
}

export async function getProfile() {
  const res = await fetch(`${API_URL}/profile/me`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Не авторизован");
  return res.json();
}

export async function completeOnboarding(name: string, age?: number) {
  const res = await fetch(`${API_URL}/profile/onboarding`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ name, age }),
  });
  if (!res.ok) throw new Error("Ошибка");
  return res.json();
}

export async function getChatHistory() {
  const res = await fetch(`${API_URL}/chat/history`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Ошибка загрузки истории");
  return res.json();
}

export function sendMessageStream(
  message: string,
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (err: string) => void
) {
  const token = getToken();
  fetch(`${API_URL}/chat/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ message }),
  }).then(async (res) => {
    if (!res.ok) {
      const err = await res.json();
      onError(err.detail || "Ошибка отправки");
      return;
    }

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const lines = decoder.decode(value).split("\n");
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6);
        if (data === "[DONE]") {
          onDone();
          return;
        }
        try {
          const parsed = JSON.parse(data);
          if (parsed.text) onChunk(parsed.text);
        } catch {}
      }
    }
    onDone();
  }).catch((e) => onError(e.message));
}
