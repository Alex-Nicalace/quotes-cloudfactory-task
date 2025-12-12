import { makeAutoObservable, runInAction } from 'mobx';
import { getTickers } from '../services/apiTickers';
import { Ticker } from '../services/schemas/apiTickers';

class QuotesStore {
  // свойства который в конструкторе делаются наблюдаемыми
  quotes: Ticker[] = [];
  isLoading = false;
  errorMessage = '';

  constructor() {
    // делает свойства (quotes, isLoading, errorMessage) наблюдаемыми
    makeAutoObservable(this);
  }

  // методы автоматически помечаются как action
  fetchQuotes = async () => {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      const data = await getTickers();
      runInAction(() => {
        this.quotes = data || [];
        this.isLoading = false;
      });
    } catch (e: any) {
      runInAction(() => {
        this.errorMessage = e.message;
        this.isLoading = false;
      });
    }
  };
}

// создаём singleton экземпляр, который будем использовать в компонентах
export const quotesStore = new QuotesStore();
