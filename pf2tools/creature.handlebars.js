const handlebars = require('handlebars')

handlebars.registerPartial('inlineTraits', '{{#each traits}}{{#if @first}} ({{/if}}{{{.}}}{{#unless @last}}, {{else}}){{/unless}}{{/each}}')
handlebars.registerPartial('ability', '> **{{name}}**{{{action activity}}}{{>inlineTraits}} {{{cleanDecorator (abilityEntry entries)}}}\n')

handlebars.registerHelper('action', function(value) {
    actionMap = {
        'reaction': { 1: ' [R](moo.md#Actions "Reaction")' },
        'free': { 1: ' [>](moo.md#Actions "Free Action")' },
        'action': {
            0: ' [>](moo.md#Actions "Free Action")',
            1: ' [>](moo.md#Actions "Single Action")',
            2: ' [>>](moo.md#Actions "Two-Action")',
            3: ' [>>>](moo.md#Actions "Three-Action")'
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
    result = {}
    for (const [level, spellList] of Object.entries(spells).reverse()) {
        const levelSuffix = level > 4 ? 'th' : ['', 'st', 'nd', 'rd'][level]
        const levelName = level == 0 ? 'Cantrips' : `${level}${levelSuffix}`
        result[levelName] = spellList
    }
    return result
})

handlebars.registerHelper('numberSuffix', function(number) {
    const suffix = number > 4 ? 'th' : ['', 'st', 'nd', 'rd'][number]
    return `${number}${suffix}`
})

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
            } else if (entry.type == 'item') {
                for (item of entry.entries) {
                    entryResult.push(entryParser(item))
                }
            } else if (entry.type == 'successDegree') {
                for ([key, value] of Object.entries(entry.entries)) {
                    entryResult.push(`>> **${key}** ${value}`)
                }
                entryResult.push('>')
            }
            return entryResult.join('\n')
        }
    }

    result = []
    for (entry of entries) {
        result.push(entryParser(entry))
    }
    return result.join('\n')
})

handlebars.registerHelper('cleanDecorator', function(text) {
    const regex = /{@(\w*) (.*?)}/g
    return text.replace(regex, (substring, ...args) => {
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
})