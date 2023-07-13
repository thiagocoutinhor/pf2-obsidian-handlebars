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
{{#if languages}}
> **Languages** {{#each languages.languages}}{{{capitalize .}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}
> **Skills** {{#each skills}}{{capitalize @key}} {{plusNumber std}}{{#unless @last}}, {{/unless}}{{/each}}
> {{#each abilityMods}}**{{capitalize @key}}** {{plusNumber .}}{{#unless @last}}, {{/unless}}{{/each}}
{{#if items}}
> **Items** {{join items ', '}}
{{/if}}
{{#each abilities.top}}
{{>ability}}
{{/each}}
>
> ---
>
> **AC** {{>ac}}; {{#with defenses.savingThrows}}**Fort** {{plusNumber fort.std}}, **Ref** {{plusNumber ref.std}}, **Will** {{plusNumber will.std}}{{#each abilities}}{{#if @first}}; {{else}}, {{/if}}{{.}}{{/each}}{{/with}}
> **HP** {{>hp}}{{>immunities}}{{>weaknesses}}{{>resistances}}
{{#each abilities.mid}}
{{>ability}}
{{/each}}
>
> ---
>
> **Speed** {{#each speed}}{{#if (not (eq @key 'walk'))}}{{capitalize @key}} {{/if}}{{.}} feet{{#unless @last}}, {{/unless}}{{/each}}
{{#each attacks}}
> **{{range}}** [>](moo.md#Actions "Single Action") {{name}} {{plusNumber attack}} {{>inlineTraits}} {{#if damage}}**Damage** {{cleanDecorator damage}}{{/if}} {{#if effect}}**Effect** {{cleanDecorator effect}}{{/if}}
{{/each}}
{{#each spellcasting}}
> **{{#if tradition}}{{capitalize tradition}} {{capitalize type}} Spells{{/if}}{{#if name}}{{name}}{{/if}}** DC {{DC}}{{#if attack}}, attack {{plusNumber attack}}{{/if}}{{#if fp}} ({{fp}} Focus Points){{/if}}{{#each (spellSort entry)}}; **{{@key}}{{#if level}} ({{numberSuffix level}}){{/if}}** {{#each spells}}{{name}}{{#if amount}} ({{amount}}){{/if}}{{#each notes}}{{#if @first}} ({{/if}}{{.}}{{#unless @last}}, {{else}}){{/unless}}{{/each}}{{#unless @last}}, {{/unless}}{{/each}}{{/each}}
{{/each}}
{{#each abilities.bot}}
{{>ability}}
{{/each}}
> <span class="sourcebook">*{{source}}, page {{page}}*</span>