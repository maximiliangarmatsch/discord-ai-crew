const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	category: 'utility',
	data    : new SlashCommandBuilder()
		.setName('r')
		.setDescription('Reloads a command.'),
	// .addStringOption(option =>
	//   option.setName('command')
	//     .setDescription('The command to reload.')
	//     .setRequired(true)),
	async execute(interaction) {
		// const commandName = interaction.options.getString('command', true).toLowerCase();
		// const command = interaction.client.commands.get(commandName);
		//
		// if (!command) {
		//   return interaction.reply(`There is no command with name \`${commandName}\`!`);
		// }

		// delete require.cache[require.resolve(`../${command.category}/${command.data.name}.js`)];
		delete require.cache[require.resolve('../utility/gpt_t.js')];

		// try {
		//   interaction.client.commands.delete(command.data.name);
		//   const newCommand = require(`../${command.category}/${command.data.name}.js`);
		//   interaction.client.commands.set(newCommand.data.name, newCommand);
		//   await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
		// } catch (error) {
		//   console.error(error);
		//   await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
		// }
		try {
			interaction.client.commands.delete('t');
			const newCommand = require('../utility/gpt_t.js');
			interaction.client.commands.set('t', newCommand);
			await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
		}
		catch (error) {
			console.error(error);
			await interaction.reply(`There was an error while reloading a command "t":\n\`${error.message}\``);
		}
	},
};
