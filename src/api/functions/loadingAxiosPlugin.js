// Axios plugin to toggle global loader via loadingBus
// Usage: import and call installLoadingPlugin(apiClient)
// Per-request opt-out: apiClient.get(url, { meta: { showLoader: false } })

import { loadingBus } from "../../context/loadingBus";

export function installLoadingPlugin(axiosInstance) {
  axiosInstance.interceptors.request.use(
    (config) => {
      const show = config?.meta?.showLoader !== false; // default true
      if (show) config.__withLoader = true;
      if (config.__withLoader) loadingBus.increment();
      return config;
    },
    (error) => {
      loadingBus.decrement();
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      if (response.config.__withLoader) loadingBus.decrement();
      return response;
    },
    (error) => {
      if (error.config?.__withLoader) loadingBus.decrement();
      return Promise.reject(error);
    }
  );
}

