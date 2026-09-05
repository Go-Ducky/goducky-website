# GoDucky Website

The official website for GoDucky - the open source AI coding agent. Built with Next.js, Tailwind CSS, and deployed on Vercel.

![GoDucky](public/logo.jpeg)

## Features

- Modern, responsive design matching opencode.ai aesthetic
- Light / Dark / System theme toggle
- Terminal-style install command tabs (macOS/Linux, Windows)
- Live GitHub stats auto-updated in real-time (refresh every 60s)
- About page with real org members and contributors from GitHub
- Full Privacy Policy and Terms of Service pages
- Interactive documentation with search and categories
- Download page with install, update, and uninstall commands
- Mobile-friendly navigation

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, features, stats, FAQ |
| `/about` | About page with live org members and contributors |
| `/docs` | Interactive documentation (search + categories) |
| `/download` | Install, update, and uninstall commands |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/api/github-stats` | GET endpoint returning live GitHub org stats |
| `/api/github-org` | GET endpoint returning org members and contributors |

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm, yarn, or pnpm

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/Go-Ducky/goducky-website.git
cd goducky-website
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Deploying to Vercel

### Option 1: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option 2: Deploy via Git (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the `Go-Ducky/goducky-website` repository
4. Click **Deploy**

Vercel will automatically detect Next.js and configure build settings.

## Project Structure

```
goducky-website/
├── public/
│   └── logo.jpeg
├── src/
│   ├── app/
│   │   ├── globals.css          # Design tokens (light/dark)
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── about/page.tsx       # About (live org members/contributors)
│   │   ├── privacy/page.tsx     # Privacy Policy
│   │   ├── terms/page.tsx       # Terms of Service
│   │   ├── docs/page.tsx        # Documentation
│   │   ├── download/page.tsx    # Download page
│   │   ├── api/github-stats/
│   │   │   └── route.ts         # Live GitHub org stats endpoint
│   │   └── api/github-org/
│   │       └── route.ts         # Org members + contributors endpoint
│   └── components/
│       ├── Header.tsx           # Sticky nav with theme toggle
│       ├── ThemeToggle.tsx      # Light/Dark/System switch
│       ├── ThemeProvider.tsx    # next-themes wrapper
│       ├── Hero.tsx             # Hero section
│       ├── Features.tsx         # Feature list
│       ├── Stats.tsx            # Live GitHub stats
│       ├── Privacy.tsx          # Privacy blurb
│       ├── FAQ.tsx              # Accordion FAQ
│       ├── DocsView.tsx         # Interactive docs
│       ├── InstallCommands.tsx  # Install command tabs
│       ├── UpdateCommands.tsx   # Update commands
│       ├── UninstallCommands.tsx # Uninstall command tabs
│       └── Footer.tsx           # Footer + legal bar
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── next.config.js
```

## Customization

Edit CSS custom properties in `src/app/globals.css` to change the color scheme. The design tokens follow HSL values for both light and dark modes.

## License

MIT License

## Links

- [GitHub](https://github.com/Go-Ducky)
- [Website](https://goducky.org)
