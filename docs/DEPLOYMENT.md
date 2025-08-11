# راهنمای استقرار و عملیات | Deployment & Operations Guide

## نمای کلی | Overview

این راهنما تمام مراحل استقرار، پیکربندی و عملیات انتخابگر پروانه متن‌باز فارسی را پوشش می‌دهد. پروژه به صورت استاتیک روی پلتفرم Vercel میزبانی می‌شود.

## محیط‌های استقرار | Deployment Environments

### Production Environment
- **URL**: https://vercel.com/mirs0bhans-projects/v0-open-source-licence-chooser
- **Platform**: Vercel
- **Branch**: `main`
- **Auto-deploy**: Enabled

### Development Environment
- **Local**: `http://localhost:3000`
- **Preview**: Vercel preview deployments for PRs

## پیش‌نیازهای استقرار | Deployment Prerequisites

### سیستم مورد نیاز | System Requirements
\`\`\`bash
Node.js >= 18.0.0
npm >= 9.0.0
Git >= 2.0.0
\`\`\`

### حساب‌های مورد نیاز | Required Accounts
- GitHub account (for repository)
- Vercel account (for deployment)

## استقرار روی Vercel | Vercel Deployment

### راه‌اندازی اولیه | Initial Setup

1. **اتصال GitHub Repository**
\`\`\`bash
# Clone repository
git clone https://github.com/MirS0bhan/fosscc.git
cd fosscc

# Install dependencies
npm install

# Test local build
npm run build
\`\`\`

2. **پیکربندی Vercel**
\`\`\`json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
\`\`\`

3. **متغیرهای محیطی | Environment Variables**
\`\`\`bash
# Production environment variables
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX (optional)
\`\`\`

### فرآیند استقرار خودکار | Automated Deployment Process

\`\`\`mermaid
graph LR
    A[Git Push] --> B[GitHub Webhook]
    B --> C[Vercel Build]
    C --> D[Static Generation]
    D --> E[Asset Optimization]
    E --> F[CDN Distribution]
    F --> G[Live Deployment]
\`\`\`

### تنظیمات Vercel | Vercel Configuration

#### Build Settings
\`\`\`bash
# Build Command
npm run build

# Output Directory
.next

# Install Command
npm install

# Development Command
npm run dev
\`\`\`

#### Domain Configuration
\`\`\`bash
# Custom Domain (if applicable)
fosscc.ir -> Production
www.fosscc.ir -> Production (redirect)
\`\`\`

## CI/CD Pipeline

### GitHub Actions Workflow
\`\`\`yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build
      
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
\`\`\`

### Quality Gates
\`\`\`bash
# Pre-deployment checks
✓ TypeScript compilation
✓ ESLint validation
✓ Build success
✓ Bundle size analysis
✓ Performance audit
\`\`\`

## مانیتورینگ و نظارت | Monitoring & Observability

### Vercel Analytics
\`\`\`javascript
// Automatic metrics collection
- Page views
- Unique visitors
- Core Web Vitals
- Geographic distribution
- Device/browser analytics
\`\`\`

### Performance Monitoring
\`\`\`bash
# Key metrics to monitor
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1
- Time to Interactive (TTI) < 3.5s
\`\`\`

### Error Tracking
\`\`\`javascript
// Built-in error boundaries
- JavaScript runtime errors
- Build-time errors
- 404 tracking
- Performance degradation alerts
\`\`\`

## عملیات روزانه | Daily Operations

### Health Checks
\`\`\`bash
# Automated health monitoring
✓ Site availability (99.9% uptime target)
✓ Performance metrics
✓ SSL certificate validity
✓ CDN distribution status
\`\`\`

### Backup Strategy
\`\`\`bash
# Repository backup
- GitHub repository (primary)
- Local development backups
- Vercel deployment history

# No database backup needed (static site)
\`\`\`

## مدیریت نسخه‌ها | Version Management

### Semantic Versioning
\`\`\`bash
# Version format: MAJOR.MINOR.PATCH
1.0.0 - Initial release
1.1.0 - New license types added
1.1.1 - Bug fixes and improvements
\`\`\`

### Release Process
\`\`\`bash
# 1. Create release branch
git checkout -b release/v1.1.0

# 2. Update version
npm version minor

# 3. Create pull request
# 4. Merge to main after review
# 5. Tag release
git tag v1.1.0
git push origin v1.1.0
\`\`\`

### Rollback Procedure
\`\`\`bash
# Vercel rollback options
1. Vercel Dashboard -> Deployments -> Promote previous
2. Git revert -> Auto-deploy
3. Manual deployment of specific commit
\`\`\`

## امنیت عملیاتی | Operational Security

### Access Control
\`\`\`bash
# Repository access
- Admin: Project maintainers
- Write: Core contributors
- Read: Public repository

# Vercel access
- Owner: Primary maintainer
- Member: Deployment managers
\`\`\`

### Security Headers
\`\`\`javascript
// next.config.js security headers
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];
\`\`\`

## بهینه‌سازی عملکرد | Performance Optimization

### Build Optimization
\`\`\`bash
# Bundle analysis
npm run analyze

# Key optimizations
- Tree shaking enabled
- Code splitting automatic
- Static asset optimization
- Font optimization with next/font
\`\`\`

### CDN Configuration
\`\`\`bash
# Vercel Edge Network
- Global CDN distribution
- Automatic asset optimization
- Brotli compression
- HTTP/2 support
\`\`\`

## عیب‌یابی | Troubleshooting

### مشکلات رایج | Common Issues

#### Build Failures
\`\`\`bash
# Issue: TypeScript errors
Solution: npm run type-check && fix errors

# Issue: Dependency conflicts
Solution: rm -rf node_modules package-lock.json && npm install

# Issue: Memory issues during build
Solution: Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
\`\`\`

#### Performance Issues
\`\`\`bash
# Issue: Slow page loads
Check: Bundle size, unused dependencies
Solution: Code splitting, lazy loading

# Issue: Poor Core Web Vitals
Check: Image optimization, font loading
Solution: next/image, next/font optimization
\`\`\`

#### Deployment Issues
\`\`\`bash
# Issue: Vercel deployment fails
Check: Build logs, environment variables
Solution: Verify build command, check dependencies

# Issue: 404 errors after deployment
Check: Routing configuration, static exports
Solution: Verify Next.js routing setup
\`\`\`

### لاگ‌ها و دیباگ | Logs & Debugging

#### Vercel Function Logs
\`\`\`bash
# Access deployment logs
vercel logs [deployment-url]

# Real-time logs
vercel logs --follow
\`\`\`

#### Local Debugging
\`\`\`bash
# Development mode with debugging
npm run dev

# Build debugging
npm run build -- --debug

# Bundle analysis
npm run analyze
\`\`\`

## پشتیبان‌گیری و بازیابی | Backup & Recovery

### Backup Strategy
\`\`\`bash
# Automated backups
✓ GitHub repository (distributed)
✓ Vercel deployment history (30 days)
✓ Local development copies

# Manual backup procedure
git clone --mirror https://github.com/MirS0bhan/fosscc.git
\`\`\`

### Disaster Recovery
\`\`\`bash
# Recovery scenarios
1. Repository corruption -> Restore from GitHub
2. Vercel account issues -> Redeploy to new account
3. Domain issues -> Update DNS configuration
4. Complete data loss -> Restore from local backup

# Recovery time objective (RTO): < 1 hour
# Recovery point objective (RPO): < 15 minutes
\`\`\`

## مقیاس‌پذیری | Scalability

### Traffic Handling
\`\`\`bash
# Current capacity
- Vercel Edge Network: Global distribution
- Bandwidth: Unlimited on Pro plan
- Concurrent users: No specific limit (static site)

# Scaling considerations
- CDN automatically handles traffic spikes
- No server-side scaling needed
- Database: N/A (static data)
\`\`\`

### Performance Scaling
\`\`\`bash
# Optimization strategies
1. Code splitting for larger applications
2. Image optimization for media-heavy content
3. Service worker for offline functionality
4. Edge functions for dynamic features (if needed)
\`\`\`

## نظارت و هشدارها | Monitoring & Alerts

### Alert Configuration
\`\`\`bash
# Vercel alerts
✓ Deployment failures
✓ Performance degradation
✓ Uptime monitoring
✓ Error rate thresholds

# External monitoring (optional)
- UptimeRobot for availability
- Google PageSpeed Insights for performance
\`\`\`

### Incident Response
\`\`\`bash
# Incident severity levels
P0: Site completely down (< 15 min response)
P1: Major functionality broken (< 1 hour response)
P2: Minor issues (< 24 hour response)
P3: Enhancement requests (next release)
\`\`\`

## مستندات عملیاتی | Operational Documentation

### Runbooks
- [Deployment Runbook](./runbooks/deployment.md)
- [Incident Response](./runbooks/incident-response.md)
- [Performance Tuning](./runbooks/performance.md)

### Contact Information
\`\`\`bash
# Emergency contacts
Primary: [Maintainer Email]
Secondary: [Backup Contact]
Vercel Support: support@vercel.com
\`\`\`

---

این راهنما به‌طور مداوم به‌روزرسانی می‌شود تا با تغییرات پروژه و بهترین شیوه‌های عملیاتی همگام باشد.
