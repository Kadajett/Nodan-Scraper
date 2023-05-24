import axios from 'axios';
import bbPromise from 'bluebird';
import { load } from 'cheerio';
import readline from 'readline';
import type { DataHandlingCallback, OnComplete, ScrapeCallback } from '~/types';
import type { CustomLogger, LogLevel } from './logger';
import Logger from './logger';
import ScraperError from './scraperError';

export const getScrapedData = async (
  url: string,
  total: number,
  completed: number,
  currentRequests: string[],
  errors: ScraperError[],
  scrapeCallback: ScrapeCallback,
  logger: Logger,
): Promise<unknown> => {
  try {
    currentRequests.push(url);
    const response = await axios.get(url);
    const $ = load(response.data);

    const data = scrapeCallback($);
    const requestIndex = currentRequests.indexOf(url);
    if (requestIndex > -1) {
      currentRequests.splice(requestIndex, 1);
    }

    logger.info(`Data successfully scraped from ${url}`);
    return data;
  } catch (error: any) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const scraperError = new ScraperError(message, url, logger);
    errors.push(scraperError);
    const requestIndex = currentRequests.indexOf(url);
    if (requestIndex > -1) {
      currentRequests.splice(requestIndex, 1);
    }
    logger.error(`Error while scraping from ${url}`);
    return null;
  } finally {
    completed++;
    updateProgress(completed, total, currentRequests, errors, logger);
  }
};

export const updateProgress = (
  completed: number,
  total: number,
  currentRequests: string[],
  errors: ScraperError[],
  logger: Logger,
): void => {
  logger.debug('Updating progress');
  if (logger.logsEnabled()) {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearLine(process.stdout, 0);
  }

  logger.error(`Errors: ${errors.length}`);

  if (logger.logsEnabled()) {
    readline.cursorTo(process.stdout, 0, 1);
    readline.clearLine(process.stdout, 0);
  }
  logger.info('Current Requests:');
  for (let i = 0; i < 5; i++) {
    if (logger.logsEnabled()) {
      readline.cursorTo(process.stdout, 0, 2 + i);
      readline.clearLine(process.stdout, 0);
    }
    if (currentRequests[i]) {
      logger.info(currentRequests[i]);
    } else {
      logger.debug('empty');
    }
  }

  const progress = Math.floor((completed / total) * 100);
  const progressBar = '='.repeat(progress / 2) + '_'.repeat(50 - progress / 2);

  if (logger.logsEnabled()) {
    readline.cursorTo(process.stdout, 0, 7);
    readline.clearLine(process.stdout, 0);
  }

  logger.info(`Total Progress: ${progressBar} ${progress}%`);

  if (logger.logsEnabled()) {
    readline.cursorTo(process.stdout, 0, 9);
    readline.clearLine(process.stdout, 0);
  }
  logger.info(`Data successfully saved for requests up to ${completed}`);
};

export const performScraping = async <T>(
  urls: string[],
  concurrency: number,
  scrapeCallback: ScrapeCallback,
  dataHandlingCallback: DataHandlingCallback<T>,
  onComplete: OnComplete<T>,
  logLevel: LogLevel = 'info',
  customLogger?: CustomLogger,
): Promise<void> => {
  const logger = new Logger(logLevel, customLogger);

  let completed = 0;
  const collectedData: unknown[] = [];
  const allCollectedData: T[] = [];
  const currentRequests: string[] = [];
  const errors: ScraperError[] = [];

  const total = urls.length;

  await bbPromise
    .map(
      urls,
      async (url, index) => {
        const data = await getScrapedData(url, total, completed, currentRequests, errors, scrapeCallback, logger);

        completed++;
        collectedData.push(data);

        if (collectedData.length >= 5 || index === urls.length - 1) {
          const output = dataHandlingCallback(collectedData);
          if (output?.toString) {
            logger.info(output.toString());
          }
          allCollectedData.push(output);
          collectedData.length = 0;
        }
      },
      { concurrency },
    )
    .finally(() => {
      if (collectedData.length > 0) {
        const output = dataHandlingCallback(collectedData);
        if (output?.toString) {
          logger.info(output.toString());
        }
        allCollectedData.push(output);
      }
      onComplete(allCollectedData);
    });
};
