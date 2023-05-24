import type { DataHandlingCallback, OnComplete, ScrapeCallback } from '~/types';
import { performScraping } from './scraper';

class Scraper<T> {
  private urls: string[];
  private concurrency: number;
  private scrapeCallback: ScrapeCallback | null;
  private dataHandlingCallback: DataHandlingCallback<T> | null;
  private onComplete: OnComplete<T> | null;

  constructor(concurrency = 5) {
    this.urls = [];
    this.concurrency = concurrency;
    this.scrapeCallback = null;
    this.dataHandlingCallback = null;
    this.onComplete = null;
  }

  setUrls(urls: string[]): void {
    this.urls = urls;
  }

  setScrapeCallback(scrapeCallback: ScrapeCallback): void {
    this.scrapeCallback = scrapeCallback;
  }

  setDataHandlingCallback(dataHandlingCallback: DataHandlingCallback<T>): void {
    this.dataHandlingCallback = dataHandlingCallback;
  }

  setConcurrency(concurrency: number): void {
    this.concurrency = concurrency;
  }

  setOnComplete(onComplete: OnComplete<T>): void {
    this.onComplete = onComplete;
  }

  async executeScraping(): Promise<void> {
    if (!this.scrapeCallback || !this.dataHandlingCallback || !this.onComplete) {
      throw new Error('One or more required callbacks are not set.');
    }
    await performScraping(this.urls, this.concurrency, this.scrapeCallback, this.dataHandlingCallback, this.onComplete);
  }
}

export default Scraper;
