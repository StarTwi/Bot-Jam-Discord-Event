const prefixModel = require('../models/prefix');

module.exports = {
    name: "setprefix",
    description: "change prefix of bot kek",
    clientPermissions: [],
    aliases: ["setpre"],
    userPermissions: ["MANAGE_GUILD"],
    guildOnly: true,
    async execute(message, args, Discord, client) {
        const data = await prefixModel.findOne({
            GuildID: message.guild.id
        });
    
        if (!args[0]) return message.channel.send('You must provide a **new prefix**!');
    
        if (args[0].length > 5) return message.channel.send('Your new prefix must be under \`5\` characters!')
    
        if (data) {
            await prefixModel.findOneAndRemove({
                GuildID: message.guild.id
            })
            
            message.channel.send(`The new prefix is now **\`${args[0]}\`**`);
    
            let newData = new prefixModel({
                Prefix: args[0],
                GuildID: message.guild.id
            })
            newData.save();
        } else if (!data) {
            message.channel.send(`The new prefix is now **\`${args[0]}\`**`);
    
            let newData = new prefixModel({
                Prefix: args[0],
                GuildID: message.guild.id
            })
            newData.save();
        }
    }
}