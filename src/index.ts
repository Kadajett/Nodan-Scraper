import axios from 'axios';
import bbPromise from 'bluebird';
import chalk from 'chalk';
import { CheerioAPI, load } from 'cheerio';
import readline from 'readline';

export type ScrapeCallback = (cheerio: CheerioAPI) => unknown;
export type DataHandlingCallback = (data: unknown[]) => void;
export type onComplete = (data: unknown[]) => void;

const getScrapedData = async (url: string, total: number, scrapeCallback: ScrapeCallback): Promise<unknown> => {
  let completed = 0;
  const currentRequests: string[] = [];
  const errors: Error[] = [];

  currentRequests.push(url);
  updateProgress(completed, total, currentRequests, errors);

  try {
    const response = await axios.get(url);
    const $ = load(response.data);

    const data = scrapeCallback($);

    completed++;
    const requestIndex = currentRequests.indexOf(url);
    if (requestIndex > -1) {
      currentRequests.splice(requestIndex, 1);
    }
    updateProgress(completed, total, currentRequests, errors);

    return data;
  } catch (error) {
    console.error(chalk.red(error));
    errors.push(error as Error);
    const requestIndex = currentRequests.indexOf(url);
    if (requestIndex > -1) {
      currentRequests.splice(requestIndex, 1);
    }
    updateProgress(completed, total, currentRequests, errors);
    return null;
  }
};

const updateProgress = (completed: number, total: number, currentRequests: string[], errors: Error[]): void => {
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearLine(process.stdout, 0);
  console.log(chalk.red('Errors: ', errors.length));

  readline.cursorTo(process.stdout, 0, 1);
  readline.clearLine(process.stdout, 0);
  console.log(chalk.cyan('Current Requests:'));
  for (let i = 0; i < 5; i++) {
    readline.cursorTo(process.stdout, 0, 2 + i);
    readline.clearLine(process.stdout, 0);
    if (currentRequests[i]) {
      console.log(chalk.yellow(currentRequests[i]));
    } else {
      console.log(chalk.grey('empty'));
    }
  }

  const progress = Math.floor((completed / total) * 100);
  const progressBar = chalk.green('='.repeat(progress / 2)) + chalk.white('_'.repeat(50 - progress / 2));

  readline.cursorTo(process.stdout, 0, 7);
  readline.clearLine(process.stdout, 0);
  console.log(chalk.cyan('Total Progress:'), progressBar, chalk.green(`${progress}%`));

  readline.cursorTo(process.stdout, 0, 9);
  readline.clearLine(process.stdout, 0);
  console.log(chalk.cyan('Data successfully saved for requests up to', chalk.green(completed)));
};

const executeScraping = (
  urls: string[],
  scrapeCallback: ScrapeCallback,
  dataHandlingCallback: DataHandlingCallback,
  onComplete: onComplete,
  concurrency = 5,
): void => {
  const completed = 0;
  const collectedData: unknown[] = [];

  const total = urls.length;

  bbPromise
    .map(
      urls,
      async (url, index) => {
        const data = await getScrapedData(url, total, scrapeCallback);
        collectedData.push(data);

        if (collectedData.length >= 5 || index === urls.length - 1) {
          dataHandlingCallback(collectedData);
          collectedData.length = 0;
        }
      },
      {
        concurrency: concurrency,
      },
    )
    .finally(() => {
      console.log(chalk.green('All requests have been made'));
      if (collectedData.length > 0) {
        dataHandlingCallback(collectedData);
        onComplete(collectedData);
      }
    });
};

export { executeScraping };

export default executeScraping;
