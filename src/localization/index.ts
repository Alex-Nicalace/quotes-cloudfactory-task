import { getLocales } from 'react-native-localize';
import { isKey } from '../utils/isKey';
import en from './en';
import ru from './ru';

const countryCode = getLocales()[0].countryCode;

const isRu = countryCode?.toLowerCase().startsWith('ru');

const dictionary = isRu ? ru : en;

export function t(token: string): string {
  return isKey(dictionary, token) ? dictionary[token] : token;
}
