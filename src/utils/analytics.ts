import { AnalyticsEvent } from '../types';

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private listeners: ((events: AnalyticsEvent[]) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.track('page_view', 'landing_page_init');
    }
  }

  public track(event: AnalyticsEvent['event'], label?: string, value?: string | number) {
    const entry: AnalyticsEvent = {
      event,
      label,
      value,
      timestamp: new Date().toISOString(),
    };

    this.events.push(entry);
    
    // Log for transparency & testing
    if (process.env.NODE_ENV !== 'production' || typeof window !== 'undefined') {
      console.log(`[Analytics Event] ${event}`, { label, value, time: entry.timestamp });
    }

    // Google Tag Manager / DataLayer readiness if available
    if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: unknown[] }).dataLayer) {
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event,
        eventLabel: label,
        eventValue: value,
      });
    }

    this.listeners.forEach((listener) => listener([...this.events]));
  }

  public subscribe(listener: (events: AnalyticsEvent[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public getEvents() {
    return [...this.events];
  }
}

export const analytics = new AnalyticsService();
