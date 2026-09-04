# GoDucky Website

The official website for GoDucky - the open source AI coding agent. Built with Next.js, Tailwind CSS, and deployed on Vercel.

![GoDucky](public/logo.jpeg)

## Features

- Modern, responsive design
- Light / Dark / System theme toggle
- Smooth animations and transitions
- Mobile-friendly navigation
- SEO optimized

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
git clone https://github.com/go-ducky/goducky-website.git
cd goducky-website
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Deploying to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Run the deployment:

```bash
vercel
```

3. Follow the prompts to link your project to Vercel.

### Option 2: Deploy via Git

1. Push your code to GitHub:

```bash
git remote add origin https://github.com/go-ducky/goducky-website.git
git push -u origin main
```

2. Go to [vercel.com/new](https://vercel.com/new)

3. Import your GitHub repository

4. Vercel will automatically detect Next.js and configure the build settings

5. Click **Deploy**

### Option 3: Deploy via Vercel Dashboard

1. Fork or push this repository to your GitHub account

2. Visit [vercel.com/dashboard](https://vercel.com/dashboard)

3. Click **New Project**

4. Select your repository

5. Keep the default settings and click **Deploy**

### Environment Variables

No environment variables are required for the basic website. If you add features that require them, create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://goducky.dev
```

## Project Structure

```
goducky-website/
├── public/
│   └── logo.jpeg              # GoDucky logo
├── src/
│   ├── app/
│   │   ├── globals.css        # Global styles with theme variables
│   │   ├── layout.tsx         # Root layout with ThemeProvider
│   │   └── page.tsx           # Home page
│   └── components/
│       ├── Header.tsx         # Navigation header with mobile menu
│       ├── Hero.tsx           # Hero section with terminal animation
│       ├── Features.tsx       # Features grid
│       ├── Stats.tsx          # Statistics section
│       ├── Privacy.tsx        # Privacy section
│       ├── FAQ.tsx            # FAQ accordion
│       ├── CTA.tsx            # Call to action / newsletter
│       ├── Footer.tsx         # Footer
│       ├── ThemeProvider.tsx   # next-themes provider wrapper
│       └── ThemeToggle.tsx    # Light / Dark / System toggle button
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── next.config.js
└── postcss.config.js
```

## Customization

### Changing Theme Colors

Edit the CSS variables in `src/app/globals.css` to customize the color scheme:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  /* ... */
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
  /* ... */
}
```

### Adding New Sections

Create new components in `src/components/` and import them in `src/app/page.tsx`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License

## Links

- [GitHub](https://github.com/go-ducky)
- [Website](https://goducky.dev)
