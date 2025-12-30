
import asyncio
import os
import sys

# Ensure current directory is in sys.path
sys.path.append(os.getcwd())

from dotenv import load_dotenv
from app.cores.database import users_collection
from app.utils.utils import hash_password

async def test_backend():
    print("Loading .env...")
    load_dotenv()
    uri = os.getenv("MONGO_URI")
    print(f"MONGO_URI from env: {uri[:20] if uri else 'None'}...")
    
    # Check settings from config
    from app.cores.config import settings
    print(f"MONGO_URI from settings: {settings.MONGO_URI[:20] if settings.MONGO_URI else 'None'}...")

    print("Testing DB connection...")
    try:
        # Simple find
        user = await users_collection.find_one({"email": "nonexistent@example.com"})
        print("DB Connection OK. Result:", user)
    except Exception as e:
        print(f"DB Error: {e}")
        import traceback
        traceback.print_exc()

    print("Testing Password Hashing...")
    try:
        hashed = hash_password("testpassword")
        print(f"Hashing OK: {hashed[:10]}...")
    except Exception as e:
        print(f"Hashing Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_backend())
