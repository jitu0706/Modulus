
/**
 * Welcome Message Configuration Command
 * Allows admins to set welcome channel, image/GIF, and DM message
 * @module welcomeConfig
 */

import { SlashCommandBuilder } from 'discord.js';
import mongoose from 'mongoose';

/**
 * Mongoose schema for per-guild welcome message configuration
 */
const welcomeConfigSchema = new mongoose.Schema({
  guildId: String,
  channel: String,
  image: String,
  dmMessage: String
});
export const WelcomeConfig = mongoose.model('WelcomeConfig', welcomeConfigSchema);

export const data = new SlashCommandBuilder()
  .setName('welcome-config')
  .setDescription('Configure welcome messages for your server')
  .addChannelOption(opt => opt.setName('channel').setDescription('Welcome channel').setRequired(false))
  .addStringOption(opt => opt.setName('image').setDescription('Welcome image/GIF URL').setRequired(false))
  .addStringOption(opt => opt.setName('dm').setDescription('DM onboarding message').setRequired(false));

/**
 * Executes the welcome-config command, updating per-guild welcome settings in MongoDB
 * @param {import('discord.js').ChatInputCommandInteraction} interaction
 */
export async function execute(interaction) {
  // Only allow administrators to configure
  if (!interaction.member.permissions.has('Administrator')) {
    return interaction.reply({ content: 'Only administrators can configure welcome messages.', ephemeral: true });
  }
  // Get options from command
  const channel = interaction.options.getChannel('channel');
  const image = interaction.options.getString('image');
  const dm = interaction.options.getString('dm');
  // Find or create config for this guild
  let config = await WelcomeConfig.findOne({ guildId: interaction.guild.id });
  if (!config) config = new WelcomeConfig({ guildId: interaction.guild.id });
  if (channel) config.channel = channel.name;
  if (image) config.image = image;
  if (dm) config.dmMessage = dm;
  await config.save();
  await interaction.reply({ content: 'Welcome message configuration updated!', ephemeral: true });
}

export default { data, execute };
