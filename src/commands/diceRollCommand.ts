import joplin from 'api';
import { showDiceDialog } from '../dialog/diceDialog';
import { validateDiceExpression } from '../utils/validateDiceExpression';
import { rollDice } from '../utils/rollDice';
import { insertTextToNote } from '../utils/insertTextToNote';
import { MenuItemLocation } from 'api/types';

export async function registerDiceRollCommand() {
  await joplin.commands.register({
    name: 'diceRoller.roll',
    label: 'Roll Dice',
    execute: async () => {
      try {
        console.log('Opening dice roller dialog...');
        const expression = await showDiceDialog();
        console.log('Expression from dialog:', expression);
        if (!expression || !validateDiceExpression(expression)) {
          await joplin.views.dialogs.showMessageBox('Please enter a valid dice expression (e.g., 2d6+3, d20).');
          return;
        }
        const rollResult = rollDice(expression);
        console.log('Roll result:', rollResult);

        const note = await joplin.workspace.selectedNote();
        if (!note) {
          console.warn('No note is open. Cannot insert result.');
          await joplin.views.dialogs.showMessageBox('Could not insert result: No note is open. Please open a note in Markdown mode and try again.');
          return;
        }

        // Try to insert the result at the cursor. If it fails, show the result in a message box and remind the user to be in Markdown mode.
        const inserted = await insertTextToNote(rollResult);
        if (!inserted) {
          await joplin.views.dialogs.showMessageBox(
            'Could not insert result. Automatic insertion is only supported in the Rich Editor. Please copy and paste the result into your note.' +
            '\n\nResult: ' + rollResult
          );
        } else {
          await joplin.views.dialogs.showMessageBox(`Inserted into note: ${rollResult}`);
        }
      } catch (err) {
        console.error('Unexpected error in diceRoller.roll command:', err);
        await joplin.views.dialogs.showMessageBox('An error occurred: ' + err);
      }
    },
  });
  await joplin.views.menuItems.create('diceRoller.roll.menu', 'diceRoller.roll', MenuItemLocation.Tools);
} 