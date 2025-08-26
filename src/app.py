import os

import discord
from discord import app_commands
from dotenv import load_dotenv

intents = discord.Intents.default()

bot = discord.Client(intents=intents)
tree = app_commands.CommandTree(bot)


@bot.event
async def on_ready():
    print(f'🚀 {bot.user} has connected to Discord!')
    print(f'📊 Connected to {len(bot.guilds)} guilds')

    await tree.sync()
    print('✅ Slash commands synced!')


@tree.command(name="hello", description="Say hello to the world!")
async def hello(interaction: discord.Interaction):
    await interaction.response.send_message("Hello, World! 👋")

if __name__ == "__main__":
    load_dotenv()

    TOKEN = os.getenv('DISCORD_TOKEN')

    if not TOKEN:
        print("❌ Error: DISCORD_TOKEN not found in environment variables!")
        print("Please create a .env file with your Discord bot token:")
        print("DISCORD_TOKEN=your_bot_token_here")
        exit(1)

    print("🚀 Starting Discord bot...")
    print("📝 Make sure to create a .env file with your DISCORD_TOKEN")

    try:
        bot.run(TOKEN)
    except discord.LoginFailure:
        print(
            "❌ Invalid bot token! Please check your DISCORD_TOKEN in .env file"
        )
    except Exception as e:
        print(f"❌ Error starting bot: {e}")
