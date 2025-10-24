import { JSX } from "react";
import { useAppLoading } from "@/app/context/AppLoadingContext";
import "./HeaderLoadingDot.css";

/**
 * Small pulsing dot that appears only when there are active HTTP requests.
 */
export function HeaderLoadingDot(): JSX.Element | null {
  const { loading } = useAppLoading();
  return (
    <span
      className={`loading-dot ${loading ? "animated-pulse bg-blue" : "bg-grey"}`}
      aria-label="Loading"
      role="status"
    />
  );
}
