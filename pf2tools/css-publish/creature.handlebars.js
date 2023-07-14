handlebars.registerPartial('ac', '{{defenses.ac.std}}{{#each defenses.ac}}{{#unless (eq @key "std")}} ({{.}} {{@key}}){{/unless}}{{/each}}')
handlebars.registerPartial('hp', '{{#each defenses.hp}}{{hp}}{{#each abilities}}{{#if @first}} ({{/if}}{{cleanDecorator .}}{{#unless @last}}, {{else}}){{/unless}}{{/each}}{{/each}}')
handlebars.registerPartial('immunities', '{{#each defenses.immunities}}{{#if @first}}; **Immunities** {{/if}}{{.}}{{#unless @last}}, {{/unless}}{{/each}}')
handlebars.registerPartial('weaknesses', '{{#each defenses.weaknesses}}{{#if @first}}; **Weaknesses** {{/if}}{{name}} {{amount}}{{#unless @last}}, {{/unless}}{{/each}}')
handlebars.registerPartial('resistances', '{{#each defenses.resistances}}{{#if @first}}; **Resistances** {{/if}}{{name}} {{amount}}{{#if note}} ({{note}}){{/if}}{{#unless @last}}, {{/unless}}{{/each}}')
handlebars.registerPartial('inlineTraits', '{{#each traits}}{{#if @first}} ({{/if}}{{{cleanDecorator .}}}{{#unless @last}}, {{else}}){{/unless}}{{/each}}')
handlebars.registerPartial('ability', '> **{{name}}**{{{action activity}}}{{>inlineTraits}}{{#if trigger}} **Trigger** {{cleanDecorator trigger}} **Effect**{{/if}} {{{cleanDecorator (abilityEntry entries)}}}\n')

function numberSuffix(number) {
    const suffix = number > 3 ? 'th' : ['', 'st', 'nd', 'rd'][number]
    return `${number}${suffix}`
}

handlebars.registerHelper('action', function(value) {
    actionMap = {
        'reaction': { 1: ' [R](moo.md#Actions "Reaction")' },
        'free': { 1: ' [>](moo.md#Actions "Free Action")' },
        'action': {
            0: ' [>](moo.md#Actions "Free Action")',
            1: ' [>](moo.md#Actions "Single Action")',
            2: ' [>>](moo.md#Actions "Two-Action")',
            3: ' [>>>](moo.md#Actions "Three-Action")'
        },
        'varies': {
            1: ' [>](moo.md#Actions "Single Action") to [>>>](moo.md#Actions "Three-Action")'
        }
    }
    if (value) {
        return actionMap[value.unit][value.number]
    }
    return ''
})

handlebars.registerHelper('traitType', function(value) {
    special = {
    common: 'Rarity',
    uncommon: 'Rarity',
    rare: 'Rarity',
    unique: 'Rarity',
    any: 'Alignment',
    ce: 'Alignment',
    cg: 'Alignment',
    cn: 'Alignment',
    c: 'Alignment',
    e: 'Alignment',
    g: 'Alignment',
    le: 'Alignment',
    lg: 'Alignment',
    ln: 'Alignment',
    l: 'Alignment',
    ne: 'Alignment',
    ng: 'Alignment',
    n: 'Alignment',
    gargantuan: 'Sizing',
    huge: 'Sizing',
    large: 'Sizing',
    medium: 'Sizing',
    small: 'Sizing',
    tiny: 'Sizing'
    }
    return special[value] || 'Traits'
})

handlebars.registerHelper('plusNumber', function(value) {
    return (value > 0 ? '+' : '') + value
})

handlebars.registerHelper('spellSort', function(spells) {
    const result = {}
    let constant = null
    for (const [level, spellList] of Object.entries(spells).reverse()) {
        if (level == 'constant') {
            const constantLevel = Object.keys(spellList)[0]
            const constantSpells = Object.values(spellList)[0]
            constant = {
                name: `Constant (${numberSuffix(constantLevel)})`,
                spells: constantSpells
            }
            continue
        }
        const levelName = level == 0 ? 'Cantrips' : `${numberSuffix(level)}`
        result[levelName] = spellList
    }
    if (constant) {
        result[constant.name] = constant.spells
    }
    return result
})

handlebars.registerHelper('numberSuffix', numberSuffix)

handlebars.registerHelper('abilityEntry', function(entries) {
    function entryParser(entry) {
        if (typeof entry == 'string') {
            return entry
        } else {
            const entryResult = []
            if (entry.type == 'list') {
                for (item of entry.items) {
                    entryResult.push(`> - ${entryParser(item)}`)
                }
                entryResult.push('>')
            } else if (entry.type == 'item') {
                for (item of entry.entries) {
                    entryResult.push(entryParser(item))
                }
            } else if (entry.type == 'ability') {
                abilityText = `**${entry.name}** (${entry.traits.join(', ')}) `
                for (item of entry.entries) {
                    entryResult.push(entryParser(item))
                }
                entryResult[0] = abilityText + entryResult[0]
            } else if (entry.type == 'successDegree') {
                for ([key, value] of Object.entries(entry.entries)) {
                    entryResult.push(`>> **${key}** ${value}`)
                }
                entryResult.push('>')
            } else {
                entryResult.push(entry)
            }
            return entryResult.join('\n')
        }
    }

    if (!entries) {
        return ''
    }

    result = []
    for (entry of entries) {
        result.push(entryParser(entry))
    }
    return result.join('\n')
})

handlebars.registerHelper('cleanDecorator', function(text) {
    // @ decorators
    let regex = /{@(\w*) (.*?)}/g
    text = text.replace(regex, (substring, ...args) => {
        const decorator = args[0]
        const content = args[1].split('||').slice(-1)

        if (decorator == 'dc') {
            return `DC ${content}`
        }

        if (decorator == 'bold') {
            return `**${content}**`
        }

        if (['ability', 'condition', 'trait'].includes(decorator)) {
            // TODO here we can place a link
        }

        if (['dice', 'damage'].includes(decorator)) {
            // TODO here we can place a roll
        }

        return content
    })

    // < > decorators
    regex = /<(.*?)>/g
    text = text.replace(regex, (substring, ...args) => {
        return args[0]
    })

    return text
})