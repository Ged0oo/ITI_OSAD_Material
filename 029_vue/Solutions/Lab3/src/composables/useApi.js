import { ref } from "vue";

export const useApi = (baseUrl) => {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const request = async (path, options = {}) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${baseUrl}/${path}`, {
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      if (response.status === 204) {
        data.value = null;
        return null;
      }

      const payload = await response.json();
      data.value = payload;
      return payload;
    } catch (err) {
      const apiError = err instanceof Error ? err : new Error(String(err));
      error.value = apiError;
      throw apiError;
    } finally {
      loading.value = false;
    }
  };

  const getAll = (resourcePath) => request(resourcePath);
  const getOne = (resourcePath, id) => request(`${resourcePath}/${id}`);
  const update = (resourcePath, id, payload) =>
    request(`${resourcePath}/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

  return { data, error, loading, getAll, getOne, update };
};
