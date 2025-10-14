import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import roleAssign from './roleAssign.js';
import roleAudit from './roleAudit.js';
import lockChannel from './lockChannel.js';
import unlockChannel from './unlockChannel.js';
import archiveChannel from './archiveChannel.js';
import remind from './remind.js';
import purge from './purge.js';
import auditPermissions from './auditPermissions.js';
import welcomeConfig from './welcomeConfig.js';

config();

const commands = [
  roleAssign.data,
  roleAudit.data,
  lockChannel.data,
  unlockChannel.data,
  archiveChannel.data,
  remind.data,
  purge.data,
  auditPermissions.data,
  welcomeConfig.data
];

export default async function registerCommands(client) {
  // Register commands for each guild for faster updates
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  const guilds = client.guilds.cache.map(guild => guild.id);
  for (const guildId of guilds) {
    await rest.put(Routes.applicationGuildCommands(client.user.id, guildId), { body: commands })
      .then(() => console.log(`Slash commands registered for guild ${guildId}.`))
      .catch(console.error);
  }
  for (const cmd of [roleAssign, roleAudit, lockChannel, unlockChannel, archiveChannel, remind, purge, auditPermissions, welcomeConfig]) {
    client.commands.set(cmd.data.name, cmd);
  }
}
