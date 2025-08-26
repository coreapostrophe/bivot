# 🤖 Bivot

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- Discord Bot Token (from Discord Developer Portal)
- Docker and Docker Compose
- VS Code with Dev Containers extension (for development)

### Development

#### Option 1: Local Development

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up your bot token:**
   ```bash
   cp env.example .env
   # Edit .env and add your Discord bot token
   ```

3. **Run the bot:**
   ```bash
   python app.py
   ```

4. **Invite the bot to your server:**
   Use the OAuth2 URL from Discord Developer Portal

#### Option 2: Dev Container (Recommended)

1. **Open in VS Code:**
   - Install the "Dev Containers" extension
   - Open the project folder
   - Click "Reopen in Container" when prompted

2. **The container will automatically:**
   - Install Python dependencies
   - Set up the development environment

3. **Set up your bot token:**
   ```bash
   cp env.example .env
   # Edit .env and add your Discord bot token
   ```

4. **Run the bot:**
   ```bash
   python src/app.py
   ```

### Production Deployment

#### Simple Production Build

```bash
# Build and run production container
docker-compose --profile prod up -d

# The bot will run in the background
```

#### Manual Docker Build

```bash
# Build the image
docker build -t discord-bot .

# Run the container
docker run --env-file .env discord-bot
```
