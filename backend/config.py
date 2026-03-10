from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    anthropic_api_key: str = ""
    database_url: str = "postgresql+asyncpg://psybot:psybot@localhost:5432/psybot"
    redis_url: str = "redis://localhost:6379"
    jwt_secret: str = "change-me-in-production"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 60 * 24 * 30  # 30 days
    yookassa_shop_id: str = ""
    yookassa_secret_key: str = ""
    free_messages_per_day: int = 10

    class Config:
        env_file = ".env"


settings = Settings()
