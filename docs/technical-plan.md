**Joplin Dice Roller Plugin - Technical Implementation Plan**

---

### **Overview**

Create a Joplin plugin that enables users to insert interactive dice roll buttons into notes. The plugin provides UI integrations for both editing and rendering views. When the button is clicked, it evaluates the dice expression and displays the sum; hovering shows individual dice results as a tooltip.

---

### **Core Features**

| Feature                       | Description                                                           |
| ----------------------------- | --------------------------------------------------------------------- |
| Dice Roll Expression Dialog   | Modal dialog to input or select common dice expressions.              |
| Insert Button into Note       | A custom element or Markdown token representing a dice roll trigger.  |
| Evaluate on Click             | On click, compute dice result and update display.                     |
| Tooltip Hover                 | Show individual dice values on hover after evaluation.                |
| Edit & View Mode Support      | Render interactive button in both Markdown viewer and WYSIWYG editor. |
| Toolbar + Palette Integration | Add command to palette and note toolbar, optionally with shortcut.    |

---

### **Implementation Steps**

#### 1. **Setup Plugin Scaffold**

* Use Joplin plugin generator to create the plugin base.

#### 2. **Dice Expression Dialog**

* Create a dialog using `joplin.views.dialogs.create()`
* HTML includes:

  * Text input for custom expression
  * Preset buttons: `d20`, `2d6`, `adv` (max2d20), `dis` (min2d20), etc.
  * OK/Cancel buttons

#### 3. **Command & Toolbar Button**

* Register a command: `insertDiceRoll`
* Add to command palette and shortcut
* Add toolbar button with icon using `joplin.views.toolbarButtons.create()`

#### 4. **Markdown Rendering**

* Use `joplin.contentScripts.register(ContentScriptType.MarkdownItPlugin)`
* Define custom Markdown syntax (e.g., `[[dice:2d20kh1]]`)
* Render as a clickable HTML button with JavaScript

#### 5. **Evaluate Dice Expression**

* Use `rpg-dice-roller` to parse and evaluate expressions.
* Store results (sum and rolls) in HTML `data-` attributes
* On click: compute and display sum
* On hover: show tooltip with roll breakdown

#### 6. **WYSIWYG Support (Optional)**

* If desired, register a `ContentScriptType.CodeMirrorPlugin` or manipulate HTML directly in WYSIWYG

#### 7. **File Structure**

* `index.ts`: main plugin registration
* `dialog.html/js`: UI for dice expression input
* `markdownItPlugin.js`: custom rendering of dice button
* `diceEngine.ts`: logic for parsing/evaluating dice expressions

---

### **Feasibility**

**Status: Feasible**

Joplin supports all needed interactions via its plugin API:

* Custom dialogs
* Markdown-it rendering extensions
* HTML buttons in notes
* Command registration & toolbar integrations
* Lightweight JS execution in Markdown rendering context

---

### **Enhancement Ideas (Future)**

* Log recent rolls
* Animated dice roll result
* Custom dice styles/themes
* Roll history per note
* Auto-roll on note open (configurable)
