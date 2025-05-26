# Joplin Dice Roller Plugin Development Plan

---

### 1. **Objective**
Create a plugin for Joplin that enables rolling dice directly from notes using commands or custom markdown.

---

### 2. **Feature Scope**

#### MVP Features:
- [ ] Command palette support for `/roll <expression>`
- [ ] Parse expressions like `1d20`, `2d6+3`, etc.
- [ ] Replace or append result in the note

#### Optional Enhancements:
- [ ] Toolbar button to open a roll input
- [ ] Inline markdown parsing: `[[roll:1d8+2]]`
- [ ] Result tooltip breakdowns (e.g., hover to see `3 + 4`)
- [ ] Roll history panel
- [ ] Configurable macros (e.g., /initiative, /save)

---

### 3. **Technical Plan**

#### Tech Stack:
- TypeScript
- Joplin Plugin API
- [rpg-dice-roller](https://www.npmjs.com/package/rpg-dice-roller)

#### Steps:
1. [ ] Scaffold plugin with Yeoman generator
2. [ ] Register command `/roll <expr>`
3. [ ] Pass expression to `rpg-dice-roller` for evaluation
4. [ ] Insert result into current note
5. [ ] (Optional) Hook into markdown-it to process `[[roll:XdY+Z]]`
6. [ ] (Optional) Add toolbar button

---

### 4. **UX Design**
- **Command UI**: Easy `/roll 2d6` style input
- **Inline UI**: Evaluated roll replaces or displays next to markdown on render
- **History**: Optional panel or section to list recent rolls

---

### 5. **Risks and Considerations**
- Markdown plugin rendering can conflict with other custom syntax
- Dice evaluation library should be sandboxed from user input injection
- Using `rpg-dice-roller`'s native syntax eliminates need for custom expression parsing

---

### 6. **Resources**
- Joplin Plugin Guide: https://joplinapp.org/api/plugin_guide/
- Dice Roller Lib: https://www.npmjs.com/package/rpg-dice-roller
- Plugin Examples: https://github.com/laurent22/joplin/tree/dev/packages/app-cli/tests/support/plugins
