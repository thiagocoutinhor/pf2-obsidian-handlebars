const handlebars = require('handlebars')
require('@budibase/handlebars-helpers')();
require('./creature.handlebars.js')

const fs = require('fs')
const creatureHandlebar = fs.readFileSync(`${__dirname}/creature.handlebars.md`, 'utf-8')

const json = require('./creature.handlebars.json')

const template = handlebars.compile(creatureHandlebar)
const parsed = template(json)
console.log(parsed)