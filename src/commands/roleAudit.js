import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('role-audit')
  .setDescription('Audit roles in the server');

export async function execute(interaction) {
  const roles = interaction.guild.roles.cache.map(role => `${role.name} (${role.id})`).join('\n');
  const embed = new EmbedBuilder()
    .setTitle('Role Audit')
    .setDescription(roles)
    .setColor('Blue');
  await interaction.reply({ embeds: [embed] });
}

export default { data, execute };
