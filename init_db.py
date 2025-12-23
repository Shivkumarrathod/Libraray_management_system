import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

async def test_connection():
    load_dotenv()
    mongo_uri = os.getenv("MONGO_URI")
    print(f"Testing connection to: {mongo_uri[:20]}...")
    
    try:
        client = AsyncIOMotorClient(mongo_uri, serverSelectionTimeoutMS=5000)
        # Try to command ping
        await client.admin.command('ping')
        print("MongoDB connection successful!")
        
        db = client["Library_Management_System"]
        
        # Create Indexes (The Schema for MongoDB)
        print("Creating indexes...")
        
        # User indexes
        await db.users.create_index("email", unique=True)
        print("- User email index created")
        
        # Book indexes
        await db.books.create_index("isbn", unique=True)
        await db.books.create_index([("title", "text"), ("author", "text"), ("category", "text")])
        print("- Book indexes created")
        
        # Transaction indexes
        await db.transactions.create_index("member_id")
        await db.transactions.create_index("book_id")
        print("- Transaction indexes created")
        
        print("Database initialized successfully!")
        
    except Exception as e:
        print("ERROR: Connection failed")
        print(f"Details: {str(e)}")
        print("\nCommon issues:")
        print("1. IP Whitelist: Check MongoDB Atlas -> Network Access (Allow 0.0.0.0/0 for testing)")
        print("2. Password: Ensure '<password>' is replaced with actual password in .env")
        print("3. Special Characters: If your password has @, :, etc., you must URL encode them.")

if __name__ == "__main__":
    asyncio.run(test_connection())
