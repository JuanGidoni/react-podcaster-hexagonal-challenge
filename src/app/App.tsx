// src/app/App.tsx

/**
 * @file App layout (shell).
 * @description
 * Provides the application chrome (sticky Header), handles navigation loading
 * state, and renders nested routes via <Outlet />.
 * - Header title navigates to "/"
 * - Right slot shows a spinner while the router is transitioning
 */

import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import { Header, LoadingSpinner } from "@/app/ui/components";
import { JSX } from "react";
import { HeaderLoadingDot } from "./ui/components/HeaderLoadingDot/HeaderLoadingDot";
import { AppLoadingProvider } from "./context/AppLoadingContext";

/**
 * Top-level application layout.
 * Renders the shared header and a dynamic loading indicator during navigation.
 *
 * @returns {JSX.Element} App shell with nested route outlet.
 */
export default function App(): JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <AppLoadingProvider>
        <Header title="Podcaster" onTitleClick={() => navigate("/")} />
        <Outlet />
      </AppLoadingProvider>
    </>
  );
}
