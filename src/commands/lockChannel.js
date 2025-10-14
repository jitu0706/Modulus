import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('lock')
  .setDescription('Lock a channel');

export async function execute(interaction) {
  const channel = interaction.channel;
  await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });
  const embed = new EmbedBuilder()
    .setTitle('Channel Locked')
    .setDescription(`${channel} is now locked.`)
    .setColor('Red');
  await interaction.reply({ embeds: [embed] });
}

export default { data, execute };
