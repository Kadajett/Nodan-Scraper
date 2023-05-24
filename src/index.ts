import 'module-alias/register';
import Scraper, { performScraping } from '~/scraper';
import type * as scraperTypes from '~/types';

export type { scraperTypes };
export { performScraping };
export default Scraper;
