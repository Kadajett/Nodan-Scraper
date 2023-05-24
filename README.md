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
import fs from "fs";
import { executeScraping } from "nodan-scraper";

const output = [];

executeScraping(
  [
    "https://www.aonprd.com/FeatDisplay.aspx?ItemName=Champion%20of%20Anarchy",
    "https://www.aonprd.com/FeatDisplay.aspx?ItemName=Champion%20of%20Balance",
    "https://www.aonprd.com/FeatDisplay.aspx?ItemName=Champion%20of%20Freedom",
    "https://www.aonprd.com/FeatDisplay.aspx?ItemName=Champion%20of%20Destruction",
    "https://www.aonprd.com/FeatDisplay.aspx?ItemName=Champion%20of%20Grace",
    "https://www.aonprd.com/FeatDisplay.aspx?ItemName=Champion%20of%20Malevolence",
    "https://www.aonprd.com/FeatDisplay.aspx?ItemName=Champion%20of%20Righteousness",
    "https://www.aonprd.com/FeatDisplay.aspx?ItemName=Champion%20of%20Tranquility",
    "https://www.aonprd.com/FeatDisplay.aspx?ItemName=Champion%20of%20Tyranny",
    "https://www.aonprd.com/FeatDisplay.aspx?ItemName=All%20Gnolls%20Must%20Die",
  ],
  ($) => {
    const links = [];
    $("a").each((i, link) => {
      const href = $(link).attr("href");
      if (href && href !== "javascript:void(0);") {
        links.push(href);
      }
    });
    return links;
  },
  (data) => {
    // Flatten the arrays and then print the length
    const flattenedData = [].concat(...data);

    return flattenedData;
  },
  (data) => {
    // flatten and then remove duplicates
    const flattenedData = [].concat(...data);
    fs.writeFileSync("output.json", JSON.stringify(flattenedData, null, 2));
  }
);

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
