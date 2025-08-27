import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadingBus } from "./loadingBus";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [localLoading, setLocalLoading] = useState(false);
  const [globalCount, setGlobalCount] = useState(0);

  useEffect(() => {
    const unsub = loadingBus.subscribe(setGlobalCount);
    return unsub;
  }, []);

  const isLoading = localLoading || globalCount > 0;

  const value = useMemo(
    () => ({
      isLoading,
      showLoading: () => setLocalLoading(true),
      hideLoading: () => setLocalLoading(false),
      beginGlobal: () => loadingBus.increment(),
      endGlobal: () => loadingBus.decrement(),
    }),
    [isLoading]
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
