const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
      }
    } else if (interaction.isButton() && interaction.customId === 'create_ticket') {
      const { createTicket } = require('../utils/ticketUtils');
      await createTicket(interaction, client);
    }
  },
};