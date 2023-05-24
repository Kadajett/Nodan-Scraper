# Scraper Library

A flexible and powerful library for web scraping.

## Installation

Install the package using npm: 
`npm install nodan-scraper`

## Usage

### Importing the Library

You can import the library into your project using the following import statements:

```javascript
// Importing the class variant
import Scraper from 'nodan-scraper';

// Importing the manual function call
import { performScraping, CustomLogger } from 'nodan-scraper';
```

Using the Class Variant
The class variant allows you to perform web scraping by creating an instance of the Scraper class and configuring it with the required callbacks.

```javascript
// Create an instance of the Scraper class
const scraper = new Scraper();

// Set the URLs to be scraped
scraper.setUrls(['https://example.com/page1', 'https://example.com/page2']);

// Set the scrape callback function
scraper.setScrapeCallback(($) => {
  // Perform scraping logic and return the scraped data
});

// Set the data handling callback function
scraper.setDataHandlingCallback((data) => {
  // Perform data handling and return the processed data
});

// Set the concurrency (optional, default is 5)
scraper.setConcurrency(10);

// Set the onComplete callback function
scraper.setOnComplete((data) => {
  // Handle the scraped data after completion
});

// Execute the scraping process
scraper.executeScraping()
  .then(() => {
    console.log('Scraping completed!');
  })
  .catch((error) => {
    console.error('Error occurred during scraping:', error);
  });
```

Using the Manual Function Call
You can also directly call the performScraping function to perform web scraping without using the class variant.

```javascript
// Set the URLs to be scraped
const urls = ['https://example.com/page1', 'https://example.com/page2'];

// Set the scrape callback function
const scrapeCallback = ($) => {
  // Perform scraping logic and return the scraped data
};

// Set the data handling callback function
const dataHandlingCallback = (data) => {
  // Perform data handling and return the processed data
};

// Set the concurrency (optional, default is 5)
const concurrency = 10;

// Set the onComplete callback function
const onComplete = (data) => {
  // Handle the scraped data after completion
};

// Execute the scraping process
performScraping(urls, concurrency, scrapeCallback, dataHandlingCallback, onComplete)
  .then(() => {
    console.log('Scraping completed!');
  })
  .catch((error) => {
    console.error('Error occurred during scraping:', error);
  });
```
Custom Logger
The library supports customizable logging using the CustomLogger class. You can create an instance of the CustomLogger class and pass it as an additional parameter to the performScraping function or set it in the Scraper class.

```javascript
import { performScraping, CustomLogger } from 'scraper-library';

// Create a custom logger instance
const logger = new CustomLogger();

// Set the log level (optional, default is 'info')
logger.setLogLevel('debug');

// Set the logger instance in the Scraper class
scraper.setLogger(logger);

// Execute the scraping process with custom logging
performScraping(urls, concurrency, scrapeCallback, dataHandlingCallback, onComplete, 'debug', logger);
```
## API Documentation
### Scraper Class
`constructor(concurrency?: number)`
- Creates an instance of the Scraper class.
- The concurrency parameter is optional and sets the maximum number of concurrent requests (default is 5).

`setUrls(urls: string[]): void`
- Sets the URLs to be scraped.
- Accepts an array of URLs as the urls parameter.

`setScrapeCallback(scrapeCallback: ScrapeCallback): void`
- Sets the scrape callback function.
- The scrapeCallback function is called for each URL to perform the scraping logic.

`setDataHandlingCallback<T>(dataHandlingCallback: DataHandlingCallback<T>): void`
- Sets the data handling callback function.
- The dataHandlingCallback function is called to handle the scraped data and return the processed data.

`setConcurrency(concurrency: number): void`
- Sets the concurrency, which determines the maximum number of concurrent requests.

`setOnComplete<T>(onComplete: OnComplete<T>): void`
- Sets the onComplete callback function.
- The onComplete function is called when the scraping process is completed.

`setLogger(logger: CustomLogger): void`
- Sets the logger instance for custom logging.

`executeScraping(): Promise<void>`
- Executes the web scraping process based on the configured settings.

performScraping Function
```javascript

performScraping<T>(
  urls: string[],
  concurrency: number,
  scrapeCallback: ScrapeCallback,
  dataHandlingCallback: DataHandlingCallback<T>,
  onComplete: OnComplete<T>,
  logLevel?: 'debug' | 'info' | 'error',
  logger?: CustomLogger
): Promise<void>
```
- Executes the web scraping process with the provided parameters.
- The urls parameter is an array of URLs to be scraped.
- The concurrency parameter sets the maximum number of concurrent requests.
- The scrapeCallback function is called for each URL to perform the scraping logic.
- The dataHandlingCallback function is called to handle the scraped data and return the processed data.
- The onComplete function is called when the scraping process is completed.
- The logLevel parameter is optional and sets the log level for custom logging (default is 'info').
- The logger parameter is optional and is used for custom logging with the CustomLogger class.

## License
MIT License
