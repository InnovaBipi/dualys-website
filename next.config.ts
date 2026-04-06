import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/**': ['./content/**/*'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Old /about routes → /nosotros
      { source: '/about', destination: '/nosotros', permanent: true },
      { source: '/:locale/about', destination: '/:locale/nosotros', permanent: true },
      { source: '/about/team', destination: '/nosotros', permanent: true },
      { source: '/:locale/about/team', destination: '/:locale/nosotros', permanent: true },
      { source: '/about/partners', destination: '/nosotros', permanent: true },
      { source: '/:locale/about/partners', destination: '/:locale/nosotros', permanent: true },
      // Old /capabilities routes → /servicios
      { source: '/capabilities', destination: '/servicios', permanent: true },
      { source: '/:locale/capabilities', destination: '/:locale/servicios', permanent: true },
      { source: '/capabilities/:path*', destination: '/servicios', permanent: true },
      { source: '/:locale/capabilities/:path*', destination: '/:locale/servicios', permanent: true },
      // Old /sectors → /sectores
      { source: '/sectors', destination: '/sectores', permanent: true },
      { source: '/:locale/sectors', destination: '/:locale/sectores', permanent: true },
      // Old /news → /recursos
      { source: '/news', destination: '/recursos', permanent: true },
      { source: '/:locale/news', destination: '/:locale/recursos', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
