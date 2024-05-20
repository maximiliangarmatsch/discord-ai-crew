# discord-ai-crew
Discord bot with ChatGPT connection

## Start
- ~/.env file must contain
  - DISCORD_TOKEN=
  - DISCORD_CLIENT_ID=
  - DISCORD_GUILD_ID=
  - CHATGPT_API_KEY=
  - CLICKUP_API_KEY=
- npm i
- node index.js
- node deploy-commands.js ##to deploy to discord

## Discord usage
- /r = runs "node deploy-commands.js"
- /t {prompt} = sends {prompt} to ChatGPT and returns the answer

## Other links
- Create ChatGPT API key: https://platform.openai.com/api-keys (this costs money)
- Create Discord API keys: just google it bro
