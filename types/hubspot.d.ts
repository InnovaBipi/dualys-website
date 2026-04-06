/**
 * HubSpot Tracking Code API type declarations.
 * @see https://developers.hubspot.com/docs/api-reference/legacy/tracking-code-v1/overview
 */

type HsqCommand =
  | ['setPath', string]
  | ['trackPageView']
  | ['identify', Record<string, string>]
  | ['revokeCookieConsent']
  | ['doNotTrack']
  | ['trackCustomBehavioralEvent', { name: string; properties?: Record<string, string> }];

interface Window {
  _hsq?: HsqCommand[];
  hsConversationsSettings?: { loadImmediately: boolean; locale?: string };
  hsConversationsOnReady?: Array<() => void>;
  HubSpotConversations?: {
    widget: {
      load: () => void;
      remove: () => void;
      refresh: () => void;
      open: () => void;
      close: () => void;
      status: () => { loaded: boolean; open: boolean };
    };
  };
}
