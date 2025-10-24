import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { eventBus, HttpEvents } from "@/core/events/EventBus";

type AppLoadingContextValue = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const AppLoadingContext = createContext<AppLoadingContextValue | undefined>(
  undefined
);

export function AppLoadingProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubStart = eventBus.subscribe(HttpEvents.Start, () => {
      setLoading(true);
    });
    const unsubEnd = eventBus.subscribe(HttpEvents.End, () => {
      setLoading(false);
    });
    return () => {
      unsubStart();
      unsubEnd();
    };
  }, []);

  const value = useMemo<AppLoadingContextValue>(
    () => ({
      loading,
      setLoading,
    }),
    [loading]
  );

  return (
    <AppLoadingContext.Provider value={value}>
      {children}
    </AppLoadingContext.Provider>
  );
}

export function useAppLoading() {
  const ctx = useContext(AppLoadingContext);
  if (!ctx)
    throw new Error("useAppLoading must be used within AppLoadingProvider");
  return ctx;
}
