# Gravitris

A modern Tetris-inspired block puzzle game with gravity mechanics, built with Next.js 16 and deployed on Vercel.

## 🎮 Features

- **Gravity-based block mechanics** - Blocks fall and stack with realistic physics
- **Global leaderboard** - Compete with players worldwide
- **Game replays** - Watch and share your best games
- **Stats tracking** - Track total lines cleared and games played across all users
- **Auto-generated nicknames** - Cool names like "ThunderFox" and "CosmicDragon"
- **Responsive design** - Play on desktop or mobile

## 🚀 Tech Stack

- **Framework:** Next.js 16 (React 19)
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Deployment:** Vercel
- **Styling:** Bootstrap + Custom CSS
- **Game Engine:** Custom Canvas-based renderer

## 🛠️ Development

### Prerequisites

- Node.js 20+
- PostgreSQL database (or Neon account)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/frkandris/gravitris.git
cd gravitris
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your database URL:
```
DATABASE_URL="postgresql://..."
# or for Neon:
POSTGRES_PRISMA_URL="postgresql://..."
```

4. Run database migrations:
```bash
npx prisma db push
```

5. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to play!

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
gravitris/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── page.tsx      # Home page with nickname input
│   │   ├── game/         # Game canvas page
│   │   ├── leaderboard/  # Global leaderboard
│   │   ├── about/        # Stats and info
│   │   └── api/          # API routes
│   └── lib/              # Utility functions
│       ├── prisma.ts     # Database client
│       ├── env.ts        # Environment config
│       └── nameGenerator.ts  # Random name generation
├── public/game/          # Game engine (bundled JavaScript)
├── prisma/
│   └── schema.prisma     # Database schema
└── next.config.js        # Next.js configuration
```

## 🎯 Game Controls

- **←/→** - Move blocks left/right
- **↑/↓** - Rotate blocks
- **Space** - Instant drop

## 🗄️ Database Schema

### GameRecording
- Stores complete game replays with frame-by-frame events
- Tracks player name, score, level, and timestamp

### Counter
- Global counters for total lines cleared and games played

## 🌐 Deployment

The app is configured for seamless Vercel deployment:

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables (database URL)
4. Deploy!

### Important Vercel Configuration

- **Binary targets** in `prisma/schema.prisma` include `rhel-openssl-3.0.x` for Vercel
- **outputFileTracingIncludes** in `next.config.js` bundles Prisma binaries
- **Dynamic rendering** on database pages prevents build-time errors

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Feel free to open issues or submit pull requests.

## 🔗 Links

- **Play:** [gravitris.vercel.app](https://gravitris.vercel.app)
- **GitHub:** [github.com/frkandris/gravitris](https://github.com/frkandris/gravitris)