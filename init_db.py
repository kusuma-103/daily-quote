#!/usr/bin/env python3
"""
Optional database initialization script.
This script can be run independently to initialize the database.
"""

from database import init_db

if __name__ == '__main__':
    print("Initializing database...")
    init_db()
    print("Database initialized successfully!")
    print("You can now run the Flask application with: python app.py")

