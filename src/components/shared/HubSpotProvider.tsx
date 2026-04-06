'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

type ConsentState = 'pending' | 'accepted' | 'rejected';

interface HubSpotProviderProps {
  portalId: string;
  locale?: string;
}

function getInitialConsent(): ConsentState {
  if (typeof window === 'undefined') return 'pending';
  const stored = localStorage.getItem('cookie-consent');
  if (stored === 'accepted' || stored === 'rejected') return stored;
  return 'pending';
}

/**
 * Conditionally loads the HubSpot tracking script and chat widget
 * based on cookie consent. Tracks SPA page views and refreshes
 * the chat widget on navigation.
 */
export function HubSpotProvider({ portalId, locale }: HubSpotProviderProps) {
  const [consent, setConsent] = useState<ConsentState>(getInitialConsent);
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const prevPathname = useRef(pathname);

  // Listen for consent changes from CookieConsent component
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail === 'accepted' || detail === 'rejected') {
        setConsent(detail);
      }
    };
    window.addEventListener('cookie-consent-changed', handler);
    return () => window.removeEventListener('cookie-consent-changed', handler);
  }, []);

  // Configure chat widget BEFORE the script loads (must be synchronous)
  // HubSpot requires these globals to exist before the tracking code executes
  if (typeof window !== 'undefined' && consent === 'accepted') {
    window.hsConversationsSettings = {
      loadImmediately: false,
      ...(locale && { locale }),
    };
    window.hsConversationsOnReady = [
      () => {
        window.HubSpotConversations?.widget.load();
      },
    ];
  }

  // Remove chat widget if consent is revoked
  useEffect(() => {
    if (consent === 'rejected' && window.HubSpotConversations) {
      window.HubSpotConversations.widget.remove();
    }
  }, [consent]);

  // SPA page view tracking + chat widget refresh
  useEffect(() => {
    if (consent !== 'accepted') return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPathname.current = pathname;
      return;
    }

    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    const _hsq = (window._hsq = window._hsq || []);
    _hsq.push(['setPath', pathname]);
    _hsq.push(['trackPageView']);

    if (window.HubSpotConversations) {
      window.HubSpotConversations.widget.refresh();
    }
  }, [pathname, consent]);

  if (consent !== 'accepted') return null;

  return (
    <Script
      id="hs-script-loader"
      src={`//js-eu1.hs-scripts.com/${portalId}.js`}
      strategy="afterInteractive"
      onReady={() => {
        // Fallback: load widget if onReady callback was missed
        if (window.HubSpotConversations) {
          const status = window.HubSpotConversations.widget.status();
          if (!status.loaded) {
            window.HubSpotConversations.widget.load();
          }
        }
      }}
    />
  );
}
