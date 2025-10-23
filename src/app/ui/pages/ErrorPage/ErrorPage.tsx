// src/app/ui/pages/ErrorPage/ErrorPage.tsx

/**
 * @file ErrorPage.tsx
 * @description Generic error fallback for route-level or manual redirections.
 */
import { Container } from "@/app/ui/components";
import "./ErrorPage.css";
import { JSX } from "react";

export function ErrorPage(): JSX.Element {
  return (
    <Container as="section" className="error-page">
      <h2>Something went wrong</h2>
      <p>We couldn’t load the requested content. Please try again later.</p>
      <p>
        <a href="/">Go back to Home</a>
      </p>
    </Container>
  );
}
