/**
 * Simple EventBus (pub/sub) with string events.
 * UI subscribes; infra publishes (keeps layers decoupled).
 */
type Unsubscribe = () => void;
type Handler<T = unknown> = (payload?: T) => void;

class EventBus {
  private listeners = new Map<string, Set<Handler>>();

  subscribe<T = unknown>(event: string, handler: Handler<T>): Unsubscribe {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(handler as Handler);
    return () => {
      this.listeners.get(event)?.delete(handler as Handler);
    };
  }

  publish<T = unknown>(event: string, payload?: T) {
    this.listeners.get(event)?.forEach((h) => {
      try {
        h(payload);
      } catch {
        //TODO: Error handler
      }
    });
  }

  clearAll() {
    this.listeners.clear();
  }
}

export const eventBus = new EventBus();

export const HttpEvents = {
  Start: "http:start",
  End: "http:end",
} as const;
