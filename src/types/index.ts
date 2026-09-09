export type ActiveModal =
  | null
  | 'contract'
  | 'terms'
  | 'legal'
  | 'privacy'
  | 'manual'
  | 'cookiePrefs';

export interface QuoteFormData {
  name: string;
  whatsapp: string;
  propertyType: string;
  serviceType: string;
  cityRegion: string;
  approxSize: string;
  roomsCount: string;
  frequency: string;
  desiredDate: string;
  notes: string;
  acceptedPrivacy: boolean;
}

export interface AnalyticsEvent {
  event:
    | 'page_view'
    | 'cta_click'
    | 'pricing_click'
    | 'whatsapp_click'
    | 'quote_start'
    | 'quote_submit'
    | 'phone_click'
    | 'service_view'
    | 'pricing_view'
    | 'contact_submit'
    | 'lead_saved'
    | 'form_submit'
    | 'whatsapp_open';
  label?: string;
  value?: string | number;
  timestamp?: string;
}
