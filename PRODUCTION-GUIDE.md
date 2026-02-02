# Frontend - Production Deployment Guide

## Overview

This guide covers deploying your Next.js Marvel fanboy website to various hosting platforms. The site is configured for **static export** and includes all production optimizations.

---

## Pre-Deployment Checklist

- [ ] All code changes committed to git
- [ ] Environment variables configured (if any)
- [ ] `npm run build` completes successfully
- [ ] Site tested locally at `http://localhost:3002`
- [ ] SEO metadata reviewed in `app/layout.tsx`
- [ ] Favicon and social images prepared

---

## Quick Start

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Build for production
npm run build

# 4. Production files are in ./dist/
# Ready to deploy!
```

---

## Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Zero-config deployment for Next.js
- Automatic HTTPS
- Global CDN
- Preview deployments
- Analytics included

**Deploy Steps:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (interactive)
vercel

# Or deploy to production directly
vercel --prod
```

**Alternative - Git Integration:**
1. Push code to GitHub/GitLab/Bitbucket
2. Connect repository at [vercel.com](https://vercel.com)
3. Vercel auto-detects Next.js and deploys
4. Every push triggers a new deployment

---

### Option 2: Netlify

**Deploy Steps:**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build first
npm run build

# Deploy dist folder
netlify deploy --dir=dist --prod
```

**Alternative - Drag & Drop:**
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist/` folder to deploy

**netlify.toml Configuration:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 3: GitHub Pages

**Setup:**

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. Enable GitHub Pages in repository settings
3. Set source to "GitHub Actions"
4. Push to main branch

---

### Option 4: Cloudflare Pages

**Deploy Steps:**

```bash
# Install Wrangler
npm i -g wrangler

# Build
npm run build

# Deploy
wrangler pages deploy dist
```

**Build Settings (in Cloudflare Dashboard):**
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`

---

### Option 5: AWS S3 + CloudFront

**Prerequisites:**
- AWS CLI configured
- S3 bucket created
- CloudFront distribution set up

**Deploy Script:**

```bash
#!/bin/bash
# deploy.sh

BUCKET="your-bucket-name"
DISTRIBUTION_ID="your-cloudfront-id"

echo "Building..."
npm run build

echo "Uploading to S3..."
aws s3 sync dist/ s3://$BUCKET --delete

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "Done!"
```

---

### Option 6: Traditional Web Hosting (cPanel/FTP)

**Steps:**

```bash
# Navigate to frontend directory
cd frontend

# Build locally
npm run build

# Compress dist folder
zip -r frontend.zip dist/

# Upload via:
# - File Manager in cPanel
# - FTP client (FileZilla, Cyberduck)
# - SCP command: scp -r dist/* user@server:/public_html/
```

---

## Configuration Files

### next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',        // Static export mode
  distDir: 'dist',         // Output directory
  images: {
    unoptimized: true,     // Required for static export
  },
  // Optional: Add custom domains for images
  // images: {
  //   remotePatterns: [
  //     { protocol: 'https', hostname: 'example.com' }
  //   ]
  // }
};

export default nextConfig;
```

### Environment Variables

Create `.env.local` for local development:
```
# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Optional: API keys (if adding Marvel API)
MARVEL_PUBLIC_KEY=your-key
MARVEL_PRIVATE_KEY=your-private-key
```

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## Performance Optimizations

### Already Implemented:
- ✅ Static site generation (SSG)
- ✅ Image optimization disabled for static export
- ✅ Code splitting by route
- ✅ Font optimization (Inter from Google Fonts)
- ✅ CSS optimization with Tailwind

### Additional Optimizations:

1. **Add a sitemap.xml:**
```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
```

2. **Add robots.txt:**
```
// public/robots.txt
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

3. **Enable gzip compression** on your server

4. **Add a service worker** for offline support (PWA)

---

## Post-Deployment

### Testing Checklist:
- [ ] Site loads without errors
- [ ] All animations work smoothly
- [ ] Responsive on mobile, tablet, desktop
- [ ] All links work correctly
- [ ] Newsletter form submits properly
- [ ] SEO meta tags visible (inspect page source)
- [ ] No console errors
- [ ] Performance score 90+ in Lighthouse

### SEO Checklist:
- [ ] Meta title and description set in `app/layout.tsx`
- [ ] Open Graph tags configured
- [ ] Favicon uploaded to `app/favicon.ico`
- [ ] Google Search Console verified
- [ ] Sitemap submitted to search engines

### Analytics Setup:
```typescript
// Add to app/layout.tsx
import Script from 'next/script'

// In the <head>:
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
  `}
</Script>
```

---

## Troubleshooting

### Build Errors:
```bash
# Clear cache and rebuild
rm -rf .next dist node_modules
npm install
npm run build
```

### Image Loading Issues:
- Ensure `images: { unoptimized: true }` in next.config.ts
- Use relative paths for static images
- Store images in `public/` folder

### 404 Errors on Refresh:
- Configure server to serve `index.html` for all routes
- Add rewrite rules in hosting platform
- Use hash routing (not recommended for SEO)

### CORS Issues:
- Add headers in next.config.ts:
```typescript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' }
      ]
    }
  ]
}
```

---

## Security Checklist

- [ ] Dependencies up to date (`npm audit` shows 0 vulnerabilities)
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] No sensitive data in client-side code
- [ ] Environment variables properly managed

---

## Maintenance

### Monthly Tasks:
- Update dependencies: `npm update`
- Run security audit: `npm audit`
- Check Google Search Console for errors
- Review analytics data
- Update content as needed

### Before Major Updates:
```bash
# Check for breaking changes
npm outdated

# Update major versions carefully
npm install next@latest react@latest react-dom@latest

# Test locally before deploying
npm run build
npm run start  # Test production build locally
```

---

## Support

- **Next.js Docs:** https://nextjs.org/docs
- **Deployment Docs:** https://nextjs.org/docs/app/building-your-application/deploying
- **Vercel Platform:** https://vercel.com/docs
- **GitHub Issues:** Report bugs in project repository

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server locally |
| `npm run lint` | Run ESLint |
| `npm audit` | Check security vulnerabilities |

---

**Your Marvel fanboy site is now ready for the world! 🦸‍♂️**