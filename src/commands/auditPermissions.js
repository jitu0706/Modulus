import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('audit-permissions')
  .setDescription('Audit permissions in the server');

export async function execute(interaction) {
  const perms = interaction.guild.roles.cache.map(role => `${role.name}: ${role.permissions.toArray().join(', ')}`).join('\n');
  const embed = new EmbedBuilder()
    .setTitle('Permission Audit')
    .setDescription(perms)
    .setColor('Purple');
  await interaction.reply({ embeds: [embed] });
}

export default { data, execute };
