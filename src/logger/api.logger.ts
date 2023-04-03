import pine from 'pine';

const logger = pine();

export class APILogger {
  info(message: string, data?: any) {
    logger.info(`${message}   ${undefined != data ? JSON.stringify(data) : ''}`);
  }

  error(message: string) {
    logger.error(message);
  }
}
