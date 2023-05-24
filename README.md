# Nodan Scraper

The scraper for the modern web.

Nodan Scraper is a highly flexible, efficient, and easy-to-use web scraping library built for Node.js. With its configurable concurrency support and callback-based design, Nodan Scraper lets you extract data from websites with control and precision.

## Features

- **Easy to use:** With just a few lines of code, you can start scraping websites.
- **Flexible:** Bring your own scraping and data handling functions.
- **Efficient:** Adjustable concurrency for faster data gathering.
- **Progress updates:** Get real-time updates on the scraping progress.
- **Error handling:** Easily handle and debug errors.

## Installation

```bash
npm install nodan-scraper
```

Basic Usage
Here's a basic example of how to use Nodan Scraper.

```js
import executeScraping from 'nodan-scraper';
import fs from 'fs';

// Define the scraping function
const scrapeCallback = ($) => {
  // Scrape data using Cheerio ($)
};

// Define the data handling function
const dataHandlingCallback = (data) => {
  fs.writeFile('output.json', JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
    console.log('Data saved to output.json');
  });
};

// List of URLs to scrape
const urls = ['http://example.com/page1', 'http://example.com/page2'];

// Execute scraping
executeScraping(urls, scrapeCallback, dataHandlingCallback);
```
API
executeScraping(urls, scrapeCallback, dataHandlingCallback, [concurrency])
urls (string[]): The URLs to scrape.
scrapeCallback (Function): The function to scrape data from each page. This function is given a Cheerio instance and should return the scraped data.
dataHandlingCallback (Function): The function to handle the scraped data. This function is called each time the number of scraped data reaches the concurrency limit or all URLs have been scraped.
concurrency (number, optional): The number of simultaneous requests. Default is 5.
Contributing
We appreciate all contributions. Please feel free to fork and submit pull requests, or open issues to suggest changes or report bugs.

License
MIT
