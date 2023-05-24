import { CheerioAPI } from 'cheerio';

export type ScrapeCallback = (cheerio: CheerioAPI) => unknown;
/**
 * @param data - An array of data returned from the scrapeCallback
 * @description User defined function to handle the data returned from the scrapeCallback. Return parsed data if you want to change the data structure in the output.
 */
export type DataHandlingCallback<T> = (data: unknown[]) => T;

/**
 * @param data - The complete array of data returned from the DataHandlingCallback function.
 * @description User defined function to handle the final data returned from the DataHandlingCallback. This function is called once all the scraping has been completed.
 */
export type OnComplete<T> = (data: T[]) => void;
