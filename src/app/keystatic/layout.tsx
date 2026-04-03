import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Dualys CMS',
};

async function getGitHubUser(token: string): Promise<string | null> {
  try {
    const res = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const user = await res.json();
    return user.login;
  } catch {
    return null;
  }
}

export default async function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV !== 'development') {
    const allowedUsers = (process.env.KEYSTATIC_ALLOWED_USERS ?? '')
      .split(',')
      .map((u) => u.trim().toLowerCase())
      .filter(Boolean);

    if (allowedUsers.length > 0) {
      const cookieStore = await cookies();
      const token = cookieStore.get('keystatic-gh-access-token')?.value;

      if (token) {
        const username = await getGitHubUser(token);
        if (username && !allowedUsers.includes(username.toLowerCase())) {
          return (
            <html lang="en">
              <body
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  padding: '4rem',
                  textAlign: 'center',
                }}
              >
                <h1>Access Denied</h1>
                <p>
                  Your GitHub account (<strong>{username}</strong>) is not
                  authorized to access this CMS.
                </p>
                <p>Contact the administrator to request access.</p>
              </body>
            </html>
          );
        }
      }
    }
  }

  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  );
}
