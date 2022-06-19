import { useState } from "react";

export const useLocalStorage = <T>(keyName: string, defaultValue: T): [
  T,
  (newValue: T) => void,
  () => void,
] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = localStorage.getItem(keyName);
      return value ? JSON.parse(value) : defaultValue;
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    localStorage.setItem(keyName, JSON.stringify(newValue));
    setStoredValue(newValue);
  };

  const removeValue = () => {
    localStorage.removeItem(keyName);
  };

  return [storedValue, setValue, removeValue];
};