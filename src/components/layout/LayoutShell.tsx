'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/** Routes that render as standalone landing pages without Header/Footer */
const LANDING_ROUTES = ['/pre-evaluacion'];

interface LayoutShellProps {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

export function LayoutShell({ header, footer, children }: LayoutShellProps) {
  const pathname = usePathname();
  const isLanding = LANDING_ROUTES.some((route) => pathname.includes(route));

  return (
    <>
      {!isLanding && header}
      <main className="flex-1">{children}</main>
      {!isLanding && footer}
    </>
  );
}
