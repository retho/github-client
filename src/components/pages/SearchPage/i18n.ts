import {LocaleLang} from 'constants/locale';

export default {
  [LocaleLang.en]: {
    resultsFound: (count: number) => `${count} results found`,
  },
  [LocaleLang.ru]: {
    resultsFound: (count: number) => `${count} совпадений найдено`,
  },
};
