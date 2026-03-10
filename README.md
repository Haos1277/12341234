# 🌸 Sofia — AI Psychology Web App

Веб-приложение психолога для женщин на базе Claude AI.

## Быстрый старт (локально)

### 1. Клонировать и настроить

```bash
cp .env.example .env
# Заполнить ANTHROPIC_API_KEY в .env
```

### 2. Запустить PostgreSQL и Redis

```bash
docker-compose up postgres redis -d
```

### 3. Запустить backend

```bash
cd backend
pip install -r requirements.txt
uvicorn backend.main:app --reload
# → http://localhost:8000
```

### 4. Запустить frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

---

## Полный деплой через Docker

```bash
docker-compose up --build
```

Приложение: http://localhost:3000
API: http://localhost:8000
API docs: http://localhost:8000/docs

---

## Загрузка базы знаний

```bash
# Один файл
python knowledge_base/load.py --file path/to/book.pdf

# Папка с файлами
python knowledge_base/load.py --dir path/to/folder/
```

Поддерживаемые форматы: `.pdf`, `.txt`, `.md`

---

## Структура проекта

```
├── backend/          # FastAPI
│   ├── main.py
│   ├── config.py
│   ├── routers/      # auth, chat, profile
│   ├── core/         # claude, memory, knowledge, security
│   └── db/           # models, crud, database
├── frontend/         # Next.js + TypeScript + Tailwind
│   ├── pages/        # index, login, register, chat, subscribe
│   ├── components/   # ChatWindow, MessageBubble, TypingIndicator
│   └── lib/          # api.ts
├── knowledge_base/   # load.py — скрипт загрузки в ChromaDB
├── docker-compose.yml
└── .env.example
```

---

## Технологии

| | |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | FastAPI, Python 3.11 |
| AI | Claude claude-sonnet-4-6 (Anthropic) |
| БД | PostgreSQL + SQLAlchemy |
| Кэш | Redis |
| Векторная БД | ChromaDB (RAG) |
| Авторизация | JWT |
| Стриминг | Server-Sent Events |
