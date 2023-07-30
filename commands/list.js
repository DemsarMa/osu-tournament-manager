const fs = require("fs");
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("create-tournament")
        .setDescription("Create a new tournament entry")
        .addStringOption((option) => option.setName("grandfinals_date").setDescription("Grand Finals date").setRequired(false)),

    async execute(interaction) {
        const name = interaction.options.getString("name");
        const role = interaction.options.getString("role");
        const qualDate = interaction.options.getString("qual_date");
        const ro128Date = interaction.options.getString("ro128_date");
        const ro64Date = interaction.options.getString("ro64_date");
        const ro32Date = interaction.options.getString("ro32_date");
        const ro16Date = interaction.options.getString("ro16_date");
        const quarterfinalsDate = interaction.options.getString("quarterfinals_date");
        const semifinalsDate = interaction.options.getString("semifinals_date");
        const finalsDate = interaction.options.getString("finals_date");
        const grandFinalsDate = interaction.options.getString("grandfinals_date");

        //init tournament data
        const tournamentData = {
            name: name,
            role: role,
            qualDate: qualDate,
            ro128Date: ro128Date,
            ro64Date: ro64Date,
            ro32Date: ro32Date,
            ro16Date: ro16Date,
            quarterfinalsDate: quarterfinalsDate,
            semifinalsDate: semifinalsDate,
            finalsDate: finalsDate,
            grandFinalsDate: grandFinalsDate,
        };

        //check if tournamentData.json exists
        if (fs.existsSync("tournamentData.json")) {
            fs.readFile("tournamentData.json", "utf8", (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }

                let jsonParseData = [];
                try {
                    jsonParseData = JSON.parse(data);
                } catch (parseError) {
                    console.error("Error while parsing JSON:", parseError);
                    return;
                }

                jsonParseData.forEach((tournament) => {
                    if (tournament.qualDate == null) { tournament.qualDate = "/";
                    }
                    if (tournament.ro128Date == null) { tournament.ro128Date = "/";
                    }
                    if (tournament.ro64Date == null) { tournament.ro64Date = "/";
                    }
                    if (tournament.ro32Date == null) { tournament.ro32Date = "/";
                    }
                    if (tournament.ro16Date == null) { tournament.ro16Date = "/";
                    }
                    if (tournament.quarterfinalsDate == null) { tournament.quarterfinalsDate = "/";
                    }
                    if (tournament.semifinalsDate == null) { tournament.semifinalsDate = "/";
                    }
                    if (tournament.finalsDate == null) { tournament.finalsDate = "/";
                    }
                    if (tournament.grandFinalsDate == null) { tournament.grandFinalsDate = "/";
                    }
                });

                let tournament_embed = {
                    color: 0x0099ff,
                    title: name,
                    fields: [
                        { name: "Role", value: role, inline: true },
                        { name: "Qualifiers", value: qualDate || "/", inline: true },
                        { name: "RO128", value: ro128Date || "/", inline: true },
                        { name: "RO64", value: ro64Date || "/", inline: true },
                        { name: "RO32", value: ro32Date || "/", inline: true },
                        { name: "RO16", value: ro16Date || "/", inline: true },
                        { name: "Quarterfinals", value: quarterfinalsDate || "/", inline: true },
                        { name: "Semifinals", value: semifinalsDate || "/", inline: true },
                        { name: "Finals", value: finalsDate || "/", inline: true },
                        { name: "Grand Finals", value: grandFinalsDate || "/", inline: true },
                    ],
                };

                const existingTournament = jsonParseData.find((tournament) => tournament.name === tournamentData.name);
                if (existingTournament) {
                    const updateButton = new ButtonBuilder()
                        .setCustomId("update_yes")
                        .setLabel("Yes")
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji("✅");

                    const cancelButton = new ButtonBuilder()
                        .setCustomId("update_no")
                        .setLabel("No")
                        .setStyle(ButtonStyle.Danger)
                        .setEmoji("❎");

                    const actionRow = new ActionRowBuilder().addComponents(updateButton, cancelButton);

                    interaction.reply({ content: "Tournament entry already exists. Would you like to update it?", embeds: [tournament_embed], components: [actionRow], ephemeral: true })
                        .then((promptMessage) => {
                            const collector = promptMessage.createMessageComponentCollector({
                                filter: (i) => i.isButton() && i.user.id === interaction.user.id,
                                time: 30000,
                            });

                            collector.on("collect", async (interaction) => {
                                if (interaction.customId === "update_yes") {
                                    Object.assign(existingTournament, tournamentData);

                                    const updatedData = JSON.stringify(jsonParseData, null, 2);

                                    fs.writeFile("tournamentData.json", updatedData, "utf8", (err) => {
                                        if (err) {
                                            console.error(err);
                                            return;
                                        }

                                        fs.readFile("tournamentData.json", "utf8", (err, data) => {
                                            if (err) {
                                                console.error(err);
                                                return;
                                            }

                                            let jsonParseData = [];
                                            try {
                                                jsonParseData = JSON.parse(data);
                                            } catch (parseError) {
                                                console.error("Error while parsing JSON:", parseError);
                                                return;
                                            }

                                            jsonParseData.forEach((tournament) => {
                                                if (tournament.qualDate == null) { tournament.qualDate = "/";
                                                }
                                                if (tournament.ro128Date == null) { tournament.ro128Date = "/";
                                                }
                                                if (tournament.ro64Date == null) { tournament.ro64Date = "/";
                                                }
                                                if (tournament.ro32Date == null) { tournament.ro32Date = "/";
                                                }
                                                if (tournament.ro16Date == null) { tournament.ro16Date = "/";
                                                }
                                                if (tournament.quarterfinalsDate == null) { tournament.quarterfinalsDate = "/";
                                                }
                                                if (tournament.semifinalsDate == null) { tournament.semifinalsDate = "/";
                                                }
                                                if (tournament.finalsDate == null) { tournament.finalsDate = "/";
                                                }
                                                if (tournament.grandFinalsDate == null) { tournament.grandFinalsDate = "/";
                                                }
                                            });
                                        });

                                        let tournament_embed_updated = {
                                            color: 0x0099ff,
                                            title: name,
                                            fields: [
                                                { name: "Role", value: role, inline: true },
                                                { name: "Qualifiers", value: qualDate || "/", inline: true },
                                                { name: "RO128", value: ro128Date || "/", inline: true },
                                                { name: "RO64", value: ro64Date || "/", inline: true },
                                                { name: "RO32", value: ro32Date || "/", inline: true },
                                                { name: "RO16", value: ro16Date || "/", inline: true },
                                                { name: "Quarterfinals", value: quarterfinalsDate || "/", inline: true },
                                                { name: "Semifinals", value: semifinalsDate || "/", inline: true },
                                                { name: "Finals", value: finalsDate || "/", inline: true },
                                                { name: "Grand Finals", value: grandFinalsDate || "/", inline: true },
                                            ],
                                        };

                                        interaction.reply({ content: "Tournament entry has been updated.", ephemeral: true, embeds: [tournament_embed_updated] });
                                    });
                                } else if (interaction.customId === "update_no") {
                                    interaction.reply({ content: "Tournament entry has not been updated.", ephemeral: true, embeds: [tournament_embed] });
                                }
                            });

                            collector.on("end", () => {
                                promptMessage.edit({ components: [] });
                            });
                        });
                } else {
                    jsonParseData.push(tournamentData);
                    const updatedData = JSON.stringify(jsonParseData, null, 2);

                    fs.writeFile("tournamentData.json", updatedData, "utf8", (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        interaction.reply({ content: "Tournament entry has been added.", ephemeral: true, embeds: [tournament_embed] });
                    });
                }
            });
        } else {
            const initialData = [tournamentData];

            const jsonData = JSON.stringify(initialData, null, 2);

            let tournament_embed = {
                color: 0x0099ff,
                title: name,
                fields: [
                    { name: "Role", value: role, inline: true },
                    { name: "Qualifiers", value: qualDate || "/", inline: true },
                    { name: "RO128", value: ro128Date || "/", inline: true },
                    { name: "RO64", value: ro64Date || "/", inline: true },
                    { name: "RO32", value: ro32Date || "/", inline: true },
                    { name: "RO16", value: ro16Date || "/", inline: true },
                    { name: "Quarterfinals", value: quarterfinalsDate || "/", inline: true },
                    { name: "Semifinals", value: semifinalsDate || "/", inline: true },
                    { name: "Finals", value: finalsDate || "/", inline: true },
                    { name: "Grand Finals", value: grandFinalsDate || "/", inline: true },
                ],
            };

            fs.writeFile("tournamentData.json", jsonData, "utf8", (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                interaction.reply({ content: "Tournament entry has been added.", ephemeral: true, embeds: [tournament_embed] });
            });
        }
    },
};
