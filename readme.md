# Distivities

⚠ In development. 

Installing the package 
```bash
# npm
npm i distivities
# yarn
yarn add distivities
```

# Usage

```js
const { Client, GatewayIntentBits: Intents, Partials } = require('discord.js')

const client = new Client({
    intents: [Intents.Guilds, Intents.GuildMessages, Intents.GuildInvites, Intents.MessageContent], // Guild invite intent is needed
    partials: [Partials.Channel, Partials.GuildMember, Partials.Message]
})

const Activities = require('distivities')

const inviteGenerator = new Activities(client)

client.on('ready', () => {
    console.log(`${client.user.tag} is ready!`)
})

client.on('messageCreate', async (message) => {
    if(message.content.toLowerCase() === "!youtube") {
        if(!message.member.voice.channelId) return message.reply('Please join a vc first')
        const inviteCode = await inviteGenerator.getInviteCode(String(message.member.voice.channelId), "ytNew")
        // if code could not be generated, inviteCode will return "no code" as a string
        /** 
         * if(inviteCode === "no code") return message.reply("I do not have the permission to perform this action")
        **/
        message.reply(inviteCode)
    }
})

client.login('your bot token')
```

# Valid options

ytOld (YouTube old version might not work)  
ytNew  
pokerNight  
betrayal  
fishington  
chess  
sketchyArtist  
awkword  
doodleCrew  
sketchHeads  
letterLeague  
wordSnacks  
spellCast  
checkers  
blazing8s  
puttParty  
landIo  
bobbleLeague  
askAway  
knowWhatIMeme

# Developer options

To create an invite code for developer applications, we can use `getDevInviteCode(voiceChannelId, appName, requestOptions)` function

### Valid developer applications

pn  
youtube  
doodleCrew

⚠ Developer applications may not work sometimes

## Thanks

Thanks to RemyK888 for the inspiration. For more information check out his [package](https://github.com/RemyK888/discord-together) and his [github](https://github.com/RemyK888/)

Note: I plan to add dev versions of these games soon