# Task: Integrate rpg-dice-roller Library

## Objective
Integrate the [rpg-dice-roller](https://www.npmjs.com/package/rpg-dice-roller) library into the Joplin Dice Roller plugin to enable dice expression parsing and rolling.

## Steps
- [x] **Install the library**
  - Add rpg-dice-roller as a dependency: `npm install rpg-dice-roller`
- [x] **Import and use in plugin**
  - Import the library in `src/index.ts`.
  - Create a function to parse and roll dice expressions (e.g., `1d20`, `2d6+3`).
- [x] **Connect to Joplin command**
  - Update the plugin's command handler to use the dice roller for evaluating user input.
- [x] **Display results**
  - Insert or append the roll result to the note, or show it in a dialog/notification.
- [x] **Testing**
  - Test with various dice expressions to ensure correct parsing and results.

## Considerations
- Handle invalid expressions gracefully (show error message).
- Ensure the library is only used in a safe, sandboxed way (avoid code injection).
- Optionally, support advanced features like roll breakdowns or macros in the future.

---
*Created: 2025-05-26*
*Completed: 2025-05-27* 