# Import dependencies
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scraping

# Create an instance of Flask
app = Flask(__name__)

# PyMongo Connection
mongo = PyMongo(app, uri = 'mongodb://localhost:27017/sapiens_app')

# index.html
@app.route('/')
def home():
    summary = mongo.db.collection.find_one()
    return render_template('index.html', summary = summary)

# Scraping page
@app.route('/scrape')
def scrape():
    sapiens_data = scraping.scrape_info()
    mongo.db.collection.update({}, sapiens_data, upsert = True)
    return redirect('/')

if __name__ == '__main__':
    app.run(debug = True)