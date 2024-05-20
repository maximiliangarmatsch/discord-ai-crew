const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	category: 'gpt',
	data    : new SlashCommandBuilder()
		.setName('t')
		.setDescription('"t" for "Terminator"')
		.addStringOption(option =>
			option.setName('prompt').setDescription('ChatGPT prompt')),
	async execute(interaction) {
		const prompt = interaction.options.getString('prompt');
		console.log('### gpt_t Prompt: ', prompt);

		axios.post('https://api.openai.com/v1/chat/completions', {
			max_tokens : 100,
			temperature: 0.7,
			model      : 'gpt-3.5-turbo-0125',
			messages   : [
				// DOCS
				// https://platform.openai.com/docs/api-reference/chat/create

				// {
				//   role: "system",
				//   content: "You are a helpful assistant."
				// },
				{
					role   : 'user',
					content: prompt,
				},
			],
		}, {
			headers: {
				'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`,
				'Content-Type' : 'application/json',
			},
		})
			.then(response => {
				const reply = response.data.choices[0].message.content || 'FAILED';
				console.log('### reply ', reply);
				interaction.reply(reply);
				// return response;
			})
			.catch(error => {
				console.error('Error fetching response from ChatGPT:', error.message);
				interaction.reply('ERROR: ' + error);
			});
	},
};

// Docs
// https://discordjs.guide/slash-commands/parsing-options.html#command-options

// Testing API Calls
// https://reqbin.com/
/*
URL
https://api.openai.com/v1/chat/completions

Content
{
    "messages": [
    {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "whats the quickest path from berlin to rome"
      }
    ],
    "max_tokens": 100,
    "temperature": 0.7,
    "model": "gpt-3.5-turbo-0125"
}

Headers
Authorization: Bearer ${process.env.CHATGPT_API_KEY}`,
Content-Type: application/json

 */
