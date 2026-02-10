# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```
Expatriates-master-main
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ calendar-deal-list.svg
│  ├─ flags
│  │  ├─ eg.webp
│  │  ├─ es.webp
│  │  ├─ fr.webp
│  │  ├─ gb.webp
│  │  └─ us.webp
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ AboutUniversity.jpg
│  │  ├─ CurveLine.svg
│  │  ├─ flags
│  │  │  ├─ eg.webp
│  │  │  ├─ es.webp
│  │  │  ├─ fr.webp
│  │  │  ├─ gb.webp
│  │  │  └─ us.webp
│  │  ├─ home_image.jpg
│  │  ├─ image-1-1.htm
│  │  ├─ image-940x580 (2).jpg
│  │  ├─ image-940x580 (3).jpg
│  │  ├─ image-940x580 (4).jpg
│  │  ├─ image.png
│  │  ├─ image2.png
│  │  ├─ MNF_logo.png
│  │  ├─ Polygon 2.svg
│  │  ├─ raes.jpg
│  │  ├─ University.jpg
│  │  └─ University2.jpg
│  ├─ Collages
│  │  ├─ Collages.css
│  │  └─ Collages.tsx
│  ├─ components
│  │  ├─ DeleteConfirmModal.css
│  │  └─ DeleteConfirmModal.jsx
│  ├─ ContactUsPage
│  │  ├─ ContactUs.css
│  │  └─ ContactUs.tsx
│  ├─ custom.d.ts
│  ├─ HomePage
│  │  ├─ About
│  │  │  ├─ About.css
│  │  │  └─ About.tsx
│  │  ├─ Carousel
│  │  │  ├─ Carousel.css
│  │  │  └─ Carousel.tsx
│  │  ├─ Footer
│  │  │  ├─ Footer.css
│  │  │  └─ Footer.tsx
│  │  ├─ Header
│  │  │  ├─ Header.css
│  │  │  └─ Header.tsx
│  │  ├─ Hero
│  │  │  ├─ Hero.css
│  │  │  └─ Hero.tsx
│  │  └─ Home.tsx
│  ├─ hooks
│  │  └─ useAuth.js
│  ├─ i18n.ts
│  ├─ index.css
│  ├─ Local
│  │  ├─ AR
│  │  │  ├─ College.json
│  │  │  ├─ Contact.json
│  │  │  ├─ Home.json
│  │  │  ├─ Login.json
│  │  │  ├─ News.json
│  │  │  ├─ NewsDetails.json
│  │  │  └─ Programs.json
│  │  ├─ AS
│  │  │  ├─ College.json
│  │  │  ├─ Contact.json
│  │  │  ├─ Home.json
│  │  │  ├─ Login.json
│  │  │  ├─ News.json
│  │  │  ├─ NewsDetails.json
│  │  │  └─ Programs.json
│  │  ├─ DE
│  │  │  ├─ College.json
│  │  │  ├─ Contact.json
│  │  │  ├─ Home.json
│  │  │  ├─ Login.json
│  │  │  ├─ News.json
│  │  │  ├─ NewsDetails.json
│  │  │  └─ Programs.json
│  │  ├─ EN
│  │  │  ├─ College.json
│  │  │  ├─ Contact.json
│  │  │  ├─ Home.json
│  │  │  ├─ Login.json
│  │  │  ├─ News.json
│  │  │  ├─ NewsDetails.json
│  │  │  └─ Programs.json
│  │  ├─ FA
│  │  │  ├─ College.json
│  │  │  ├─ Contact.json
│  │  │  ├─ Home.json
│  │  │  ├─ Login.json
│  │  │  ├─ News.json
│  │  │  ├─ NewsDetails.json
│  │  │  └─ Programs.json
│  │  ├─ FR
│  │  │  ├─ College.json
│  │  │  ├─ Contact.json
│  │  │  ├─ Home.json
│  │  │  ├─ Login.json
│  │  │  ├─ News.json
│  │  │  ├─ NewsDetails.json
│  │  │  └─ Programs.json
│  │  ├─ IT
│  │  │  ├─ College.json
│  │  │  ├─ Contact.json
│  │  │  ├─ Home.json
│  │  │  ├─ Login.json
│  │  │  ├─ News.json
│  │  │  ├─ NewsDetails.json
│  │  │  └─ Programs.json
│  │  ├─ JA
│  │  │  ├─ College.json
│  │  │  ├─ Contact.json
│  │  │  ├─ Home.json
│  │  │  ├─ Login.json
│  │  │  ├─ News.json
│  │  │  ├─ NewsDetails.json
│  │  │  └─ Programs.json
│  │  ├─ RU
│  │  │  ├─ College.json
│  │  │  ├─ Contact.json
│  │  │  ├─ Home.json
│  │  │  ├─ Login.json
│  │  │  ├─ News.json
│  │  │  ├─ NewsDetails.json
│  │  │  └─ Programs.json
│  │  ├─ TR
│  │  │  ├─ College.json
│  │  │  ├─ Contact.json
│  │  │  ├─ Home.json
│  │  │  ├─ Login.json
│  │  │  ├─ News.json
│  │  │  ├─ NewsDetails.json
│  │  │  └─ Programs.json
│  │  └─ ZH
│  │     ├─ College.json
│  │     ├─ Contact.json
│  │     ├─ Home.json
│  │     ├─ Login.json
│  │     ├─ News.json
│  │     ├─ NewsDetails.json
│  │     └─ Programs.json
│  ├─ LoginPage
│  │  ├─ Login.css
│  │  └─ Login.tsx
│  ├─ main.jsx
│  ├─ NewsDetails
│  │  ├─ Details.css
│  │  ├─ Details.tsx
│  │  └─ test.js
│  ├─ NewsPage
│  │  ├─ AddNews.css
│  │  ├─ AddNews.tsx
│  │  ├─ EditNews.tsx
│  │  ├─ News.css
│  │  ├─ News.tsx
│  │  ├─ SectionOne
│  │  │  ├─ SectionOne.css
│  │  │  └─ SectionOne.tsx
│  │  └─ SectionTow
│  │     ├─ SectionTow.css
│  │     └─ SectionTow.tsx
│  ├─ ProgramsPage
│  │  ├─ Programs.css
│  │  └─ Programs.tsx
│  ├─ Services
│  │  └─ api.js
│  └─ TestPage
│     └─ index.tsx
├─ vercel.json
├─ vite.config.js
└─ _Vercel.json

```