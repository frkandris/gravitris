# AI Agent Development Log

This document tracks the AI-assisted development process for Gravitris, including key decisions, challenges solved, and architectural choices.

## 🤖 Development Approach

This project was developed with significant AI assistance (Cascade/Claude), following a structured, iterative approach:

1. **Progressive Implementation** - Build features in logical stages with checkpoints
2. **Scope Management** - Implement only what's explicitly requested
3. **Quality Assurance** - Verify each component works before moving forward
4. **Minimal Changes** - Prefer targeted fixes over large refactors

## 🔧 Major Challenges & Solutions

### 1. Prisma + Vercel Deployment Issues

**Challenge:** Persistent "Query Engine not found for runtime rhel-openssl-3.0.x" errors on Vercel.

**Root Causes:**
- Next.js wasn't bundling Prisma's native query engine binaries into serverless functions
- Attempted to use Neon serverless adapter (@prisma/adapter-neon) which caused compatibility issues
- Pages were trying to pre-render at build time, accessing the database when it wasn't available

**Solution:**
```javascript
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  binaryTargets = ["native", "rhel-openssl-3.0.x"]
}

// next.config.js
{
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/.prisma/client/**/*'],
    '/': ['./node_modules/.prisma/client/**/*'],
  }
}

// All database pages
export const dynamic = 'force-dynamic'
```

**Key Learnings:**
- Use standard Prisma Client, NOT the Neon adapter
- Neon's pooled connection URLs work directly with standard Prisma
- `outputFileTracingIncludes` is critical for bundling native binaries
- `binaryTargets` must include both local platform and Vercel's runtime
- Force dynamic rendering to prevent build-time database access

### 2. Environment Variable Handling

**Challenge:** Vercel prefixes environment variables with project name (e.g., `gravitris_DATABASE_URL`).

**Solution:**
Created flexible environment resolver that checks both standard and prefixed variants:

```typescript
// src/lib/env.ts
export function getDatabaseUrl(): string {
  const envKeys = ['POSTGRES_PRISMA_URL', 'DATABASE_URL', ...]
  
  for (const key of envKeys) {
    // Check direct env var
    if (process.env[key]?.trim()) return process.env[key]
    
    // Check prefixed variant (e.g., gravitris_DATABASE_URL)
    const prefixedKey = Object.keys(process.env).find(
      envKey => envKey?.toUpperCase().endsWith(`_${key}`)
    )
    if (prefixedKey && process.env[prefixedKey]?.trim()) {
      return process.env[prefixedKey]
    }
  }
  throw new Error('Missing database URL')
}
```

### 3. Package.json Race Condition

**Challenge:** Next.js dev server randomly crashed with "EOF while parsing a value at line 1 column 0" when reading package.json.

**Solution:**
Configure webpack to ignore package.json during hot reload (dev only):

```javascript
webpack: (config, { isServer, dev }) => {
  if (!isServer && dev) {
    config.watchOptions = {
      ignored: ['**/node_modules', '**/package.json', '**/package-lock.json'],
    }
  }
  return config
}
```

### 4. Next.js 16 + Turbopack Compatibility

**Challenge:** Production builds failed with "This build is using Turbopack, with a webpack config and no turbopack config."

**Solution:**
Only apply webpack config during development:
```javascript
webpack: (config, { isServer, dev }) => {
  if (!isServer && dev) { // ← Added dev check
    // ... config
  }
}
```

## 🎨 Feature Development

### Player Name Generation System

**Requirements:**
- Always ensure players have a name
- Auto-generate on first visit
- Better names than "Anonymous X"
- Handle edge cases (empty string, null, direct game access)

**Implementation:**
- Created centralized `nameGenerator.ts` with cool combinations
- Auto-populate on home page load
- Fallback generation in game code
- Server-side fallback in save API
- Multiple entry points all ensure name exists

**Name Format:**
`[Adjective][Noun]` (e.g., "ThunderFox", "CosmicDragon", "NeonRaven")

### Database Page Optimization

**Challenge:** Next.js 16 tries to pre-render pages at build time by default.

**Solution:** Add `export const dynamic = 'force-dynamic'` to all pages that query the database:
- `/leaderboard`
- `/about`
- `/api/game/*`

This forces runtime rendering, preventing database access during build.

## 📦 Deployment Configuration

### Critical Files

**prisma/schema.prisma:**
- `binaryTargets = ["native", "rhel-openssl-3.0.x"]` for cross-platform support

**next.config.js:**
- `outputFileTracingIncludes` to bundle Prisma binaries
- Webpack config only in dev mode (Turbopack compatibility)

**package.json:**
- `postinstall: "prisma generate"` ensures binaries exist after npm install
- Build script: `prisma generate && next build` (no db push)

### Environment Variables on Vercel

Set these in Vercel dashboard:
- `gravitris_POSTGRES_PRISMA_URL` or `POSTGRES_PRISMA_URL`
- The `getDatabaseUrl()` function handles both naming conventions

## 🧹 Code Cleanup

During final cleanup phase, removed:
- Debug logging from Prisma and env modules
- Unused dependencies (@neondatabase/serverless, @prisma/adapter-neon, ws)
- AWS Elastic Beanstalk config files (.ebextensions, buildspec.yml)
- Debug scripts (copy-prisma-engines.js)
- Backup files (package.json.backup)

Result: Clean, production-ready codebase with minimal dependencies.

## 📊 Metrics

**Lines of Code Reduced:** ~400 (cleanup phase)
**Dependencies Removed:** 15 packages
**Build Time:** ~20-30s on Vercel
**Bundle Size:** Optimized for serverless

## 🎯 Best Practices Established

1. **Always use standard Prisma Client** - Don't add complexity with adapters unless absolutely necessary
2. **Test deployment early** - Catch platform-specific issues (like Vercel's RHEL runtime)
3. **Document environment setup** - Prefix handling, binary targets, etc.
4. **Fail-safe defaults** - Always provide fallbacks (e.g., name generation)
5. **Incremental development** - Build, test, verify, commit, deploy

## 🔮 Future Enhancements

Potential areas for expansion:
- Multiplayer mode
- Custom block themes
- Sound effects and music
- Mobile touch controls optimization
- User accounts and personal stats
- Achievement system
- Daily challenges

## 📚 Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React features
- **Prisma 6** - Type-safe database ORM
- **PostgreSQL** - Relational database (Neon hosted)
- **TypeScript** - Type safety
- **Vercel** - Serverless deployment platform
- **Bootstrap 5** - UI styling

## 🤝 Collaboration Notes

**Human-AI Workflow:**
1. User identifies feature/bug
2. AI researches codebase
3. AI proposes solution with explanation
4. User approves or provides feedback
5. AI implements and tests
6. Commit and deploy

**Key Success Factors:**
- Clear, specific requests from user
- AI explains reasoning behind decisions
- Iterative testing and verification
- Memory system to track project context
- Progressive complexity management

---

**Created:** October 2025
**Last Updated:** October 23, 2025
