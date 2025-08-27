// src/hooks/useDistricts.js
import { useEffect, useState } from "react";
import apiClient from "../api/functions/apiConfig";
import API_ENDPOINTS from "../api/apiEndpoint";

let cached = null;

export function useDistricts() {
  const [districts, setDistricts] = useState(cached || []);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cached) return;
    (async () => {
      try {
        setLoading(true);
        const res = await apiClient.post(API_ENDPOINTS.auth.getDistrict, {
          meta: { showLoader: false },
        });
        const payload = res?.data ?? res;
        const list = Array.isArray(payload?.data) ? payload.data : [];
        setDistricts(list);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { districts, loading, error };
}
