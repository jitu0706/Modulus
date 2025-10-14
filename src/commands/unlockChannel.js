import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('unlock')
  .setDescription('Unlock a channel');

export async function execute(interaction) {
  const channel = interaction.channel;
  await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: true });
  const embed = new EmbedBuilder()
    .setTitle('Channel Unlocked')
    .setDescription(`${channel} is now unlocked.`)
    .setColor('Green');
  await interaction.reply({ embeds: [embed] });
}

export default { data, execute };
