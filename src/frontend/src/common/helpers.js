import { TAG_SEPARATOR } from '@/common/constants';

export const capitalize = string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const setAuth = store => {
  store.$api.auth.setAuthHeader();
  store.dispatch('Auth/getMe');
  store.commit('Auth/SET_ENTITY', {
    entity: 'isAuthenticated',
    value: true
  });
};

export const createUUIDv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const getTagsArrayFromString = tags =>
  tags.split(TAG_SEPARATOR).filter(t => t);

export const getReadableDate = date => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const day = newDate.getDate();
  return `${day}.${month + 1}.${year}`;
};

export const getTimeAgo = date => {
  if (!date) {
    return '... время не указано ...';
  }
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  function getString(number, pronounce) {
    return `${number} ${pronounce} назад`;
  }
  function getPronounce(number, single, pluralTwoFour, pluralFive) {
    return number === 1
      ? single
      : number > 1 && number < 5
        ? pluralTwoFour
        : pluralFive;
  }
  if (interval > 1) {
    const number = Math.floor(interval);
    const pronounce = getPronounce(number, 'год', 'года', 'лет');
    return getString(number, pronounce);
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    const number = Math.floor(interval);
    const pronounce = getPronounce(number, 'месяц', 'месяца', 'месяцев');
    return getString(number, pronounce);
  }
  interval = seconds / 86400;
  if (interval > 1) {
    const number = Math.floor(interval);
    const pronounce = getPronounce(number, 'день', 'дня', 'дней');
    return getString(number, pronounce);
  }
  interval = seconds / 3600;
  if (interval > 1) {
    const number = Math.floor(interval);
    const pronounce = getPronounce(number, 'час', 'часа', 'часов');
    return getString(number, pronounce);
  }
  interval = seconds / 60;
  if (interval > 1) {
    const number = Math.floor(interval);
    const pronounce = getPronounce(number, 'минуту', 'минуты', 'минут');
    return getString(number, pronounce);
  }
  return 'сейчас';
};
