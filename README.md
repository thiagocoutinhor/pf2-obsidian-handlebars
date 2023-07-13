# pf2-obsidian-handlebars

Handlebars for importing Pathfinder 2 data to obsidian

# How to use

With the JSON/CSV Importer installed in Obsidian, click the magnifying glass icon.

> 🚨 THe `run.js` script is provided for testing purposes only

## Creatures

Fill the following fields:

- `Specify URL to JSON data` Use the URL for the pf2tools json (eg.  https://raw.githubusercontent.com/Pf2eToolsOrg/Pf2eTools/dev/data/bestiary/creatures-b1.json)
- `Choose TEMPLATE file` Use the creature.handlebars.md provided
- `Choose HELPERS file` Use the creatures.handlebars.js provided
- `Field containing the data` creature
- `Field to use as Note name` name
- `How to handle existing Notes` REPLACE
- `Name of Destination Folder in Vault` Here you can choose the desired path