# معماری سیستم | System Architecture

## نمای کلی | Overview

انتخابگر پروانه متن‌باز فارسی یک اپلیکیشن وب استاتیک است که با Next.js 14 و App Router ساخته شده است. این سیستم بر اساس اصول Clean Architecture و separation of concerns طراحی شده تا قابلیت نگهداری، تست‌پذیری و گسترش‌پذیری بالایی داشته باشد.

## اصول طراحی | Design Principles

### 1. جداسازی نگرانی‌ها (Separation of Concerns)
- **UI Components**: مسئول نمایش و تعامل کاربر
- **Business Logic**: منطق انتخاب پروانه در hooks و utils
- **Data Layer**: داده‌های استاتیک پروانه‌ها
- **Type Safety**: تعاریف TypeScript جداگانه

### 2. Component-Based Architecture
- کامپوننت‌های قابل استفاده مجدد
- Props interface های واضح
- State management محلی و global

### 3. Performance First
- Static generation برای بهترین عملکرد
- Code splitting خودکار Next.js
- Optimized bundle size

## معماری سطح بالا | High-Level Architecture

\`\`\`mermaid
graph TB
    subgraph "Client Side"
        A[Browser] --> B[Next.js App]
        B --> C[React Components]
        C --> D[Custom Hooks]
        D --> E[Utility Functions]
        E --> F[Static Data]
    end
    
    subgraph "Build Time"
        G[TypeScript] --> H[Next.js Build]
        H --> I[Static Assets]
        I --> J[Vercel Deployment]
    end
    
    subgraph "Runtime"
        K[User Interaction] --> L[State Updates]
        L --> M[License Filtering]
        M --> N[UI Re-render]
    end
\`\`\`

## ساختار دایرکتوری | Directory Structure

\`\`\`
fosscc/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Main application page
│   └── globals.css              # Global styles and Tailwind
│
├── components/                   # Reusable UI components
│   ├── QuestionSection.tsx      # Interactive questionnaire
│   └── ui/                      # shadcn/ui base components
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
│
├── data/                        # Static data and configurations
│   └── licenses.ts              # License database
│
├── hooks/                       # Custom React hooks
│   └── useLicenseChooser.ts     # Main application logic
│
├── types/                       # TypeScript type definitions
│   └── license.ts               # License and form interfaces
│
├── utils/                       # Pure utility functions
│   └── licenseUtils.ts          # License filtering and generation
│
├── docs/                        # Documentation
│   ├── ARCHITECTURE.md          # This file
│   └── ...
│
└── public/                      # Static assets
    ├── manifest.json            # PWA manifest
    └── ...
\`\`\`

## جزئیات کامپوننت‌ها | Component Details

### 1. App Layout (`app/layout.tsx`)
\`\`\`typescript
// Responsibilities:
- HTML document structure
- Meta tags and SEO
- Persian font loading (Vazirmatn)
- Global providers (Theme, etc.)
- PWA manifest linking
\`\`\`

### 2. Main Page (`app/page.tsx`)
\`\`\`typescript
// Responsibilities:
- Layout orchestration
- Component composition
- Error boundary
- GitHub link integration
\`\`\`

### 3. Question Section (`components/QuestionSection.tsx`)
\`\`\`typescript
// Responsibilities:
- Interactive questionnaire UI
- Form validation
- Accessibility features
- Conditional question logic
\`\`\`

### 4. License Chooser Hook (`hooks/useLicenseChooser.ts`)
\`\`\`typescript
// Responsibilities:
- Application state management
- License filtering logic
- Form data handling
- URL state synchronization
- Local storage persistence
\`\`\`

### 5. License Utilities (`utils/licenseUtils.ts`)
\`\`\`typescript
// Responsibilities:
- Pure license filtering functions
- License text generation
- README snippet creation
- File download utilities
\`\`\`

## جریان داده | Data Flow

### 1. User Input Flow
\`\`\`mermaid
sequenceDiagram
    participant U as User
    participant Q as QuestionSection
    participant H as useLicenseChooser
    participant F as licenseUtils
    participant L as License Data
    
    U->>Q: Answers questions
    Q->>H: Updates form state
    H->>F: Filters licenses
    F->>L: Queries license data
    L->>F: Returns matching licenses
    F->>H: Filtered results
    H->>Q: Updates recommendations
    Q->>U: Shows results
\`\`\`

### 2. State Management
\`\`\`typescript
// Global State (useLicenseChooser)
interface AppState {
  formData: FormData;           // User inputs
  filteredLicenses: License[];  // Matching licenses
  selectedLicense: License | null;
  isLoading: boolean;
  errors: Record<string, string>;
}

// Local State (Components)
- UI interaction states
- Form validation states
- Animation states
\`\`\`

## الگوهای طراحی | Design Patterns

### 1. Custom Hook Pattern
\`\`\`typescript
// Centralized logic in custom hooks
const useLicenseChooser = () => {
  // State management
  // Side effects
  // Business logic
  return { state, actions };
};
\`\`\`

### 2. Compound Component Pattern
\`\`\`typescript
// Flexible component composition
<QuestionSection>
  <QuestionSection.Header />
  <QuestionSection.Form />
  <QuestionSection.Actions />
</QuestionSection>
\`\`\`

### 3. Provider Pattern
\`\`\`typescript
// Context for shared state (if needed)
<LicenseProvider>
  <App />
</LicenseProvider>
\`\`\`

## مدیریت حالت | State Management

### Local State Strategy
- **React useState**: برای UI state محلی
- **Custom hooks**: برای business logic
- **URL params**: برای shareable state
- **localStorage**: برای persistence

### State Structure
\`\`\`typescript
interface ApplicationState {
  // Form data
  projectType: ProjectType;
  allowCommercial: boolean;
  requireSameLicense: boolean;
  // ... other form fields
  
  // UI state
  currentStep: number;
  isLoading: boolean;
  errors: ValidationErrors;
  
  // Computed state
  filteredLicenses: License[];
  recommendedLicense: License | null;
}
\`\`\`

## عملکرد | Performance

### Optimization Strategies

1. **Static Generation**
   - تمام صفحات در build time تولید می‌شوند
   - بدون نیاز به server-side rendering

2. **Code Splitting**
   - Next.js automatic code splitting
   - Dynamic imports برای کامپوننت‌های سنگین

3. **Bundle Optimization**
   - Tree shaking برای حذف کد غیرضروری
   - Minification و compression

4. **Asset Optimization**
   - Font optimization با next/font
   - Image optimization (در صورت استفاده)

### Performance Metrics
\`\`\`typescript
// Target metrics
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms
\`\`\`

## امنیت | Security

### Client-Side Security
1. **Input Validation**
   - تمام ورودی‌های کاربر validate می‌شوند
   - XSS protection با proper escaping

2. **Content Security Policy**
   - CSP headers برای جلوگیری از XSS
   - Trusted sources برای assets

3. **Data Privacy**
   - هیچ داده حساسی ذخیره نمی‌شود
   - localStorage فقط برای preferences

## دسترسی‌پذیری | Accessibility

### WCAG 2.1 AA Compliance
1. **Keyboard Navigation**
   - تمام عناصر با keyboard قابل دسترسی
   - Focus management مناسب

2. **Screen Reader Support**
   - ARIA labels و descriptions
   - Semantic HTML structure

3. **Color Contrast**
   - حداقل 4.5:1 برای متن عادی
   - حداقل 3:1 برای متن بزرگ

4. **RTL Support**
   - کامل برای زبان فارسی
   - Proper text direction handling

## بین‌المللی‌سازی | Internationalization

### Persian Language Support
\`\`\`typescript
// RTL Layout
direction: 'rtl'
text-align: 'right'

// Persian Fonts
font-family: 'Vazirmatn', sans-serif

// Number Formatting
// Persian numerals support
\`\`\`

## تست‌پذیری | Testability

### Testing Strategy
1. **Unit Tests**
   - Pure functions در utils
   - Custom hooks با @testing-library/react-hooks

2. **Integration Tests**
   - Component interactions
   - User workflows

3. **E2E Tests**
   - Critical user paths
   - Cross-browser compatibility

### Test Structure
\`\`\`
tests/
├── unit/
│   ├── utils/
│   └── hooks/
├── integration/
│   └── components/
└── e2e/
    └── workflows/
\`\`\`

## مانیتورینگ | Monitoring

### Performance Monitoring
- **Vercel Analytics**: Core Web Vitals
- **Real User Monitoring**: Performance metrics
- **Error Tracking**: Runtime errors

### Metrics to Track
\`\`\`typescript
// Performance
- Page load times
- Bundle sizes
- Core Web Vitals

// Usage
- License selection patterns
- User flow completion rates
- Error rates
\`\`\`

## آینده و گسترش | Future & Extensibility

### Planned Enhancements
1. **Additional License Types**
   - More specialized licenses
   - Custom license templates

2. **Advanced Features**
   - License comparison tool
   - Bulk project processing
   - API for integration

3. **Internationalization**
   - Additional language support
   - Localized license texts

### Extension Points
\`\`\`typescript
// Plugin architecture for new license types
interface LicensePlugin {
  type: string;
  filter: (criteria: Criteria) => License[];
  generate: (license: License, data: FormData) => string;
}
\`\`\`

---

این معماری برای پشتیبانی از رشد و تکامل آینده پروژه طراحی شده و اصول SOLID و Clean Architecture را دنبال می‌کند.
