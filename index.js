const fs = require('fs');
const path = require('path');
const { Client, Intents, GatewayIntentBits, Collection, REST, Routes, Events, StringSelectMenuBuilder, ActionRowBuilder, EmbedBuilder, ActivityType } = require("discord.js");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
});
client.login(process.env.DISCORD_TOKEN);

Sentry.init({
    dsn: process.env.DSN,
    tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
    op: "osu! Tournament Bot",
    name: "osu! Tournament Bot",
});

client.on("ready", async () => {
    console.log("osu Tournament bot is ready!");
    client.user.setActivity("Tournaments", { type: "WATCHING" });
    client.user.setStatus("online");
});

