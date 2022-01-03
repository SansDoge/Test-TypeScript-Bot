import { Message, MessageEmbed, TextChannel } from "discord.js";
import { CommandInt } from "../interfaces/command_interface";
import { get_command_arguments } from "../helpers/functions";
import { prefix } from "../bot/bot";

// Purge
const purge: CommandInt = {
    name: "purge",
    description: "Purges number of messages specified by user.",
    syntax: "{prefix}purge {number of messages to delete: 2 <= n <= 99}",
    run: async (message: Message) => {
        let command_arguments = get_command_arguments(message);
        let channel: TextChannel = message.channel as TextChannel;
        let num_msg_to_delete: number = command_arguments.length == 0 ? 99 : parseInt(command_arguments[0]);
        
        if (isNaN(num_msg_to_delete) || num_msg_to_delete < 2 || num_msg_to_delete > 99) {
            channel.send("Illegal arguments. Must enter the number of messages to delete between 2 and 99 inclusive.");
            return;
        }
        
        channel.bulkDelete(num_msg_to_delete + 1, true)
            .then(messages => console.log("Bulk deleted " + messages.size + " messages."))
            .catch(console.error);
    }
}

// Get all commands
const get_bot_commands: CommandInt = {
    name: "commands",
    description: "Lists all the commands and their descriptions.",
    syntax: "{prefix}commands",
    run: async (message: Message) => {
        const commands = new MessageEmbed()
            .setTitle("Bot Commands")
            .setDescription("Bot prefix: " + prefix);
        command_list.forEach((command: CommandInt, command_name: string) => {
            commands.addField(command_name, command.description);
        });
        message.channel.send({ embeds: [commands] });
    }
}

// Command list
export const command_list= new Map<string, CommandInt>([
    [purge.name, purge],
    [get_bot_commands.name, get_bot_commands]
]);