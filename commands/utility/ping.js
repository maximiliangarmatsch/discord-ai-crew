const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	category: 'utility',
	data    : new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	// .addStringOption(option =>
	//   option.setName('input')
	//     .setDescription('The input to echo back')),
	async execute(interaction) {
		// const question = interaction.options.getString('input');
		const question = 'what is chatgpt';
		console.log('### ping question', question);


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
					content: question,
				},
			],
		}, {
			headers: {
				'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`,
				'Content-Type' : 'application/json',
			},
		})
			.then(response => {
				const answer = response.data.choices[0].message.content || 'FAILED';
				console.log('### ping ANSWER', answer);
				interaction.reply('Response:' + answer);
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
Authorization: Bearer sk-proj-qKUobX0UTsbj09kMzLo9T3BlbkFJcC3IO8N8mSKFBlkNGWnc
Content-Type: application/json

 */
