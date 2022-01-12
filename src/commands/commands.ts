import { Message, MessageEmbed, TextChannel } from "discord.js";
import { CommandInt } from "../interfaces/command_interface";
import { get_command_arguments } from "../helpers/functions";
import { prefix } from "../bot/bot";

// Purge
const purge: CommandInt = {
    name: "purge",
    description: "Purges number of messages specified by user.",
    syntax: "{prefix}purge {number of messages to delete: 1 <= n <= 99}",
    run: async (message: Message) => {

        // Process command arguments
        let command_arguments = get_command_arguments(message);
        let channel: TextChannel = message.channel as TextChannel;
        let num_msg_to_delete: number = command_arguments.length == 0 ? 99 : parseInt(command_arguments[0]);
        
        // Illegal arguments case
        if (isNaN(num_msg_to_delete) || num_msg_to_delete < 1 || num_msg_to_delete > 99) {
            channel.send("Illegal arguments. Must enter the number of messages to delete between 1 and 99 inclusive.");
            return;
        }
        
        // Delete messges
        channel.bulkDelete(num_msg_to_delete + 1, true)
            .then(messages => console.log("Deleted " + messages.size + " messages from " + message.channel.toString()))
            .catch(console.error);
    }
}

// Help: get all commands and displays resources
const get_bot_commands: CommandInt = {
    name: "help",
    description: "Lists all the commands and their descriptions.",
    syntax: "{prefix}help",
    run: async (message: Message) => {
        
        // List of embeds with command descriptions
        const commands_embeds_list: MessageEmbed[] = [
            new MessageEmbed()
                .setTitle("Bot Help")
                .setDescription("Discord.js resources").addFields([
                    { name: "discord.js documentation", value: "https://discord.js.org/#/docs/main/stable/general/welcome" },
                    { name: "discordjs.guide", value: "https://discordjs.guide/#before-you-begin" }
                ]),
            new MessageEmbed()
                .setTitle("Bot Commands")
                .setDescription("Bot prefix: " + prefix)
        ];

        // Loops through command_list and adds commands into embeds
        command_list.forEach((command: CommandInt, command_name: string) => {

            // Discord API restriction of 25 fields per embed
            // Adds embeds for every 25 commands
            if (commands_embeds_list[commands_embeds_list.length - 1].fields.length == 25) {
                commands_embeds_list.push(new MessageEmbed());
            }
            commands_embeds_list[commands_embeds_list.length - 1].addField(command_name, command.description);
        });

        // Sends all embeds
        for (let i = 0; i < commands_embeds_list.length; i++) {
            message.channel.send({ embeds: [commands_embeds_list[i]] });
        }
    }
}

// Command list
export const command_list= new Map<string, CommandInt>([
    [purge.name, purge],
    [get_bot_commands.name, get_bot_commands]
]);