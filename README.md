# discord-ai-crew
Discord bot with ChatGPT connection

## Discord usage
- /t {prompt} = sends {prompt} to ChatGPT and returns the answer

## Start (for Devs)
- ~/.env file must contain
  - DISCORD_TOKEN=
  - DISCORD_CLIENT_ID=
  - DISCORD_GUILD_ID=
  - CHATGPT_API_KEY=
  - CLICKUP_API_KEY=
- npm i
- node index.js
- node deploy-commands.js ##to deploy to discord

## Discord usage (For Devs)
- /r = reloads new commands (runs "node deploy-commands.js")

## Other links (For Devs)
- Create ChatGPT API key: https://platform.openai.com/api-keys (this costs money)
- Create Discord API keys: just google it bro
