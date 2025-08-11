# راهنمای مشارکت | Contributing Guide

## خوش آمدید | Welcome

از علاقه شما به مشارکت در انتخابگر پروانه متن‌باز فارسی تشکر می‌کنیم! این راهنما تمام اطلاعات لازم برای شروع مشارکت در پروژه را فراهم می‌کند.

## فهرست مطالب | Table of Contents

- [نحوه مشارکت](#نحوه-مشارکت--how-to-contribute)
- [راه‌اندازی محیط توسعه](#راهاندازی-محیط-توسعه--development-setup)
- [استانداردهای کد](#استانداردهای-کد--coding-standards)
- [فرآیند توسعه](#فرآیند-توسعه--development-process)
- [تست‌نویسی](#تستنویسی--testing)
- [مستندسازی](#مستندسازی--documentation)

## نحوه مشارکت | How to Contribute

### انواع مشارکت | Types of Contributions

#### 🐛 گزارش باگ | Bug Reports
- مشکلات فنی و خطاهای نرم‌افزاری
- مشکلات رابط کاربری و تجربه کاربری
- مشکلات عملکرد و سرعت

#### ✨ درخواست ویژگی | Feature Requests
- پروانه‌های جدید
- بهبود رابط کاربری
- قابلیت‌های جدید

#### 📝 بهبود مستندات | Documentation
- تصحیح متون فارسی
- افزودن مثال‌ها
- بهبود راهنماها

#### 🔧 بهبود کد | Code Improvements
- بهینه‌سازی عملکرد
- رفع مشکلات امنیتی
- بازسازی کد (Refactoring)

### پیش از شروع | Before You Start

1. **جستجو در Issues موجود**
   - بررسی کنید مشکل یا درخواست شما قبلاً گزارش نشده باشد
   - در بحث‌های موجود شرکت کنید

2. **ایجاد Issue جدید**
   - برای تغییرات بزرگ، ابتدا Issue ایجاد کنید
   - توضیح کاملی از مشکل یا پیشنهاد ارائه دهید

3. **بحث و بررسی**
   - منتظر بازخورد نگهدارندگان پروژه باشید
   - در صورت نیاز، جزئیات بیشتری ارائه دهید

## راه‌اندازی محیط توسعه | Development Setup

### پیش‌نیازها | Prerequisites

\`\`\`bash
# نرم‌افزارهای مورد نیاز
Node.js >= 18.0.0
npm >= 9.0.0
Git >= 2.0.0

# ابزارهای توصیه شده
VS Code با افزونه‌های:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Prettier - Code formatter
- ESLint
\`\`\`

### نصب و راه‌اندازی | Installation

\`\`\`bash
# 1. Fork کردن repository
# از رابط GitHub روی دکمه Fork کلیک کنید

# 2. Clone کردن fork شده
git clone https://github.com/YOUR_USERNAME/fosscc.git
cd fosscc

# 3. اضافه کردن upstream remote
git remote add upstream https://github.com/MirS0bhan/fosscc.git

# 4. نصب dependencies
npm install

# 5. اجرای development server
npm run dev

# 6. باز کردن در مرورگر
# http://localhost:3000
\`\`\`

### ساختار پروژه | Project Structure

\`\`\`
fosscc/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout اصلی
│   ├── page.tsx          # صفحه اصلی
│   └── globals.css       # استایل‌های سراسری
├── components/            # کامپوننت‌های قابل استفاده مجدد
│   ├── QuestionSection.tsx
│   └── ui/               # shadcn/ui components
├── data/                 # داده‌های استاتیک
│   └── licenses.ts       # اطلاعات پروانه‌ها
├── hooks/                # Custom React Hooks
│   └── useLicenseChooser.ts
├── types/                # تعاریف TypeScript
│   └── license.ts
├── utils/                # توابع کمکی
│   └── licenseUtils.ts
├── docs/                 # مستندات
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   ├── SECURITY.md
│   └── CONTRIBUTING.md
└── public/               # فایل‌های استاتیک
\`\`\`

## استانداردهای کد | Coding Standards

### TypeScript Guidelines

\`\`\`typescript
// ✅ استفاده از interface برای props
interface ComponentProps {
  title: string;
  isVisible?: boolean;
  onSubmit: (data: FormData) => void;
}

// ✅ استفاده از type برای unions
type Status = 'loading' | 'success' | 'error';

// ✅ نام‌گذاری واضح و توصیفی
const calculateRecommendedLicenses = (criteria: SelectionCriteria): License[] => {
  // Implementation
};

// ❌ نام‌گذاری مبهم
const calc = (c: any): any => {
  // Implementation
};
\`\`\`

### React Component Guidelines

\`\`\`typescript
// ✅ Functional components with TypeScript
const LicenseCard: React.FC<LicenseCardProps> = ({ 
  license, 
  isSelected, 
  onSelect 
}) => {
  // Component logic
  return (
    <div className="license-card">
      {/* JSX */}
    </div>
  );
};

// ✅ Custom hooks for logic separation
const useLicenseSelection = (initialLicense?: License) => {
  const [selectedLicense, setSelectedLicense] = useState(initialLicense);
  
  const selectLicense = useCallback((license: License) => {
    setSelectedLicense(license);
  }, []);
  
  return { selectedLicense, selectLicense };
};
\`\`\`

### CSS/Tailwind Guidelines

\`\`\`typescript
// ✅ استفاده از Tailwind classes
const Button = ({ variant = 'primary', children }) => (
  <button 
    className={cn(
      'px-4 py-2 rounded-md font-medium transition-colors',
      variant === 'primary' && 'bg-emerald-600 text-white hover:bg-emerald-700',
      variant === 'secondary' && 'bg-gray-200 text-gray-900 hover:bg-gray-300'
    )}
  >
    {children}
  </button>
);

// ✅ استفاده از cn utility برای conditional classes
import { cn } from '@/lib/utils';
\`\`\`

### Persian/RTL Guidelines

\`\`\`typescript
// ✅ RTL-aware styling
const PersianText = ({ children }) => (
  <p className="text-right direction-rtl font-vazirmatn">
    {children}
  </p>
);

// ✅ Persian number formatting
const formatPersianNumber = (num: number): string => {
  return num.toLocaleString('fa-IR');
};

// ✅ Proper Persian text handling
const persianText = {
  license: 'پروانه',
  choose: 'انتخاب کنید',
  download: 'دانلود'
};
\`\`\`

## فرآیند توسعه | Development Process

### Git Workflow

\`\`\`bash
# 1. همگام‌سازی با upstream
git fetch upstream
git checkout main
git merge upstream/main

# 2. ایجاد branch جدید
git checkout -b feature/add-new-license-type
# یا
git checkout -b fix/license-generation-bug
# یا
git checkout -b docs/update-contributing-guide

# 3. انجام تغییرات و commit
git add .
git commit -m "feat: add Creative Commons Zero license support

- Add CC0 license to license database
- Update license filtering logic
- Add tests for CC0 license generation
- Update documentation

Closes #123"

# 4. Push کردن branch
git push origin feature/add-new-license-type

# 5. ایجاد Pull Request
# از رابط GitHub
\`\`\`

### Commit Message Convention

\`\`\`bash
# Format: type(scope): description
#
# Types:
feat:     ویژگی جدید
fix:      رفع باگ
docs:     تغییرات مستندات
style:    تغییرات فرمت کد (بدون تغییر منطق)
refactor: بازسازی کد
test:     افزودن یا تغییر تست‌ها
chore:    تغییرات ابزارها و پیکربندی

# Examples:
feat(licenses): add MIT license support
fix(ui): resolve mobile layout issues
docs(readme): update installation instructions
style(components): format code with prettier
refactor(hooks): simplify license selection logic
test(utils): add tests for license filtering
chore(deps): update dependencies
\`\`\`

### Pull Request Process

#### 1. آماده‌سازی PR | PR Preparation
\`\`\`bash
# بررسی کیفیت کد
npm run lint
npm run type-check
npm run test

# اجرای build
npm run build

# بررسی bundle size
npm run analyze
\`\`\`

#### 2. PR Template
\`\`\`markdown
## توضیحات | Description
<!-- توضیح کوتاهی از تغییرات -->

## نوع تغییر | Type of Change
- [ ] Bug fix (تغییری که مشکل موجود را حل می‌کند)
- [ ] New feature (تغییری که قابلیت جدید اضافه می‌کند)
- [ ] Breaking change (تغییری که سازگاری با نسخه قبل را می‌شکند)
- [ ] Documentation update (تغییرات مستندات)

## تست | Testing
- [ ] تست‌های موجود همچنان پاس می‌شوند
- [ ] تست‌های جدید برای تغییرات اضافه شده‌اند
- [ ] تست دستی انجام شده است

## Checklist
- [ ] کد از linting rules پیروی می‌کند
- [ ] تغییرات self-review شده‌اند
- [ ] مستندات به‌روزرسانی شده‌اند
- [ ] تست‌ها اضافه شده‌اند
\`\`\`

#### 3. Review Process
\`\`\`bash
# مراحل بررسی
1. Automated checks (CI/CD)
2. Code review توسط maintainers
3. Testing و QA
4. Approval و merge
\`\`\`

## تست‌نویسی | Testing

### Test Structure
\`\`\`
tests/
├── __mocks__/           # Mock files
├── unit/                # Unit tests
│   ├── components/
│   ├── hooks/
│   └── utils/
├── integration/         # Integration tests
│   └── workflows/
└── e2e/                # End-to-end tests
    └── scenarios/
\`\`\`

### Unit Testing Examples

\`\`\`typescript
// tests/unit/utils/licenseUtils.test.ts
import { filterLicenses, generateLicenseText } from '@/utils/licenseUtils';
import { licenses } from '@/data/licenses';

describe('licenseUtils', () => {
  describe('filterLicenses', () => {
    it('should filter licenses by project type', () => {
      const criteria = {
        projectType: 'software',
        allowCommercial: true,
        requireSameLicense: false
      };
      
      const result = filterLicenses(licenses, criteria);
      
      expect(result).toHaveLength(3);
      expect(result.map(l => l.id)).toContain('mit');
    });
  });
  
  describe('generateLicenseText', () => {
    it('should generate license text with copyright info', () => {
      const license = licenses.find(l => l.id === 'mit')!;
      const copyrightInfo = {
        year: '2024',
        holder: 'John Doe'
      };
      
      const result = generateLicenseText(license, copyrightInfo);
      
      expect(result).toContain('Copyright (c) 2024 John Doe');
    });
  });
});
\`\`\`

### Component Testing

\`\`\`typescript
// tests/unit/components/QuestionSection.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { QuestionSection } from '@/components/QuestionSection';

describe('QuestionSection', () => {
  const mockProps = {
    formData: {
      projectType: 'software',
      allowCommercial: true
    },
    onFormChange: jest.fn(),
    errors: {}
  };
  
  it('should render project type question', () => {
    render(<QuestionSection {...mockProps} />);
    
    expect(screen.getByText('نوع پروژه شما چیست؟')).toBeInTheDocument();
  });
  
  it('should call onFormChange when option is selected', () => {
    render(<QuestionSection {...mockProps} />);
    
    const softwareOption = screen.getByLabelText('نرم‌افزار');
    fireEvent.click(softwareOption);
    
    expect(mockProps.onFormChange).toHaveBeenCalledWith({
      projectType: 'software'
    });
  });
});
\`\`\`

### Running Tests

\`\`\`bash
# اجرای تمام تست‌ها
npm test

# اجرای تست‌ها در watch mode
npm run test:watch

# اجرای تست‌ها با coverage
npm run test:coverage

# اجرای تست‌های E2E
npm run test:e2e
\`\`\`

## مستندسازی | Documentation

### Code Documentation

\`\`\`typescript
/**
 * فیلتر کردن پروانه‌ها بر اساس معیارهای انتخاب شده
 * 
 * @param licenses - لیست تمام پروانه‌های موجود
 * @param criteria - معیارهای انتخاب کاربر
 * @returns لیست پروانه‌های فیلتر شده
 * 
 * @example
 * \`\`\`typescript
 * const filtered = filterLicenses(allLicenses, {
 *   projectType: 'software',
 *   allowCommercial: true
 * });
 * ```
 */
export const filterLicenses = (
  licenses: License[], 
  criteria: SelectionCriteria
): License[] => {
  // Implementation
};
\`\`\`

### README Updates

\`\`\`markdown
# هنگام افزودن ویژگی جدید، README را به‌روزرسانی کنید:

## ✨ ویژگی‌های جدید
- پشتیبانی از پروانه Creative Commons Zero
- بهبود الگوریتم توصیه پروانه
- افزودن قابلیت مقایسه پروانه‌ها
\`\`\`

## رفع مشکلات رایج | Troubleshooting

### مشکلات Development

\`\`\`bash
# مشکل: npm install fails
حل: rm -rf node_modules package-lock.json && npm install

# مشکل: TypeScript errors
حل: npm run type-check && رفع خطاهای گزارش شده

# مشکل: Linting errors
حل: npm run lint:fix

# مشکل: Build fails
حل: بررسی console errors و رفع مشکلات import/export
\`\`\`

### مشکلات Git

\`\`\`bash
# مشکل: Merge conflicts
git fetch upstream
git rebase upstream/main
# حل conflicts دستی
git add .
git rebase --continue

# مشکل: Wrong commit message
git commit --amend -m "new message"

# مشکل: Need to update PR
git push --force-with-lease origin branch-name
\`\`\`

## Community Guidelines

### Code of Conduct

1. **احترام متقابل**: با تمام مشارکت‌کنندگان با احترام رفتار کنید
2. **سازندگی**: نقدها و پیشنهادات سازنده ارائه دهید
3. **صبر و حوصله**: به یاد داشته باشید همه در حال یادگیری هستند
4. **شمولیت**: محیطی فراگیر و دوستانه ایجاد کنید

### Communication

- **زبان**: فارسی یا انگلیسی
- **Issues**: برای بحث‌های عمومی
- **Discussions**: برای سوالات و ایده‌ها
- **Email**: برای موضوعات حساس

## تشکر | Recognition

### Contributors

تمام مشارکت‌کنندگان در فایل [CONTRIBUTORS.md](./CONTRIBUTORS.md) ذکر می‌شوند.

### Types of Recognition

- **Code Contributors**: مشارکت در کد
- **Documentation Contributors**: بهبود مستندات  
- **Bug Reporters**: گزارش مشکلات
- **Feature Requesters**: پیشنهاد ویژگی‌ها
- **Community Helpers**: کمک به سایر کاربران

---

با تشکر از مشارکت شما در بهبود انتخابگر پروانه متن‌باز فارسی! 🙏

برای سوالات بیشتر، لطفاً Issue ایجاد کنید یا با نگهدارندگان پروژه تماس بگیرید.
