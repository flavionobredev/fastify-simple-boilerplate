import { format } from 'node:util';

const colorize = {
  red: (text: string) => `\x1b[31m${text}\x1b[0m`,
  green: (text: string) => `\x1b[32m${text}\x1b[0m`,
  blue: (text: string) => `\x1b[34m${text}\x1b[0m`,
  yellow: (text: string) => `\x1b[33m${text}\x1b[0m`,
  magenta: (text: string) => `\x1b[35m${text}\x1b[0m`,
  cyan: (text: string) => `\x1b[36m${text}\x1b[0m`,
  white: (text: string) => `\x1b[37m${text}\x1b[0m`,
};

enum LogLevel {
  DEBUG = 'DEBUG',
  LOG = 'LOG',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

class Logger {
  private static log(
    level: LogLevel,
    message: string,
    context?: string,
    ...args: any[]
  ): void {
    const timestamp = new Date().toLocaleString();
    const formattedMessage = format(message, ...args);
    const contextFmt = context ? colorize.yellow(`[${context}]`) : '';
    const logString = `[${timestamp}]\t${contextFmt} ${formattedMessage}`;

    process.stdout.write(logString + '\n');
  }

  static debug(message: string, context?: string, ...args: any[]) {
    Logger.log(LogLevel.DEBUG, colorize.blue(message), context, ...args);
  }

  static info(message: string, context?: string, ...args: any[]) {
    Logger.log(LogLevel.LOG, colorize.green(message), context, ...args);
  }

  static warn(message: string, context?: string, ...args: any[]) {
    Logger.log(LogLevel.WARN, colorize.yellow(message), context, ...args);
  }

  static error(message: string, context?: string, ...args: any[]) {
    Logger.log(LogLevel.ERROR, colorize.red(message), context, ...args);
  }

  constructor(private context: string) {}

  debug(message: string, ...args: any[]) {
    Logger.debug(message, this.context, ...args);
  }

  info(message: string, ...args: any[]) {
    Logger.info(message, this.context, ...args);
  }

  warn(message: string, ...args: any[]) {
    Logger.warn(message, this.context, ...args);
  }

  error(message: string, ...args: any[]) {
    Logger.error(message, this.context, ...args);
  }
}

export default Logger;
