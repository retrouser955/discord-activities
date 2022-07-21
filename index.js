const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

const apps = {
    ytOld: '755600276941176913',
    ytNew: '880218394199220334',
    pokerNight: '755827207812677713',
    betrayal: '773336526917861400',
    fishington: '814288819477020702',
    chess: '832012774040141894',
    sketchyArtist: '879864070101172255',
    awkword: '879863881349087252',
    doodleCrew: '878067389634314250',
    sketchHeads: '902271654783242291',
    letterLeague: '879863686565621790',
    wordSnacks: '879863976006127627',
    spellCast: '852509694341283871',
    checkers: '832013003968348200',
    blazing8s: '832025144389533716',
    puttParty: '945737671223947305',
    landIo: '903769130790969345',
    bobbleLeague: '947957217959759964',
    askAway: '976052223358406656',
    knowWhatIMeme: '950505761862189096'
}

module.exports = class Activities {
    constructor(client) {
        if(!client) throw new Error('Discord Activities Error: A valid discord client is required to use this package')
        this.client = client
    }
    async getInviteCode(voiceChannelId, app, reqOptions) {
        if(!voiceChannelId) throw new Error('Discord Activities Error: A valid discord voice channel must be provided')
        if(!app) throw new Error('Discord Activities Error: A valid app must be provided')
        if(apps[app] == undefined) throw new Error(`Discord Activities Error: ${app} is not a valid app name`)
        const appId = apps[app]
        let body;
        if(!reqOptions) {
            body = {
                max_uses: 0,
                target_type: 2,
                temporary: false,
                validate: null,
                max_age: 86400,
                target_application_id: appId
            }
        } else {
            body = {
                max_uses: reqOptions.max_uses,
                target_type: reqOptions.target_type,
                temporary: reqOptions.temporary,
                validate: reqOptions.validate,
                max_age: reqOptions.max_age,
                target_application_id: appId
            }
        }
        const data = await fetch(`https://discord.com/api/v10/channels/${voiceChannelId}/invites`, {
            body: JSON.stringify(body),
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bot ${this.client.token}`
            }
        })
        const code = await data.json()
        if(code.code == 50013) {
            console.warn("Discord Activities Warning: You do not have the permission to perform this action")
            return "no code"
        }
        return `https://discord.com/invite/${code.code}`
    }
}