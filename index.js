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

const devGames = {
    pn: '763133495793942528',
    youtube: '880218832743055411',
    doodleCrew: '878067427668275241'
}

module.exports = class Activities {
    /**
     * 
     * @param {*} client Your discord client
     */
    constructor(client) {
        if(!client) throw new Error('Discord Activities Error: A valid discord client is required to use this package')
        this.client = client
    }
    /**
     * Create an activity code
     * @param {string} voiceChannelId The id of the voice channel you want the activity to start in
     * @param {string} app The name of the app you want to use
     * @param {object | undefined} reqOptions The request options. (leave empty if you are using default options)
     * @returns {string} invite code
     */
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
        try {
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
            } else if(code.code == 50035) {
                console.warn("Discord Activities Warning: That app does not exist")
                return "no code"
            }
            return `https://discord.com/invite/${code.code}`
        } catch (error) {
            console.warn('There was an error while generating the invite code')
            console.log(error)
            return "no code"
        }
    }
    /**
     * Create an developer activity code
     * @param {string} voiceChannelId The id of the voice channel you want the activity to start in
     * @param {string} app The name of the app you want to use
     * @param {object | undefined} reqOptions The request options. (leave empty if you are using default options)
     * @returns {string} invite code
     */
    async getDevInviteCode(voiceChannelId, app, reqOptions) {
        if(!voiceChannelId) throw new Error('Discord Activities Error: A valid discord voice channel must be provided')
        if(!app) throw new Error('Discord Activities Error: A valid app must be provided')
        if(devGames[app] == undefined) throw new Error(`Discord Activities Error: ${app} is not a valid app name`)
        const appId = devGames[app]
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
        try {
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
            } else if(code.code == 50035) {
                console.warn("Discord Activities Warning: That app does not exist")
                return "no code"
            }
            return `https://discord.com/invite/${code.code}`
        } catch (error) {
            console.warn('There was an error while generating the invite code')
            console.log(error)
            return "no code"
        }
    }
    /**
     * Generate an app invite based on your app id
     * @param {string} voiceChannelId The id of the voice channel you want the activity to start in
     * @param {string} appId The id of the app you want the code to generate
     * @param {object | undefined} reqOptions The request options. (leave empty if you are using default options)
     * @returns {string} the invite code
     */
    async getCodeById(voiceChannelId, appId, reqOptions) {
        if(!voiceChannelId) throw new Error('Discord Activities Error: A valid discord voice channel must be provided')
        if(!appId) throw new Error('Discord Activities Error: A valid app id must be provided')
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
        try {
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
            } else if(code.code == 50035) {
                console.warn("Discord Activities Warning: That app does not exist")
                return "no code"
            }
            return `https://discord.com/invite/${code.code}`
        } catch (error) {
            console.warn('There was an error while generating the invite code')
            console.log(error)
            return "no code"
        }
    }
}