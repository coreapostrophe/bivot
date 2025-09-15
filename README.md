# 🤖 Bivot - Discord Bot

A Bivo Discord bot built with TypeScript and deployed on Cloudflare Workers. This is a monorepo containing multiple packages for different bot functionalities.

## 📁 Project Structure

This monorepo uses [Turbo](https://turbo.build/) for build orchestration and contains the following packages:

- `packages/interactions` - Main Discord bot interactions package with slash commands and event handling

## 🤝 Contributing

### Prerequisites

- [Docker](https://www.docker.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- A Discord application and bot token

### Getting Started

1. **Start the DevContainer**
   - Open this project in VS Code with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
   - The devcontainer will automatically install dependencies and set up the environment

2. **Create a Development Discord Bot**
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a new application
   - Go to the "Bot" section and create a bot
   - Copy the bot token
   - Go to "General Information" and copy the Application ID and Public Key

3. **Set Up Environment Variables**

   ```bash
   cp packages/interactions/example.env packages/interactions/.env
   ```

   Fill in your Discord bot credentials in `.env`:

   ```env
   DISCORD_APPLICATION_ID=your_application_id
   DISCORD_PUBLIC_KEY=your_public_key
   DISCORD_TOKEN=your_bot_token
   ```

4. **Start Development**

   ```bash
   npm run dev
   ```

   This starts the Cloudflare Workers development server on `http://localhost:8787`

5. **Register Commands**

   ```bash
   npm run register -w @bivot/interactions
   ```

6. **Invite Bot to Server**

   Use the install link of your application inside the Discord Developer Portal, and add the bot to the server.

### Adding New Commands

1. Create a new directory under `packages/interactions/src/features/` for your command
2. Create a command class that extends `BivotCommand`:

   ```typescript
   import { SlashCommandBuilder } from '@discordjs/builders';
   import {
     BivotCommand,
     BivotCommandInteraction,
     BivotCommandResponse,
   } from '../../shared/command';

   export class MyCommand extends BivotCommand {
     constructor() {
       super(
         new SlashCommandBuilder()
           .setName('mycommand')
           .setDescription('My awesome command')
       );
     }

     async respond(
       interaction: BivotCommandInteraction
     ): Promise<BivotCommandResponse> {
       return interaction.respondMessage('Hello from my command!');
     }
   }
   ```

3. Create a feature class that extends `BivotFeature`:

   ```typescript
   export class MyFeature extends BivotFeature {
     constructor() {
       super([new MyCommand()]);
     }
   }
   ```

4. Instantiated the feature in `packages/interactions/src/index.ts`.
