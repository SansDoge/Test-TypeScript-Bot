import { Message, TextChannel } from "discord.js";
import { CommandInt } from "../interfaces/command_interface";
import { get_command_arguments } from "../helpers/functions";

// Purge command
const purge: CommandInt = {
    name: "purge",
    description: "Purges number of messages specified by user.",
    run: async (message: Message) => {
        let command_arguments = get_command_arguments(message);
        let channel: TextChannel = message.channel as TextChannel;
        let num_msg_to_delete: number = parseInt(command_arguments[0]);
        if (num_msg_to_delete >= 2 && num_msg_to_delete <= 99) {
            channel.bulkDelete(num_msg_to_delete + 1, true)
                .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
                .catch(console.error);
        } else {
            channel.send("Illegal arguments. Must enter the number of messages to delete between 2 and 99 inclusive.");
        }
    }
}

// List of commands
export const command_list= new Map<string, CommandInt>([
    [purge.name, purge],
]);