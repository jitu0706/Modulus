// Automated Moderation Module
// Features: Anti-spam, anti-link, anti-raid detection, auto-mute/ban for repeated offenses
// Configurable actions and thresholds

import { Log } from './db.js';
import { EmbedBuilder } from 'discord.js';

// Configurable thresholds
const SPAM_THRESHOLD = 5; // messages in 5 seconds
const LINK_REGEX = /(https?:\/\/|discord\.gg|www\.)/i;
const RAID_THRESHOLD = 5; // joins in 10 seconds
const MUTE_ROLE = 'Muted'; // Name of mute role

const recentMessages = new Map();
const recentJoins = [];

export function handleMessage(message) {
  if (message.author.bot) return;

  // Anti-spam
  const now = Date.now();
  const userMsgs = recentMessages.get(message.author.id) || [];
  const filtered = userMsgs.filter(ts => now - ts < 5000);
  filtered.push(now);
  recentMessages.set(message.author.id, filtered);
  if (filtered.length >= SPAM_THRESHOLD) {
    muteUser(message.member, 'Spamming messages');
    Log.create({ type: 'moderation', userId: message.author.id, action: 'Auto-mute for spam' });
    message.channel.send({ embeds: [new EmbedBuilder().setTitle('Auto-mute').setDescription(`${message.author} muted for spamming.`).setColor('Red')] });
    return;
  }

  // Anti-link
  if (LINK_REGEX.test(message.content)) {
    message.delete();
    Log.create({ type: 'moderation', userId: message.author.id, action: 'Message deleted for link' });
    message.channel.send({ embeds: [new EmbedBuilder().setTitle('Link Deleted').setDescription(`${message.author} posted a link.`).setColor('Orange')] });
    return;
  }
}

export function handleGuildMemberAdd(member) {
  const now = Date.now();
  recentJoins.push(now);
  // Remove joins older than 10 seconds
  while (recentJoins.length && now - recentJoins[0] > 10000) recentJoins.shift();
  if (recentJoins.length >= RAID_THRESHOLD) {
    member.ban({ reason: 'Raid detected' });
    Log.create({ type: 'moderation', userId: member.id, action: 'Auto-ban for raid' });
    member.guild.systemChannel?.send({ embeds: [new EmbedBuilder().setTitle('Auto-ban').setDescription(`${member.user} banned for raid.`).setColor('Red')] });
  }
}

async function muteUser(member, reason) {
  let muteRole = member.guild.roles.cache.find(r => r.name === MUTE_ROLE);
  if (!muteRole) {
    muteRole = await member.guild.roles.create({ name: MUTE_ROLE, color: 'Grey', permissions: [] });
  }
  await member.roles.add(muteRole, reason);
}
