import * as React from "react";
import localForage from "localforage";

type UseStateHook<T> = [
  [boolean, T | null | number | string | undefined | any],
  (value?: T | null) => void
];

function useAsyncState<T>(
  initialValue: [boolean, T | null | number | string | undefined | any] = [
    true,
    undefined,
  ]
): UseStateHook<T> {
  return React.useReducer(
    (state: any, action: T | null = null) => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

const setStorageItemAsync = async (key: string, value: string | null) => {
  if (value == null) {
    await localForage.removeItem(key);
  } else {
    await localForage.setItem(key, value);
  }
};

const useStorageState = (key: string): UseStateHook<string> => {
  const [state, setState] = useAsyncState<string>();

  React.useEffect(() => {
    localForage.getItem(key).then((value: any) => {
      setState(value);
    });
  }, [key, setState]);

  const setValue: any = React.useCallback(
    (value: string | null) => {
      setStorageItemAsync(key, value).then(() => {
        setState(value);
      });
    },
    [key, setState]
  );

  return [state, setValue];
};

export { setStorageItemAsync, useStorageState };
