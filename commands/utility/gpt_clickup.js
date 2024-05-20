const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	category: 'gpt',
	data    : new SlashCommandBuilder()
		.setName('clickup')
		.setDescription('ClickUp.com stuff'),
	async execute(interaction) {
		// const question = interaction.options.getString('input');
		const question = 'what is chatgpt';
		console.log('### question', question);

		/*
		try {
            const response = await axios.get(`https://api.clickup.com/api/v2/task?search=${searchText}`, {
                headers: {
                    'Authorization': CLICKUP_API_KEY
                }
            });

            const tasks = response.data.tasks;
            if (tasks.length > 0) {
                const taskLinks = tasks.map(task => `Title: ${task.name}\nLink: ${task.url}`).join('\n\n');
                message.channel.send(`Found ${tasks.length} tasks:\n${taskLinks}`);
            } else {
                message.channel.send('No tasks found.');
            }
        } catch (error) {
            console.error('Error fetching ClickUp tasks:', error);
            message.channel.send('Error fetching ClickUp tasks.');
        }
		 */

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
				console.log('### ANSWER', answer);
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
Authorization: Bearer ${process.env.CHATGPT_API_KEY}
Content-Type: application/json

 */
