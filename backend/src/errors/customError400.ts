import { i18n, i18nExists } from '../i18n';

export default class CustomError400 extends Error {
  code: Number;

  constructor(language?, messageCode?, ...args) {
    let message;

    if (messageCode) {
      message =  messageCode ;
    }

    message =
      message ||
      i18n(language, 'errors.validation.message');

    super(message);
    this.code = 400;
  }
}
