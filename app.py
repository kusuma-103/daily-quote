from flask import Flask, render_template, request, redirect, url_for, flash
from database import init_db, get_random_quote, add_quote, get_all_quotes
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # Change this in production

# Custom filter for date formatting
@app.template_filter('format_date')
def format_date(date_str):
    """Format date string for display"""
    if isinstance(date_str, str):
        try:
            # Try to parse the date string
            if 'T' in date_str:
                # ISO format with time
                dt = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
            else:
                # Simple date format
                dt = datetime.strptime(date_str, '%Y-%m-%d %H:%M:%S')
            return dt.strftime('%B %d, %Y')
        except:
            # If parsing fails, return the first 10 characters (date part)
            return date_str[:10]
    return str(date_str)

# Initialize database on startup
if not os.path.exists('quotes.db'):
    init_db()

@app.route('/')
def index():
    """Display a random quote on the homepage"""
    quote = get_random_quote()
    return render_template('index.html', quote=quote)

@app.route('/new-quote')
def new_quote():
    """Get a new random quote"""
    quote = get_random_quote()
    return render_template('index.html', quote=quote)

@app.route('/add-quote', methods=['GET', 'POST'])
def add_quote_page():
    """Display form to add new quotes and handle form submission"""
    if request.method == 'POST':
        quote_text = request.form.get('quote_text', '').strip()
        author = request.form.get('author', '').strip()
        
        # Form validation
        if not quote_text or not author:
            flash('Both quote text and author are required!', 'error')
            return render_template('add_quote.html')
        
        # Add quote to database
        try:
            add_quote(quote_text, author)
            flash('Quote added successfully!', 'success')
            return redirect(url_for('add_quote_page'))
        except Exception as e:
            flash('Error adding quote. Please try again.', 'error')
            return render_template('add_quote.html')
    
    return render_template('add_quote.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10000))
    app.run(host='0.0.0.0', port=port)
