# گزینش‌گر پروانه آزاد فارسی 

<div align="center">

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/mirs0bhans-projects/v0-open-source-licence-chooser)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/FJl3NohzAiu)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**🌐 [مشاهده زنده | Live Demo](https://vercel.com/mirs0bhans-projects/v0-open-source-licence-chooser)**

</div>
<img width="1600" height="815" alt="image" src="https://github.com/user-attachments/assets/cfe4ecd6-193d-4f6d-9fe0-5de964e4965e" />


## 📋 فهرست مطالب | Table of Contents

- [درباره پروژه | About](#درباره-پروژه--about)
- [ویژگی‌ها | Features](#ویژگیها--features)
- [فناوری‌های استفاده شده | Tech Stack](#فناوریهای-استفاده-شده--tech-stack)
- [نحوه استفاده | Usage](#نحوه-استفاده--usage)
- [معماری | Architecture](#معماری--architecture)
- [مشارکت | Contributing](#مشارکت--contributing)
- [پروانه | License](#پروانه--license)

## 📖 درباره پروژه | About

انتخابگر پروانه متن‌باز فارسی ابزاری وب‌محور است که به توسعه‌دهندگان و سازندگان محتوا کمک می‌کند تا بهترین پروانه را برای پروژه‌های خود انتخاب کنند. این ابزار از پروانه‌های FOSS، Creative Commons، Open Data و Font پشتیبانی می‌کند.

### 🎯 هدف | Purpose

- **راهنمایی هوشمند**: سیستم سوال و جواب برای تشخیص نیازهای پروژه
- **پشتیبانی کامل از فارسی**: رابط کاربری RTL با فونت‌های فارسی
- **تولید خودکار**: ایجاد فایل‌های پروانه و کدهای README
- **دسترسی‌پذیری**: طراحی شده برای همه کاربران
- **بدون سرور**: کاملاً استاتیک و قابل اجرا در مرورگر

## ✨ ویژگی‌ها | Features

### 🔍 انتخاب هوشمند پروانه
- سیستم سوال و جواب تعاملی
- توصیه‌های شخصی‌سازی شده بر اساس نیازهای پروژه
- پشتیبانی از انواع مختلف پروانه‌ها

### 📝 تولید خودکار محتوا
- ایجاد فایل‌های پروانه کامل
- تولید کد README با اطلاعات پروانه
- کپی کردن آسان متن پروانه

### 🌐 پشتیبانی کامل از فارسی
- رابط کاربری RTL
- فونت‌های فارسی بهینه (Vazirmatn)
- ترجمه کامل تمام متون

### ♿ دسترسی‌پذیری
- پشتیبانی کامل از صفحه‌خوان
- ناوبری با کیبورد
- کنتراست رنگی مناسب
- برچسب‌های ARIA

### 📱 طراحی ریسپانسیو
- بهینه‌سازی برای موبایل
- ستون‌های قابل اسکرول
- تجربه کاربری یکسان در همه دستگاه‌ها

## 🛠 فناوری‌های استفاده شده | Tech Stack

### Frontend
- **Next.js 14** - React Framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

### Deployment
- **Vercel** - Serverless deployment platform
- **GitHub** - Version control and CI/CD

### اسکریپت‌های موجود | Available Scripts

\`\`\`bash
npm run dev          # اجرای سرور توسعه
npm run build        # ساخت برای تولید
npm run start        # اجرای سرور تولید
npm run lint         # بررسی کد
npm run type-check   # بررسی نوع‌ها
\`\`\`

## 📖 نحوه استفاده | Usage

### 1. انتخاب نوع پروژه
در ستون سمت راست، نوع پروژه خود را مشخص کنید:
- **نرم‌افزار**: برای کدهای برنامه‌نویسی
- **محتوا**: برای متن، تصاویر و رسانه
- **داده**: برای مجموعه داده‌ها
- **فونت**: برای فونت‌های طراحی شده

### 2. پاسخ به سوالات
بر اساس نوع پروژه، به سوالات مربوطه پاسخ دهید:
- آیا می‌خواهید دیگران کد شما را تجاری کنند؟
- آیا تغییرات باید با همان پروانه منتشر شوند؟
- آیا نیاز به حفاظت از علامت تجاری دارید؟

### 3. تکمیل اطلاعات کپی‌رایت
در ستون وسط، اطلاعات پروژه خود را وارد کنید:
- نام پروژه
- نام مالک کپی‌رایت
- سال ایجاد
- توضیحات (اختیاری)

### 4. انتخاب و دانلود پروانه
در ستون سمت چپ، پروانه‌های پیشنهادی را مشاهده کنید و:
- متن کامل پروانه را مطالعه کنید
- فایل پروانه را دانلود کنید
- کد README را کپی کنید

## 🏗 معماری | Architecture

### ساختار پروژه | Project Structure

\`\`\`
fosscc/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout اصلی
│   ├── page.tsx          # صفحه اصلی
│   └── globals.css       # استایل‌های سراسری
├── components/            # کامپوننت‌های UI
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
└── public/               # فایل‌های استاتیک
    └── manifest.json     # PWA Manifest
\`\`\`

### معماری کامپوننت | Component Architecture

\`\`\`mermaid
graph TD
    A[App Layout] --> B[Main Page]
    B --> C[Question Section]
    B --> D[Copyright Form]
    B --> E[License Recommendations]
    
    F[useLicenseChooser Hook] --> C
    F --> D
    F --> E
    
    G[License Data] --> F
    H[License Utils] --> F
\`\`\`

### جریان داده | Data Flow

1. **ورودی کاربر**: سوالات و اطلاعات کپی‌رایت
2. **پردازش**: فیلتر کردن پروانه‌ها بر اساس پاسخ‌ها
3. **نمایش**: لیست پروانه‌های مناسب
4. **خروجی**: فایل پروانه و کد README

## 🤝 مشارکت | Contributing

### راهنمای مشارکت

1. **Fork کردن پروژه**
2. **ایجاد شاخه جدید**
\`\`\`bash
git checkout -b feature/amazing-feature
\`\`\`

3. **اعمال تغییرات**
\`\`\`bash
git commit -m 'Add some amazing feature'
\`\`\`

4. **Push کردن تغییرات**
\`\`\`bash
git push origin feature/amazing-feature
\`\`\`

5. **ایجاد Pull Request**

### استانداردهای کد

- از TypeScript استفاده کنید
- از ESLint و Prettier پیروی کنید
- تست‌های مناسب بنویسید
- مستندات را به‌روزرسانی کنید

### گزارش مشکلات

برای گزارش باگ یا درخواست ویژگی جدید، از [GitHub Issues](https://github.com/MirS0bhan/fosscc/issues) استفاده کنید.

## 📄 پروانه | License

این پروژه تحت پروانه MIT منتشر شده است. برای جزئیات بیشتر فایل [LICENSE](LICENSE) را مطالعه کنید.

---

<div align="center">

**ساخته شده با ❤️ برای جامعه متن‌باز فارسی**

Made with ❤️ for the Persian Open Source Community

[🌟 ستاره بدهید](https://github.com/MirS0bhan/fosscc) | [🐛 گزارش مشکل](https://github.com/MirS0bhan/fosscc/issues) | [💡 پیشنهاد ویژگی](https://github.com/MirS0bhan/fosscc/issues/new)

</div>
