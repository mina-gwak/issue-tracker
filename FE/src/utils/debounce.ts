export const debounce = <T>(callback: (event: T) => void, limit = 100) => {
  let timeout: NodeJS.Timeout;
  return function (...args:[event: T]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(null, args);
    }, limit);
  };
}
