# MuhKartal Portfolio

A modern, responsive, and interactive developer portfolio website built with React, TypeScript, and Tailwind CSS.

![Project Preview](public/preview-image.png)

## 🚀 Features

- **Modern Tech Stack**: Built with React 18, TypeScript, and Vite for lightning-fast performance.
- **Responsive Design**: Fully responsive layout that looks great on mobile, tablet, and desktop.
- **Dark/Light Mode**: Seamless theme switching with system preference detection.
- **Interactive UI**:
  - Smooth parallax scrolling effects
  - Custom animations using Motion (formerly Framer Motion)
  - Interactive project gallery
- **Clean Architecture**:
  - Modular component structure
  - Reusable UI components (based on shadcn/ui)
  - Type-safe codebase

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) (Headless accessible components)
- **Animations**: [Motion](https://motion.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/muhkartal/muhkartalWeb.git
   cd muhkartalWeb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # React components
│   ├── sections/    # Page sections (Hero, About, Projects, etc.)
│   ├── ui/          # Reusable UI components (Button, Card, etc.)
│   └── ...
├── guidelines/      # Design and content guidelines
├── hooks/           # Custom React hooks
├── layouts/         # Layout wrapper components
├── stores/          # Global state management
└── main.tsx         # Entry point
```

## 🎨 Customization

### Personalization
Edit the content in `src/components/HomePage.tsx` and the section components within `src/components/sections/` to update your personal information, experience, and projects.

### Theme
The project uses Tailwind CSS variables for theming. You can adjust the color palette in `src/index.css`.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by [Muhammed Kartal](https://github.com/muhkartal)
