/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class CustomLoggerService implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    console.log('LOG => ' + message);
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(message: any, ...optionalParams: any[]) {
    console.error('FATAL => ' + message);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    console.error('ERROR => ' + message);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    console.warn('WARN => ' + message);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    console.debug('DEBUG => ' + message);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    console.log('VERBOSE => ' + message);
  }
}
