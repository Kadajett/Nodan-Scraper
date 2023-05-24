import Logger from './logger';

class ScraperError extends Error {
  public url: string;
  public time: Date;

  constructor(message: string, url: string, logger: Logger) {
    super(message);
    this.name = 'ScraperError';
    this.url = url;
    this.time = new Date();

    logger.error(this.getErrorMessage());
  }

  public getErrorMessage(): string {
    return `[${this.time.toISOString()}] Error occurred while scraping ${this.url}: ${this.message}`;
  }
}

export default ScraperError;
