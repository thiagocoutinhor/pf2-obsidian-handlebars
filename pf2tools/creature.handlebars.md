---
ac: {{defenses.ac.std}}
aliases: [{{name}}]
hp: {{#each defenses.hp}}{{hp}}{{/each}}
modifier: {{perception.std}}
---
> [!statblock-pf2e] {{name}} <span class="creature">Creature {{level}}</span>
> {{#each traits}}[{{#if (eq (traitType .) 'Alignment')}}{{uppercase .}}{{else}}{{capitalize .}}{{/if}}](rules/traits/{{.}}.md "{{traitType .}}") {{/each}}
>
> **Perception** {{plusNumber perception.std}};{{#each senses}} {{cleanDecorator name}}{{#if type}} ({{type}}){{/if}}{{#if range}} {{range}} feet{{/if}}{{#unless @last}},{{/unless}}{{/each}}
> **Languages** {{#each languages.languages}}{{capitalize .}}{{#unless @last}}, {{/unless}}{{/each}}
> **Skills** {{#each skills}}{{capitalize @key}} {{plusNumber std}}{{#unless @last}}, {{/unless}}{{/each}}
> {{#each abilityMods}}**{{capitalize @key}}** {{plusNumber .}}{{#unless @last}}, {{/unless}}{{/each}}
{{#if items}}
> **Items** {{cleanDecorator (join items ', ')}}
{{/if}}
{{#each abilities.top}}
{{>ability}}
{{/each}}
> ---
> **AC** {{defenses.ac.std}}; {{#each defenses.savingThrows}}**{{capitalize @key}}** {{plusNumber std}}{{#unless @last}}, {{/unless}}{{/each}}
> **HP** {{#each defenses.hp}}{{hp}}{{#each abilities}}, {{.}}{{/each}}{{/each}}{{#each defenses.immunities}}{{#if @first}}; **Immunities** {{/if}}{{.}}{{#unless @last}}, {{/unless}}{{/each}}{{#each defenses.weaknesses}}{{#if @first}}; **Weaknesses**{{/if}}{{.}}{{#unless @last}}, {{/unless}}{{/each}}{{#each defenses.resistances }}{{#if @first}}; **Resistances** {{/if}}{{.}}{{#unless @last}}, {{/unless}}{{/each}}
{{#each abilities.mid}}
{{>ability}}
{{/each}}
> ---
> **Speed** {{#each speed}}{{#if (not (eq @key 'walk'))}}{{capitalize @key}} {{/if}}{{.}} feet{{#unless @last}}, {{/unless}}{{/each}}
{{#each attacks}}
> **{{range}}** [>](moo.md#Actions "Single Action") {{name}} {{plusNumber attack}} {{>inlineTraits}} {{#if damage}}**Damage** {{damage}}{{/if}} {{#if effect}}**Effect** {{effect}}{{/if}}
{{/each}}
{{#each spellcasting}}
> **{{capitalize tradition}} {{capitalize type}} Spells** DC {{DC}}{{#each (spellSort entry)}}; **{{@key}}{{#if level}} ({{numberSuffix level}}){{/if}}** {{#each spells}}{{name}}{{#if amount}} ({{amount}}){{/if}}{{#unless @last}}, {{/unless}}{{/each}}{{/each}}
{{/each}}
{{#each abilities.bot}}
{{>ability}}
{{/each}}
> <span class="sourcebook">*{{source}}, page {{page}}*</span>