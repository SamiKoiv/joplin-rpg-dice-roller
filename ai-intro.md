# Joplin Dice Roller Plugin

The Joplin Dice Roller Plugin allows users to roll dice directly within their Joplin notes using simple commands or custom markdown syntax. It is designed for tabletop RPG players, game masters, and anyone who needs quick dice rolls while taking notes.

## Key Features
- Roll dice using commands like `/roll 2d6+3` from the command palette.
- Parse and evaluate dice expressions such as `1d20`, `2d6+3`, and more.
- Optionally, use inline markdown like `[[roll:1d8+2]]` to display results within notes.
- Results can be inserted or appended to notes, with optional breakdowns and roll history.

The plugin leverages the [rpg-dice-roller](https://www.npmjs.com/package/rpg-dice-roller) library and is built with TypeScript using the Joplin Plugin API.
