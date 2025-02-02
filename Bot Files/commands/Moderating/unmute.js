const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Unmutes a user.")
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("The user you would like to unmute.")
        .setRequired(true)
        )
    .addStringOption(option =>
        option
        .setName("reason")
        .setDescription("The reason you would like to unmute this user.")
        .setRequired(false)
        ),
    async execute(interaction) {
        const reason = interaction.options.getString("reason")
        const member = interaction.options.getMember("user")
        const data = await interaction.client.db.guilds.findOne({guildId: interaction.guild.id})
        const role = data.muteRole

        member.roles.remove(role,`Action by ${interaction.member.id}.`)
        await interaction.reply(`Unmuted ${member} by ${interaction.member}. Reason: ${reason}`)
    }
}