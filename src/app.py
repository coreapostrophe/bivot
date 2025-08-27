import logging
import os

import discord
from discord import app_commands
from dotenv import load_dotenv

from telemetry import DiscordLogHandler

DiscordLogHandler()

logger = logging.getLogger('bivot')

intents = discord.Intents.default()
bot = discord.Client(intents=intents)
tree = app_commands.CommandTree(bot)


@bot.event
async def on_ready():
    logger.info(f'{bot.user} has connected to Discord!')
    logger.info(f'Connected to {len(bot.guilds)} guilds')

    await tree.sync()
    logger.info('Slash commands synced!')


@tree.command(name="hello", description="Say hello to the world!")
async def hello(interaction: discord.Interaction):
    await interaction.response.send_message("Hello, World! 👋")

if __name__ == "__main__":
    load_dotenv()

    TOKEN = os.getenv('DISCORD_TOKEN')

    if not TOKEN:
        logger.error("DISCORD_TOKEN not found in environment variables!")
        logger.error("Please create a .env file with your Discord bot token:")
        logger.error("DISCORD_TOKEN=your_bot_token_here")
        exit(1)

    logger.info("Starting Discord bot...")

    try:
        bot.run(TOKEN)
    except discord.LoginFailure:
        logger.error(
            "Invalid bot token! Please check your DISCORD_TOKEN in .env file"
        )
    except Exception as e:
        logger.error(f"Unable to start bot: {e}")
