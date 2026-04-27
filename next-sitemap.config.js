/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://nutri-suplementos.vercel.app',
  generateRobotsTxt: false, // already created manually
  exclude: ['/admin', '/admin/*', '/api', '/api/*'],
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
}
