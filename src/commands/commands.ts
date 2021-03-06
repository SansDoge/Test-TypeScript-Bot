import { Message, MessageEmbed, TextChannel } from "discord.js";
import { Command } from "../interfaces/command_interface";
import { get_command_arguments } from "../helpers/functions";
import { prefix, new_prefix } from "../bot/bot";

// Change Prefix
const change_prefix: Command = {
    name: "prefix",
    description: "Changes the prefix for the bot.",
    syntax: "{old prefix}prefix {new prefix}",
    run: async (message: Message) => {

        // Process command arguments
        let command_arguments: string[] = get_command_arguments(message);
        let channel: TextChannel = message.channel as TextChannel;
        if (command_arguments.length == 0) {
            channel.send("The prefix cannot be empty!");
            return;
        }

        // Changes prefix
        let requested_prefix: string = command_arguments[0];
        new_prefix(requested_prefix);
        channel.send("The prefix has been changed to: " + prefix + ".");
    }
}

// Purge
const purge: Command = {
    name: "purge",
    description: "Purges number of messages specified by user.",
    syntax: "{prefix}purge {number of messages to delete: 1 <= n <= 99}",
    run: async (message: Message) => {

        // Process command arguments
        let command_arguments: string[] = get_command_arguments(message);
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

// Test
const test: Command = {
    name: "test",
    description: "Used for testing random things.",
    syntax: "{prefix}test",
    run: async (message: Message) => {
        message.channel.send(message.author.id);
        try {
            const member = await message.guild.members.fetch('922337203685477580');
            message.channel.send('The user you are trying to premove exists on this server');
            if (!member.user.bot) message.channel.send('User is not a bot');
        } catch (e) {
            message.channel.send('The user you are trying to premove doesn\'t exist on this server');
        }
    }
}

// Help: get all commands and displays resources
const get_bot_commands: Command = {
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
        command_list.forEach((command: Command, command_name: string) => {

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
export const command_list= new Map<string, Command>([
    [change_prefix.name, change_prefix],
    [purge.name, purge],
    [test.name, test],
    [get_bot_commands.name, get_bot_commands]
]);