
/**
 * Custom Welcome/Leave Messages Module
 * Features: Personalized embeds, images/GIFs, DM onboarding info
 * @module welcome
 */

import { EmbedBuilder } from 'discord.js';
import { WelcomeConfig } from './commands/welcomeConfig.js';

/**
 * Handles a new member joining the guild.
 * Sends a personalized welcome embed in the configured channel and a DM onboarding message.
 * @param {import('discord.js').GuildMember} member
 */
export async function handleGuildMemberAdd(member) {
  // Fetch per-guild welcome config from MongoDB
  const config = await WelcomeConfig.findOne({ guildId: member.guild.id });
  const channelName = config?.channel || 'welcome';
  const image = config?.image || 'https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif';
  const dmMessage = config?.dmMessage || 'Welcome to the server! Please read the rules in #rules.';

  // Find the configured welcome channel
  const channel = member.guild.channels.cache.find(c => c.name === channelName && c.isTextBased());
  if (channel) {
    // Build and send the welcome embed
    const embed = new EmbedBuilder()
      .setTitle(`Welcome, ${member.user.username}!`)
      .setDescription('Glad to have you here!')
      .setImage(image)
      .setColor('Green');
    channel.send({ content: `${member}`, embeds: [embed] });
  }

  // DM onboarding info (ignore if DMs are closed)
  try {
    await member.send(dmMessage);
  } catch (err) {
    // DMs may be closed; ignore error
  }
}

/**
 * Handles a member leaving the guild.
 * Sends a personalized leave embed in the configured channel.
 * @param {import('discord.js').GuildMember} member
 */
export async function handleGuildMemberRemove(member) {
  // Fetch per-guild welcome config from MongoDB
  const config = await WelcomeConfig.findOne({ guildId: member.guild.id });
  const channelName = config?.channel || 'welcome';

  // Find the configured welcome channel
  const channel = member.guild.channels.cache.find(c => c.name === channelName && c.isTextBased());
  if (channel) {
    // Build and send the leave embed
    const embed = new EmbedBuilder()
      .setTitle(`${member.user.username} has left the server.`)
      .setDescription('We hope to see you again!')
      .setColor('Red');
    channel.send({ embeds: [embed] });
  }
}
