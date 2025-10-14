import { handleGuildMemberAdd as welcomeAdd, handleGuildMemberRemove } from './welcome.js';
import { handleMessage, handleGuildMemberAdd as modAdd } from './moderation.js';
import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';
import { config } from 'dotenv';
import { connectDB } from './db.js';
import registerCommands from './commands/register.js';
import handleInteraction from './commands/handler.js';

config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction]
});

client.commands = new Collection();

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  registerCommands(client);
});

client.on('interactionCreate', async (interaction) => {
  await handleInteraction(interaction, client);
});

client.on('messageCreate', handleMessage);
client.on('guildMemberAdd', async (member) => {
  await modAdd(member);
  await welcomeAdd(member);
});
client.on('guildMemberRemove', handleGuildMemberRemove);

connectDB()
  .then(() => {
    console.log('Connected to MongoDB');
    client.login(process.env.DISCORD_TOKEN);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
