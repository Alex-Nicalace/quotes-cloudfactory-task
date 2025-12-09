import { useEffect, useReducer } from 'react';

type TFetch<T> = {
  responseData: T | null;
  isLoading: boolean;
  errorMessage: string;
};

const fetchReducer = <T>(
  state: TFetch<T | null>,
  action: Partial<TFetch<T | null>>,
) => ({
  ...state,
  ...action,
});

export function useFetch<T>(
  url?: string,
  options?: {
    transformResponseDataFn?: (responseData: unknown) => T;
  },
): TFetch<T | null> {
  const { transformResponseDataFn } = options ?? {};

  const [fetchState, dispatch] = useReducer(fetchReducer, {
    responseData: null as T | null,
    isLoading: !!url,
    errorMessage: '',
  });

  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();

    (async function () {
      dispatch({ isLoading: true, errorMessage: '', responseData: null });

      try {
        const response = await fetch(url!, { signal: controller.signal });
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const responseData = await response.json();
        dispatch({
          responseData: transformResponseDataFn
            ? transformResponseDataFn(responseData)
            : responseData,
          isLoading: false,
        });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error(error.message);
          dispatch({ errorMessage: error.message, isLoading: false });
        }
      }
    })();

    return () => controller.abort();
  }, [url, transformResponseDataFn]);

  return fetchState;
}
