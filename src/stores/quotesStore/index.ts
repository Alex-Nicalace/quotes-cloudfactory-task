import { makeAutoObservable, runInAction } from 'mobx';
import { getTickers } from '../../services/apiTickers';
import { makeHashTickers } from './makeHashTickers';
import { HashTickers } from './types';

class QuotesStore {
  hashQuotes: HashTickers = {};
  isLoading = false;
  errorMessage = '';
  timeout: null | ReturnType<typeof setInterval> = null;
  controller: AbortController | null = null;

  constructor() {
    makeAutoObservable(this, {
      timeout: false,
      controller: false,
    });
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
    console.log('start');
    if (this.timeout) return;

    const tick = async () => {
      try {
        await this.fetchQuotes();
      } finally {
        this.timeout = setTimeout(tick, 5000);
      }
    };

    tick();
  };

  stopLoadingTimer = () => {
    console.log('stop');
    this.controller?.abort();
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  };
}

export const quotesStore = new QuotesStore();
