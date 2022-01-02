import * as dotenv from 'dotenv';
dotenv.config();

import { Client, Message } from 'discord.js';

const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING"]
});

client.login(process.env.BOT_TOKEN);

client.once('ready', () => {
  console.log('Bot is ready');
});

client.on('messageCreate', (sentMessage: Message) => {
  if (!validSender(sentMessage)) return;

  if (sentMessage.content === 'test') {
    sentMessage.reply('confirm test');
  }
});

client.on('messageDelete', (deletedMessage: Message) => {
  if (!validSender(deletedMessage)) return;

  deletedMessage.channel.send(deletedMessage.content);
});

function validSender(message: Message) {
  return !(message.author.id == client.user.id);
}
