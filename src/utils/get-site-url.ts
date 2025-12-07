/**
 * Get the site URL for redirects
 * Works in both development and production
 */
export function getSiteUrl(): string {
  // In production, use NEXT_PUBLIC_SITE_URL if set
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // Fallback for Vercel deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Fallback for local development
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}

