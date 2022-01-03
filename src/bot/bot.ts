import * as dotenv from 'dotenv';
dotenv.config();
import { Client, Message } from 'discord.js';
import { bot_command, validSender } from '../helpers/functions';

// Fields
const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING"]
});
export let prefix: string = "!";

// Bot startup
client.login(process.env.BOT_TOKEN);
client.once("ready", () => {
  console.log("Bot is ready");
});

client.on("messageCreate", (sentMessage: Message) => {
  if (!validSender(sentMessage)) return;

  // Process message
  let content = sentMessage.content.trim().toLowerCase();
  let split_content = content.split(" ");

  // Non-command cases
  if (sentMessage.content === 'test') {
    sentMessage.reply('confirm test');
  }

  // Command cases
  let command = bot_command(split_content);
  if (command == null) return;
  command.run(sentMessage);
});

client.on("messageDelete", (deletedMessage: Message) => {
  if (!validSender(deletedMessage)) return;

  deletedMessage.channel.send(deletedMessage.content);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  // To Implement later
});
