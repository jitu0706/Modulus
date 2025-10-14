import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('role-assign')
  .setDescription('Assign a role to a user')
  .addUserOption(opt => opt.setName('user').setDescription('User').setRequired(true))
  .addRoleOption(opt => opt.setName('role').setDescription('Role').setRequired(true));

export async function execute(interaction) {
  const user = interaction.options.getUser('user');
  const role = interaction.options.getRole('role');
  const member = await interaction.guild.members.fetch(user.id);
  await member.roles.add(role);
  const embed = new EmbedBuilder()
    .setTitle('Role Assigned')
    .setDescription(`${role} assigned to ${user}`)
    .setColor('Green');
  await interaction.reply({ embeds: [embed] });
}

export default { data, execute };
