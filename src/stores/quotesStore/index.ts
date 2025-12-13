import { makeAutoObservable, runInAction } from 'mobx';
import { getTickers } from '../../services/apiTickers';
import { makeHashTickers } from './makeHashTickers';
import { HashTickers } from './types';

class QuotesStore {
  hashQuotes: HashTickers = {};
  isLoading = false;
  errorMessage = '';
  loadingTimer: null | ReturnType<typeof setInterval> = null;

  constructor() {
    makeAutoObservable(this, { loadingTimer: false });
  }

  get quotes() {
    return Object.entries(this.hashQuotes).map(([symbol, fields]) => ({
      symbol,
      ...fields,
    }));
  }

  fetchQuotes = async () => {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      const data = await getTickers();
      runInAction(() => {
        this.hashQuotes = makeHashTickers(data || [], this.hashQuotes);
        this.isLoading = false;
      });
    } catch (e: any) {
      runInAction(() => {
        this.errorMessage = e.message;
        this.isLoading = false;
      });
    }
  };

  startLoadingTimer = () => {
    this.fetchQuotes();
    if (this.loadingTimer) clearInterval(this.loadingTimer);
    this.loadingTimer = setInterval(this.fetchQuotes, 5000);
  };

  stopLoadingTimer = () => {
    if (this.loadingTimer) clearInterval(this.loadingTimer);
    console.log('stop');
  };
}

export const quotesStore = new QuotesStore();
