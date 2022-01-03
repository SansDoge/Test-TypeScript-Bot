import { Message } from "discord.js";

export interface CommandInt {
    name: string;
    description: string;
    syntax: string;
    run: (message: Message) => Promise<void>;
}