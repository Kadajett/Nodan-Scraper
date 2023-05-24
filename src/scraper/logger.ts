// Logger.ts

export type LogLevel = 'debug' | 'info' | 'error' | 'none';

export type CustomLogger = {
  debug: (message: string) => void;
  info: (message: string) => void;
  error: (message: string) => void;
};

class Logger {
  constructor(private level: LogLevel = 'info', private customLogger: CustomLogger | null = null) {}

  debug(message: string): void {
    if (['debug'].includes(this.level)) {
      if (this.customLogger) {
        this.customLogger.debug?.(message);
        return;
      }
      console.log(`[DEBUG] ${message}`);
    }
  }

  info(message: string): void {
    if (['debug', 'info'].includes(this.level)) {
      if (this.customLogger) {
        this.customLogger.info?.(message);
        return;
      }
      console.info(`[INFO] ${message}`);
    }
  }

  /**
   * @param {string} message
   * @returns {void}
   * @memberof Logger
   * @description
   * Logs an error message to the console.
   * If the log level is set to 'none', no message will be logged.
   * If the log level is set to 'error', only error messages will be logged.
   * If the log level is set to 'info', only error and info messages will be logged.
   * If the log level is set to 'debug', all messages will be logged.
   **/
  error(message: string): void {
    if (['debug', 'info', 'error'].includes(this.level)) {
      if (this.customLogger) {
        this.customLogger.error?.(message);
        return;
      }
      console.error(`[ERROR] ${message}`);
    }
  }

  getLevel(): LogLevel {
    return this.level;
  }

  setLevel(level: LogLevel): void {
    this.level = level;
  }

  logsDisabled(): boolean {
    return this.level === 'none';
  }

  logsEnabled(): boolean {
    return this.level !== 'none';
  }
}

export default Logger;
