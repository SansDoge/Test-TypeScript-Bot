import { Message, MessageEmbed } from "discord.js";
import { prefix } from "../bot/bot";
import { command_list } from "../commands/commands";

export function validSender(message: Message) {
    return !message.author.bot;
}

export function bot_command(command_arguments: string[]) {
    if (!command_arguments[0].startsWith(prefix)) {
        return null;
    }
    let requested_command = command_arguments[0].substring(1);
    return command_list.get(requested_command);
}

export function get_command_arguments(message: Message) {
    return message.content.replace(/\s\s+/g, " ").split(" ").slice(1);
}
