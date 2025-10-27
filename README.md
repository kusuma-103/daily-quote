# Daily Quote Generator

A full-stack web application built with Flask and SQLite that displays random inspirational quotes and allows users to add new quotes.

## Features

- **Random Quote Display**: Shows a random inspirational quote on the homepage
- **New Random Quote**: Button to refresh with another random quote
- **Add New Quotes**: Form to add new quotes with validation
- **Clean Interface**: Modern, responsive design
- **Database Management**: SQLite database with pre-populated sample quotes

## Installation & Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the application:**
   ```bash
   python app.py
   ```

3. **Access the application:**
   Open your browser and go to `http://localhost:5000`

## Project Structure

```
quote_generator/
├── app.py                 # Main Flask application
├── database.py           # Database operations
├── init_db.py            # Optional database initialization script
├── requirements.txt      # Python dependencies
├── templates/            # HTML templates
│   ├── base.html        # Base template
│   ├── index.html       # Homepage template
│   └── add_quote.html   # Add quote form template
└── static/
    └── style.css        # CSS styles
```

## Usage

1. **View Random Quotes**: Visit the homepage to see a random quote
2. **Get New Quote**: Click "New Random Quote" to see another random quote
3. **Add Quotes**: Click "Add Quote" to add your own inspirational quotes
4. **Form Validation**: Both quote text and author fields are required

## Database Schema

The application uses a SQLite database with the following schema:

```sql
quotes table:
- id (integer, primary key)
- quote_text (text, not null)
- author (text, not null)
- created_at (datetime, default current timestamp)
```

## Sample Quotes

The database comes pre-populated with 10 inspirational quotes from famous personalities including Steve Jobs, Albert Einstein, Winston Churchill, and more.

## Technical Details

- **Backend**: Flask (Python web framework)
- **Database**: SQLite
- **Frontend**: HTML templates with CSS
- **Styling**: Modern, responsive design with gradient background
- **Validation**: Client and server-side form validation
- **Error Handling**: Graceful handling of empty database and form errors

## Development

The application runs in debug mode by default. To run in production:

1. Set `debug=False` in `app.py`
2. Change the secret key to a secure random string
3. Use a production WSGI server like Gunicorn

## License

This project is open source and available under the MIT License.

