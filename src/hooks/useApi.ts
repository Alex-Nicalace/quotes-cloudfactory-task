import { useCallback, useState } from 'react';

type ApiState<Data> = {
  data: Data | null;
  isLoading: boolean;
  errorMessage: string;
};

type QueryFn<Args extends unknown[], Response> = (
  ...args: Args
) => Promise<Response>;

type CommonOptions<Response, Transformed> = {
  transformDataFn?: (
    newData: Response,
    oldData: Transformed | null,
  ) => Transformed;
};
type Options<Response, Transformed> = {
  initialData?: Transformed | null; // для правильного вывода типа
} & CommonOptions<Response, Transformed>;

type FetchDataExtraOptions<Response, Transformed> = {
  signal?: AbortSignal;
} & CommonOptions<Response, Transformed>;

/**
 * Хук для выполнения запросов к API. Позволяяет контролировать состояние
 * (`isLoading`, `errorMessage`) и трансформировать данные.
 *
 * @param queryFn функция, выполняющая запрос к API
 * @param options дополнительные параметры
 *
 * @returns массив, содержащий состояние (`data`, `isLoading`, `errorMessage`)
 *          и функцию `fetchData` для отправки запроса
 */
export function useApi<
  Args extends unknown[],
  Response,
  Transformed = Response,
>(queryFn: QueryFn<Args, Response>, options?: Options<Response, Transformed>) {
  const { transformDataFn, initialData } = options ?? {};

  const [apiState, setApiState] = useState<ApiState<Transformed>>({
    data: (initialData ?? null) as Transformed | null,
    isLoading: false,
    errorMessage: '',
  });

  const fetchData = useCallback(
    (...args: Args) =>
      async (options?: FetchDataExtraOptions<Response, Transformed>) => {
        const { signal, transformDataFn: localTransformDataFn } = options ?? {};
        const currentTransformDataFn = localTransformDataFn ?? transformDataFn;
        setApiState(state => ({
          ...state,
          isLoading: true,
          errorMessage: '',
        }));

        try {
          const data = await queryFn(...args);
          if (signal?.aborted) return;
          setApiState(state => ({
            ...state,
            data: currentTransformDataFn
              ? currentTransformDataFn(data, state.data)
              : (data as Transformed),
            isLoading: false,
          }));
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
            setApiState(state => ({
              ...state,
              errorMessage: error.message,
              isLoading: false,
            }));
          }
        }
      },
    [queryFn, transformDataFn],
  );

  return [apiState, fetchData] as const;
}
