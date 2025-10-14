import { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('remind')
  .setDescription('Set a reminder');

export async function execute(interaction) {
  const modal = new ModalBuilder()
    .setCustomId('remindModal')
    .setTitle('Set Reminder');
  const timeInput = new TextInputBuilder()
    .setCustomId('remindTime')
    .setLabel('Time (minutes)')
    .setStyle('Short');
  const messageInput = new TextInputBuilder()
    .setCustomId('remindMessage')
    .setLabel('Reminder Message')
    .setStyle('Paragraph');
  modal.addComponents(new ActionRowBuilder().addComponents(timeInput), new ActionRowBuilder().addComponents(messageInput));
  await interaction.showModal(modal);
}

export default { data, execute };
