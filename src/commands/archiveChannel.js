import { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('archive')
  .setDescription('Archive a channel');

export async function execute(interaction) {
  const channel = interaction.channel;
  const archiveButton = new ButtonBuilder()
    .setCustomId('confirmArchive')
    .setLabel('Confirm Archive')
    .setStyle('Danger');
  const row = new ActionRowBuilder().addComponents(archiveButton);
  await interaction.reply({ content: 'Are you sure you want to archive this channel?', components: [row], ephemeral: true });
  const filter = i => i.customId === 'confirmArchive' && i.user.id === interaction.user.id;
  const collector = channel.createMessageComponentCollector({ filter, time: 15000, max: 1 });
  collector.on('collect', async i => {
    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });
    await i.update({ content: `${channel} archived.`, components: [] });
  });
}

export default { data, execute };
