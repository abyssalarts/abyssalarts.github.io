import type { RequestHandler } from './$types';

const SITE = 'https://abyssal-arts.com';

const pages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/about', priority: '0.8', changefreq: 'monthly' },
	{ path: '/products/brain-dump', priority: '0.9', changefreq: 'weekly' },
	{ path: '/products/rift', priority: '0.9', changefreq: 'weekly' },
	{ path: '/privacy', priority: '0.3', changefreq: 'yearly' },
	{ path: '/privacy/brain-dump', priority: '0.3', changefreq: 'yearly' },
	{ path: '/feedback', priority: '0.5', changefreq: 'monthly' }
];

export const GET: RequestHandler = () => {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url>
    <loc>${SITE}${p.path}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
