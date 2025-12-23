from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Database
    MONGO_URI: str
    
    # JWT Authentication
    JWT_SECRET: str = "your-secret-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours
    
    # Email Settings (for password reset)
    EMAIL_HOST: str = "smtp.gmail.com"
    EMAIL_PORT: int = 587
    EMAIL_USERNAME: str = ""
    EMAIL_PASSWORD: str = ""
    EMAIL_FROM: str = "noreply@library.com"
    
    # Pagination
    DEFAULT_PAGE_SIZE: int = 20
    MAX_PAGE_SIZE: int = 100
    
    # Fine Calculation
    FINE_PER_DAY: float = 5.0  # Fine amount per day overdue
    MAX_BOOKS_PER_MEMBER: int = 5
    LOAN_PERIOD_DAYS: int = 14
    
    # AI Settings (optional)
    OPENAI_API_KEY: str = ""
    
    class Config:
        env_file = ".env"

settings = Settings()
