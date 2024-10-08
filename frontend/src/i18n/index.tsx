import React from 'react';
import _get from 'lodash/get';
import moment from 'moment';
import { setLocale as setYupLocale } from 'yup';

let currentLanguageCode = '';

const languages: {
  [key: string]: {
    id: string;
    label: string;
    flag: string;
    antd: any;
    dictionary: any;
  };
} = {
  en: {
    id: 'en',
    label: 'En',
    flag: '/images/flags/United-States.png',
    antd: null,
    dictionary: null,
  },
  es: {
    id: 'es',
    label: 'Es',
    flag: '/images/flags/Spain.png',
    antd: null,
    dictionary: null,
  },
  'pt-BR': {
    id: 'pt-BR',
    label: 'Pt',
    flag: '/images/flags/Brazil.png',
    antd: null,
    dictionary: null,
  },
};

export async function init() {
  currentLanguageCode =
    localStorage.getItem('language') || 'en';
  setLanguageCode(currentLanguageCode);

  if (currentLanguageCode === 'en') {
    await initEn();
  }

  if (currentLanguageCode === 'pt-BR') {
    await initPtBr();
  }

  if (currentLanguageCode === 'es') {
    await initEs();
  }
}

async function initPtBr() {
  const language = languages['pt-BR'];

  // @ts-ignore
  const momentLocale = (await import('moment/locale/pt-br'))
    .default;

  // language.antd = (
  //   await import('antd/lib/locale-provider/pt_BR')
  // ).default;

  language.dictionary = (
    await import('src/i18n/pt-BR')
  ).default;

  moment.locale('pt-BR', momentLocale);

  if (language.dictionary.validation) {
    setYupLocale(language.dictionary.validation);
  }

  return language;
}

async function initEs() {
  const language = languages['es'];

  // @ts-ignore
  const momentLocale = (await import('moment/locale/es'))
    .default;

  // language.antd = (
  //   await import('antd/lib/locale-provider/es_ES')
  // ).default;

  language.dictionary = (
    await import('src/i18n/es')
  ).default;

  moment.locale('es', momentLocale);

  if (language.dictionary.validation) {
    setYupLocale(language.dictionary.validation);
  }

  return language;
}

async function initEn() {
  const language = languages['en'];

  language.dictionary = (
    await import('src/i18n/en')
  ).default;

  if (language.dictionary.validation) {
    setYupLocale(language.dictionary.validation);
  }

  return language;
}

function getLanguage() {
  return languages[getLanguageCode()];
}

function format(message, args) {
  if (!message) {
    return null;
  }

  try {
    return message.replace(/{(\d+)}/g, function (
      match,
      number,
    ) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match;
    });
  } catch (error) {
    console.error(message, error);
    throw error;
  }
}

export function getLanguages() {
  return Object.keys(languages).map((language) => {
    return languages[language];
  });
}

export function getAntdLanguage() {
  return getLanguage().antd;
}

export function getLanguageCode() {
  return currentLanguageCode;
}

export function setLanguageCode(arg) {
  if (!languages[arg]) {
    throw new Error(`Invalid language ${arg}.`);
  }

  localStorage.setItem('language', arg);
}

export function i18nExists(key) {
  if (!getLanguage()) {
    return false;
  }

  const message = _get(getLanguage().dictionary, key);
  return Boolean(message);
}

export function i18n(key, ...args) {
  if (!getLanguage()) {
    return key;
  }

  const message = _get(getLanguage().dictionary, key);

  if (!message) {
    return key;
  }

  return format(message, args);
}

export function i18nHtml(key, ...args) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: i18n(key, ...args),
      }}
    />
  );
}
