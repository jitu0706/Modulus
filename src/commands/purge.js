import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('purge')
  .setDescription('Bulk delete messages')
  .addIntegerOption(opt => opt.setName('count').setDescription('Number of messages').setRequired(true));

export async function execute(interaction) {
  const count = interaction.options.getInteger('count');
  await interaction.channel.bulkDelete(count, true);
  const embed = new EmbedBuilder()
    .setTitle('Messages Purged')
    .setDescription(`${count} messages deleted.`)
    .setColor('Orange');
  await interaction.reply({ embeds: [embed], ephemeral: true });
}

export default { data, execute };
