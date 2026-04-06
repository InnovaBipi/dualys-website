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
 * Loads the HubSpot tracking script and chat widget unconditionally
 * (chat is a functional service). Analytics tracking is gated behind
 * cookie consent using HubSpot's doNotTrack API.
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
      if (detail === 'accepted' || detail === 'rejected') setConsent(detail);
    };
    window.addEventListener('cookie-consent-changed', handler);
    return () => window.removeEventListener('cookie-consent-changed', handler);
  }, []);

  // Configure HubSpot globals BEFORE script loads (synchronous, in render)
  if (typeof window !== 'undefined') {
    window.hsConversationsSettings = {
      loadImmediately: true,
      ...(locale && { locale }),
    };
    // Disable analytics unless consent already accepted
    if (consent !== 'accepted') {
      const _hsq = (window._hsq = window._hsq || []);
      _hsq.push(['doNotTrack']);
    }
  }

  // SPA navigation: refresh widget + conditional tracking
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPathname.current = pathname;
      return;
    }
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    if (window.HubSpotConversations) {
      window.HubSpotConversations.widget.refresh();
    }
    if (consent === 'accepted') {
      const _hsq = (window._hsq = window._hsq || []);
      _hsq.push(['setPath', pathname]);
      _hsq.push(['trackPageView']);
    }
  }, [pathname, consent]);

  // Always render — chat is functional, not marketing
  return (
    <Script
      id="hs-script-loader"
      src={`//js-eu1.hs-scripts.com/${portalId}.js`}
      strategy="afterInteractive"
    />
  );
}
