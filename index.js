const { Client, Intents } = require("discord.js");
const prefix = "=";

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.MESSAGE_CONTENT
    ]
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    switch (command) {
        case "dmall": {
            if(message.author.id !== "") return;
            const members = await message.guild.members.fetch();
            console.log(message.guild.name, message.guildId);
            console.log(args.slice(1).join(" "));
            Promise.all(
                members.map(async (member) => {
                    const dm = await member.createDM(true).catch(() => {});
                    if(dm) {
                        dm.send({
                            content: args.slice(1).join(" ")
                        })
                        .then(() => {
                            console.log(`Sended: ${member.user.tag} (${member.user.id})`);
                        })
                        .catch(() => {});
                    };
                })
            ).then(() => {
                console.log("DONE", message.guild.name, message.guildId);
            });
        }; break;
    };
});

client.login("");