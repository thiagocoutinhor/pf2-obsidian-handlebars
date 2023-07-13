global.handlebars = require('handlebars')
require('@budibase/handlebars-helpers')();
require('./creature.handlebars.js')

const fs = require('fs')
const creatureHandlebar = fs.readFileSync(`${__dirname}/creature.handlebars.md`, 'utf-8')

const json = require('./creatures-b2.json').creature

const template = handlebars.compile(creatureHandlebar)

for (creature of json) {
    console.log(creature.name)
    const parsed = template(creature)
    if (creature.name == 'Adult White Dragon') {
        console.log(parsed)
        break
    }
}