# Frontend - Next.js Website

A production-ready, modern Next.js website for Marvel fans featuring the MCU timeline, legendary heroes, and stunning animations.

## Features

- **Hero Section**: Stunning animated intro with Marvel-themed gradient effects
- **Featured Characters**: Interactive cards showing Iron Man, Captain America, Thor, and Spider-Man with animated stats
- **MCU Timeline**: Complete Phase 1-5 timeline with movie listings
- **Statistics**: By-the-numbers section showing MCU achievements
- **Newsletter**: Email subscription form with validation
- **Responsive Design**: Fully responsive for all devices
- **Dark Theme**: Sleek dark aesthetic with Marvel red accents
- **Framer Motion**: Smooth animations and transitions throughout

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Project Structure

```
frontend/                   # Next.js application directory
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page with all sections
│   └── globals.css         # Global styles & Tailwind
├── components/
│   ├── Hero.tsx            # Animated hero section
│   ├── FeaturedCharacters.tsx  # Character showcase cards
│   ├── Timeline.tsx        # MCU Phase timeline
│   ├── Stats.tsx           # Statistics grid
│   ├── Newsletter.tsx      # Email subscription
│   └── Footer.tsx          # Site footer
├── ecosystem.config.js     # PM2 process configuration
└── ...
```

## Customization

### Adding New Characters

Edit `components/FeaturedCharacters.tsx` and add to the `characters` array:

```typescript
{
  name: "Character Name",
  realName: "Real Name",
  description: "Description here",
  icon: IconComponent,
  color: "from-color1 to-color2",
  stats: { strength: 90, intelligence: 85, speed: 80, durability: 85 },
}
```

### Updating Timeline

Edit `components/Timeline.tsx` and modify the `phases` array to add new phases or update existing ones.

### Changing Colors

The primary Marvel red is defined in:
- `tailwind.config.ts` as `marvel.red`
- `app/globals.css` CSS variables
- Component files using Tailwind classes

## Production Build

The site is configured for static export:

```bash
npm run build
```

This creates a `dist` folder with static files ready for deployment to any hosting platform (Vercel, Netlify, GitHub Pages, etc.)

## License

This is a fan-made project and is not affiliated with Marvel Entertainment.

---

**Made with ❤️ for true believers**

---

## Deployment

See [VPS-DEPLOY.md](VPS-DEPLOY.md) for PM2 deployment instructions on a VPS.

**Project Structure:**
- Root: `/srv/marvel/` (git repository)
- App: `/srv/marvel/frontend/` (Next.js application)
- PM2 Process: `frontend`
- Logs: `/var/log/pm2/frontend.log`