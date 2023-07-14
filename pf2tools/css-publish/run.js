global.handlebars = require('handlebars')
require('@budibase/handlebars-helpers')();
require('./creature.handlebars.js')
const axios = require('axios').default

async function getBestiary(number) {
    try {
        url = `https://raw.githubusercontent.com/Pf2eToolsOrg/Pf2eTools/dev/data/bestiary/creatures-b${number}.json`
        const response = await axios.get(url)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

const fs = require('fs')
const creatureHandlebar = fs.readFileSync(`${__dirname}/creature.handlebars.md`, 'utf-8')

getBestiary(3).then(json => {
    const template = handlebars.compile(creatureHandlebar)

    for (creature of json.creature) {
        console.log(creature.name)
        const parsed = template(creature)
        if (creature.name.toLocaleLowerCase() == 'HATRED SIKTEMPORA'.toLocaleLowerCase()) {
            console.log(parsed)
            break
        }
    }
})
