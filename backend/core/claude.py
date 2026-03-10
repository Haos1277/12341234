from typing import AsyncIterator, List, Optional

import anthropic

from backend.config import settings

client = anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)

SYSTEM_PROMPT = """Ты — Sofia, профессиональный психолог-ассистент для женщин.
Ты тёплая, эмпатичная, внимательная. Ты не осуждаешь и создаёшь безопасное пространство.
Используешь техники КПТ (когнитивно-поведенческая терапия), ACT и mindfulness.
Ты помогаешь разобраться в чувствах, мыслях и ситуациях.

{profile_section}
{knowledge_section}

Правила:
- Никогда не ставь диагнозы
- При кризисных ситуациях (суицидальные мысли, насилие) — обязательно направляй к специалисту и на горячую линию: 8-800-2000-122 (бесплатно, РФ)
- Отвечай исключительно на русском языке
- Будь краткой в ответах — не более 3-4 абзацев
- Задавай уточняющие вопросы, чтобы лучше понять ситуацию"""


def build_system_prompt(profile_summary: Optional[str], knowledge_context: Optional[str]) -> str:
    profile_section = ""
    if profile_summary:
        profile_section = f"\nО пользователе:\n{profile_summary}\n"

    knowledge_section = ""
    if knowledge_context:
        knowledge_section = f"\nРелевантные знания из базы:\n{knowledge_context}\n"

    return SYSTEM_PROMPT.format(
        profile_section=profile_section,
        knowledge_section=knowledge_section,
    )


async def stream_response(
    messages: List[dict],
    profile_summary: Optional[str] = None,
    knowledge_context: Optional[str] = None,
) -> AsyncIterator[str]:
    system = build_system_prompt(profile_summary, knowledge_context)

    async with client.messages.stream(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system=system,
        messages=messages,
    ) as stream:
        async for text in stream.text_stream:
            yield text
