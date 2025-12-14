import { makeAutoObservable, runInAction } from 'mobx';
import { getTickers } from '../../services/apiTickers';
import { makeHashTickers } from './makeHashTickers';
import { HashTickers } from './types';

class QuotesStore {
  hashQuotes: HashTickers = {};
  isLoading = false;
  errorMessage = '';
  loadingTimer: null | ReturnType<typeof setInterval> = null;
  controller: AbortController | null = null;

  constructor() {
    makeAutoObservable(this, { loadingTimer: false, controller: false });
  }

  get quotes() {
    return Object.entries(this.hashQuotes).map(([symbol, fields]) => ({
      symbol,
      ...fields,
    }));
  }

  fetchQuotes = async () => {
    this.controller?.abort();
    this.controller = new AbortController();
    this.isLoading = true;
    this.errorMessage = '';
    try {
      const data = await getTickers({ signal: this.controller.signal });
      runInAction(() => {
        this.hashQuotes = makeHashTickers(data || [], this.hashQuotes);
        this.isLoading = false;
      });
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') {
        return;
      }

      runInAction(() => {
        this.errorMessage = e instanceof Error ? e.message : String(e);
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
    this.controller?.abort();
    if (this.loadingTimer) clearInterval(this.loadingTimer);
  };
}

export const quotesStore = new QuotesStore();
