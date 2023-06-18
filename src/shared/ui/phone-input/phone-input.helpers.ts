import { RUSSIAN_PHONE_MASK } from './phone-input.constants';

export const formatPhoneNumber = (value: string): string => {
  return [...value].reduce((acc, num) => acc.replace('_', num), RUSSIAN_PHONE_MASK);
};
