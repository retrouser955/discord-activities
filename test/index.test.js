const { Client, GatewayIntentBits: Intents, Partials } = require('discord.js')
const client = new Client({
    intents: [Intents.Guilds, Intents.GuildMessages, Intents.GuildInvites, Intents.MessageContent],
    partials: [Partials.Channel, Partials.GuildMember, Partials.Message]
})

const Activities = require('../index')

const inviteGenerator = new Activities(client)

client.on('ready', () => {
    console.log(`${client.user.tag} is ready!`)
})

client.on('messageCreate', async (message) => {
    if(message.content.toLowerCase() === "!youtube") {
        if(!message.member.voice.channelId) return message.reply('Please join a vc first')
        const inviteCode = await inviteGenerator.getInviteCode(String(message.member.voice.channelId), "ytNew")
        message.reply(inviteCode)
    }
    if(message.content.toLowerCase() === "!ping") {
        message.reply('pong!')
    }
})

client.login('your token') 