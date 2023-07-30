const fs = require('fs');
const path = require('path');
const { Client, Intents, GatewayIntentBits, Collection, REST, Routes, Events, StringSelectMenuBuilder, ActionRowBuilder, EmbedBuilder, ActivityType } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
//const Sentry = require("@sentry/node");
//const Tracing = require("@sentry/tracing");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages], });
client.login(process.env.DISCORD_TOKEN);

/*Sentry.init({
    dsn: process.env.DSN,
    tracesSampleRate: 1.0,
});

/*const transaction = Sentry.startTransaction({
    op: "osu! Tournament Bot",
    name: "osu! Tournament Bot",
});*/

client.on("ready", async () => {
    console.log("osu Tournament bot is ready!");
    client.user.setActivity("Tournaments", { type: "WATCHING" });
    client.user.setStatus("online");
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        //Sentry.captureException(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    
    try {
        await command.execute(interaction);
    } catch (error) {
        //Sentry.captureException(error);
        console.error(error);
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
        });
    }
});

