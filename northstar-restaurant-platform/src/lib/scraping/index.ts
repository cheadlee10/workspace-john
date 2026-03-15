/**
 * Scraping modules — real restaurant data extraction
 *
 * Used by the pipeline orchestrator to replace placeholder content
 * with actual restaurant menus, logos, and authentic descriptions.
 */

export { scrapeMenu } from './menu-scraper';
export type { ScrapedMenuResult } from './menu-scraper';

export { downloadRealLogo } from './logo-downloader';
export type { LogoDownloadResult, LogoDownloadParams } from './logo-downloader';

export { rewriteMenuDescriptions } from './description-rewriter';
