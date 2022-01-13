import { Message } from "discord.js";
import { prefix } from "../bot/bot";
import { command_list } from "../commands/commands";
import { Command } from "../interfaces/command_interface";

export function validSender(message: Message): boolean {
    return !message.author.bot;
}

export function bot_command(command_arguments: string[]): Command {
    if (!command_arguments[0].startsWith(prefix)) {
        return null;
    }
    let requested_command = command_arguments[0].substring(prefix.length);
    return command_list.get(requested_command);
}

export function get_command_arguments(message: Message): string[] {
    return message.content.replace(/\s\s+/g, " ").split(" ").slice(1);
}
