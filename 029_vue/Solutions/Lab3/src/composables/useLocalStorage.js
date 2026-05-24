import { ref, watch } from "vue";

export const useLocalStorage = (key, defaultValue) => {
  const storage = typeof window !== "undefined" ? window.localStorage : null;

  const readValue = () => {
    if (!storage) {
      return defaultValue;
    }

    const storedValue = storage.getItem(key);
    if (storedValue === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(storedValue);
    } catch {
      return defaultValue;
    }
  };

  const state = ref(readValue());

  if (storage) {
    watch(
      state,
      (value) => {
        storage.setItem(key, JSON.stringify(value));
      },
      { deep: true },
    );
  }

  return state;
};