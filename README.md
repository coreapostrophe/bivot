# AwwBot

A simple Discord bot that uses intents to post pictures from r/aww.

## Features

- **TypeScript**: Full TypeScript support with proper type definitions
- **Modern Build**: Uses Rolldown for fast bundling
- **Cloudflare Workers**: Runs on Cloudflare Workers platform
- **Discord Integration**: Handles Discord slash commands and interactions

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.dev.vars` file with your Discord bot credentials:
   ```env
   DISCORD_TOKEN=your_bot_token
   DISCORD_PUBLIC_KEY=your_public_key
   DISCORD_APPLICATION_ID=your_application_id
   ```

### Development Commands

- **Build**: `npm run build` - Build all TypeScript files with esbuild
- **Build Server**: `npm run build:server` - Build only the server file
- **Dev Build**: `npm run dev` - Watch mode for server development
- **Start**: `npm start` - Start the Wrangler dev server
- **Lint**: `npm run lint` - Run ESLint
- **Fix**: `npm run fix` - Auto-fix ESLint issues
- **Register**: `npm run register` - Register Discord slash commands

### Project Structure

```
src/
├── commands.ts      # Discord command definitions
├── reddit.ts        # Reddit API integration
├── server.ts        # Main server logic
└── register.ts      # Command registration script

test/
└── server.test.ts   # Test suite

dist/                # Built JavaScript files (generated)
```

## Build Process

The project uses esbuild to bundle TypeScript files:

1. TypeScript source files are compiled and bundled using esbuild
2. Output is placed in the `dist/` directory with source maps
3. Wrangler uses the bundled `dist/server.js` as the entry point
4. Build configuration is centralized in `esbuild.config.js`

## Deployment

Deploy to Cloudflare Workers:

```bash
npm run publish
```
