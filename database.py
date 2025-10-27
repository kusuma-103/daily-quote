import sqlite3
import os
from datetime import datetime
import random

DATABASE = 'quotes.db'

def get_db_connection():
    """Get database connection"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    # Enable datetime parsing
    conn.execute("PRAGMA date_class = 'datetime'")
    return conn

def init_db():
    """Initialize the database with quotes table and sample data"""
    conn = get_db_connection()
    
    # Create quotes table
    conn.execute('''
        CREATE TABLE IF NOT EXISTS quotes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            quote_text TEXT NOT NULL,
            author TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Check if table is empty and add sample quotes
    cursor = conn.execute('SELECT COUNT(*) FROM quotes')
    count = cursor.fetchone()[0]
    
    if count == 0:
        sample_quotes = [
            ("The only way to do great work is to love what you do.", "Steve Jobs"),
            ("Innovation distinguishes between a leader and a follower.", "Steve Jobs"),
            ("Life is what happens to you while you're busy making other plans.", "John Lennon"),
            ("The future belongs to those who believe in the beauty of their dreams.", "Eleanor Roosevelt"),
            ("It is during our darkest moments that we must focus to see the light.", "Aristotle"),
            ("The way to get started is to quit talking and begin doing.", "Walt Disney"),
            ("Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", "Roy T. Bennett"),
            ("Success is not final, failure is not fatal: it is the courage to continue that counts.", "Winston Churchill"),
            ("The only impossible journey is the one you never begin.", "Tony Robbins"),
            ("In the middle of difficulty lies opportunity.", "Albert Einstein")
        ]
        
        conn.executemany(
            'INSERT INTO quotes (quote_text, author) VALUES (?, ?)',
            sample_quotes
        )
    
    conn.commit()
    conn.close()

def get_random_quote():
    """Get a random quote from the database"""
    conn = get_db_connection()
    
    # Get total count of quotes
    cursor = conn.execute('SELECT COUNT(*) FROM quotes')
    count = cursor.fetchone()[0]
    
    if count == 0:
        conn.close()
        return None
    
    # Get random quote
    random_id = random.randint(1, count)
    quote = conn.execute(
        'SELECT * FROM quotes WHERE id = ?', (random_id,)
    ).fetchone()
    
    conn.close()
    return quote

def add_quote(quote_text, author):
    """Add a new quote to the database"""
    conn = get_db_connection()
    conn.execute(
        'INSERT INTO quotes (quote_text, author) VALUES (?, ?)',
        (quote_text, author)
    )
    conn.commit()
    conn.close()

def get_all_quotes():
    """Get all quotes from the database"""
    conn = get_db_connection()
    quotes = conn.execute('SELECT * FROM quotes ORDER BY created_at DESC').fetchall()
    conn.close()
    return quotes

