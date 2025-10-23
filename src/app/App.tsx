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

/**
 * Top-level application layout.
 * Renders the shared header and a dynamic loading indicator during navigation.
 *
 * @returns {JSX.Element} App shell with nested route outlet.
 */
export default function App(): JSX.Element {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isNavigating = navigation.state !== "idle";

  return (
    <>
      <Header
        title="Podcaster"
        onTitleClick={() => navigate("/")}
        rightSlot={
          isNavigating ? <LoadingSpinner ariaLabel="Navigating" /> : null
        }
      />
      <Outlet />
    </>
  );
}
