import joplin from 'api';
import { MenuItemLocation } from 'api/types';

const DICE_SAMPLES_TEXT = `
# Dice Notation Samples

This provides a variety of dice notation examples that can be used with the Dice Roller plugin.

## 🎲 Basic Dice Notation

| Description         | Notation(s)                       |
|---------------------|-----------------------------------|
| Single die          | [[dice:d6]], [[dice:d20]]     |
| Multiple dice       | [[dice:2d6]], [[dice:3d20]]   |
| Dice with modifiers | [[dice:d6+2]], [[dice:4d8-1]] |

## 🏷️ Custom Labels (Optional)

| Description         | Notation(s)                         |
|---------------------|-------------------------------------|
| Simple label        | [[dice(My D20 Roll):d20]]         |
| Label with spaces   | [[dice(Attack with Longsword):1d20+7]] |
| Label for basic sum | [[dice(HP Recovery):2d8+2]]       |

## ⚔️ Common RPG Scenarios

| Description                                                         | Notation(s)                                       |
|---------------------------------------------------------------------|---------------------------------------------------|
| Advantage Roll (D&D 5e)                                             | [[dice(Advantage):2d20kh1]]                     |
| Disadvantage Roll (D&D 5e)                                          | [[dice(Disadvantage):2d20kl1]]                   |
| Ability Score Generation (e.g., D&D - roll 4d6, keep highest 3)       | [[dice(Ability Score):4d6kh3]]                  |
| Attack Roll (e.g., d20 + attack bonus)                                | [[dice(Attack):d20+5]]                         |
| Damage Roll (e.g., weapon dice + ability modifier)                    | [[dice(Damage):1d8+3]]                         |
| Critical Hit Damage (e.g., double dice)                               | [[dice(Crit Damage):2d8*2+3]] or [[dice(Alt Crit Dmg):4d8+3]] |
| Initiative Roll                                                     | [[dice(Initiative):1d20+2]]                     |
| Fate/Fudge Dice Roll (e.g., FATE Core, Fudge RPG)                     | [[dice(Fate Roll):4dF]]                         |
| World of Darkness Style (Successes on 8+ on d10s)                     | [[dice(WoD Successes):5d10>=8]]                 |
| Exploding Dice for Damage (e.g., Savage Worlds)                       | [[dice(Savage Dmg):1d6!+1d8!]]                  |

## 🧮 Advanced Dice Expressions & Arithmetic

| Description                                                      | Notation(s)           |
|------------------------------------------------------------------|-----------------------|
| Multipliers                                                      | [[dice:2*3d6]]      |
| Grouping with parentheses                                        | [[dice:(1d6+2)d4]]  |
| Multiple expressions (Note: each needs its own [[dice:]] token)  |                       |
| Example 1                                                        | [[dice:2d6+3]]      |
| Example 2                                                        | [[dice:1d4-1]]      |
| Addition/Subtraction                                             | [[dice:d6+2]], [[dice:2d6-3]] |
| Multiplication/Division                                          | [[dice:2d6*3]], [[dice:4d8/2]] |
| Exponents (Note: check library support for ^)                    | [[dice:2d6^3]]      |
| Order of operations (with parentheses)                           | [[dice:(2+3)*d4]]   |

## 📊 Comparisons and Filtering (General)

| Description                 | Notation(s)                         |
|-----------------------------|-------------------------------------|
| Keep highest (general)      | [[dice(Keep 2 Highest):3d10kh2]]  |
| Keep lowest (general)       | [[dice(Keep 2 Lowest):3d10kl2]]   |
| Drop highest (general)      | [[dice(Drop Highest):4d6dh1]]     |
| Drop lowest (general)       | [[dice(Drop Lowest):4d6dl1]]      |
| Target comparisons (success if >= N) | [[dice:4d6>=3]], [[dice:3d20<=10]] |

## 💥 Exploding Dice (General)

| Description                                                       | Notation(s)                                       |
|-------------------------------------------------------------------|---------------------------------------------------|
| Basic explode (on max)                                            | [[dice(Exploding):4d6!]] or [[dice:4d6e]]       |
| Compound explode (add to same die)                                | [[dice(Compounding):4d6!!]] or [[dice:4d6ce]]   |
| Penetrating explode (subtract 1 from subsequent rolls)            | [[dice(Penetrating):4d6!p]] or [[dice:4d6pe]] |

## ✅ Success and Failure Counting (General)

| Description                      | Notation(s)                             |
|----------------------------------|-----------------------------------------|
| Counting successes (e.g., >=5)   | [[dice(Successes >=5):4d6>=5]]       |
| Counting failures (e.g., <3)     | [[dice(Failures <3):4d6<3]]          |
| Custom success threshold         | [[dice(Crit Success >4):4d6cs>4]]     |
| Custom failure threshold         | [[dice(Crit Fail <2):4d6cf<2]]       |

## ✨ Fudge/Fate Dice

| Description                 | Notation(s)         |
|-----------------------------|---------------------|
| Basic fudge dice            | [[dice:4dF]]      |
| Fudge dice with modifiers   | [[dice:4dF+2]]   |

## 🎲 Dice Pools (General - Usually combined with success counting)

| Description                 | Notation(s)                         |
|-----------------------------|-------------------------------------|
| Standard pool               | [[dice:5d6]]                      |
| Pool with success counting  | [[dice(Pool Successes >=4):5d6>=4]] |

## 🔄 Re-rolls (General)

| Description                                         | Notation(s)                         |
|-----------------------------------------------------|-------------------------------------|
| Simple re-rolls (e.g., re-roll 1s once)             | [[dice:4d6r1]]                    |
| Re-roll once (alternative)                          | [[dice:4d6ro1]]                   |
| Re-roll with comparison (e.g., re-roll <3 once)     | [[dice:4d6r<3]], [[dice:4d6ro>5]] |

## 🔢 Sorting Results (Output may vary)

| Description        | Notation(s)                                 |
|--------------------|---------------------------------------------|
| Sort ascending     | [[dice(Sorted Asc):4d6sa]] or [[dice:4d6s]] |
| Sort descending    | [[dice(Sorted Desc):4d6sd]]              |

## 📐 Rounding (Output may vary)

| Description | Notation(s)            |
|-------------|------------------------|
| Floor       | [[dice:d10/3floor]] |
| Ceiling     | [[dice:d10/3ceil]]  |
| Round       | [[dice:d10/3round]] |

## ⭐ Special Modifiers (General)

| Description                                                   | Notation(s)                                     |
|---------------------------------------------------------------|-------------------------------------------------|
| Minimum roll value (per die)                                  | [[dice:4d6min2]]                              |
| Maximum roll value (per die)                                  | [[dice:4d6max5]]                              |
| Unique rolls (no duplicates, for custom dice)                 | [[dice(Unique Rolls):4d6u]] (Note: check library details for custom dice scenarios) |

## ➕ Grouped Rolls & Combined Expressions

| Description                                                      | Notation(s)               |
|------------------------------------------------------------------|---------------------------|
| Roll multiple groups and sum                                     | [[dice:(4d6+2)+(2d8-1)]] |
| (Note: For separate button outputs, use separate [[dice:]] tokens) |                           |

---
Remember: The text inside \`[[dice(Optional Label):EXPRESSION]]\` is what the button will display if a label is provided. The \`EXPRESSION\` part is sent to the dice rolling engine.
`;

export async function registerInsertSamplesCommand() {
  const commandName = 'diceRoller.insertSamples';
  const commandLabel = 'Insert Dice Notation Samples';

  await joplin.commands.register({
    name: commandName,
    label: commandLabel,
    execute: async () => {
      try {
        // Ensure an editor is active
        const currentNote = await joplin.workspace.selectedNote();
        if (!currentNote) {
          await joplin.views.dialogs.showMessageBox('Please open a note first to insert samples.');
          return;
        }

        // Attempt to insert the text using replaceSelection
        try {
          console.log('Focusing editor...');
          await joplin.commands.execute('editor.focus');
          console.log('Editor focused. Attempting insert via replaceSelection...');
          await joplin.commands.execute('replaceSelection', DICE_SAMPLES_TEXT);
          console.log('Insert via replaceSelection succeeded.');
        } catch (err) {
          console.error('Insert via replaceSelection failed:', err);
          // If replaceSelection fails, we re-throw to the outer catch for a general error message.
          throw err; 
        }
      } catch (err) {
        console.error(`Error in ${commandName} command:`, err);
        await joplin.views.dialogs.showMessageBox('Could not insert dice samples. Ensure the Markdown editor is active.\nError: ' + err.message);
      }
    },
  });

  await joplin.views.menuItems.create('diceRoller.insertSamples.menu', commandName, MenuItemLocation.Tools);
} 