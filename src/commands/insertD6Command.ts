import joplin from 'api';
import { MenuItemLocation } from 'api/types';

const D6_DICE_TEXT = '[[dice(D6):d6]]';

export async function registerInsertD6Command() {
  const commandName = 'diceRoller.insertD6';
  const commandLabel = 'Insert d6';

  await joplin.commands.register({
    name: commandName,
    label: commandLabel,
    execute: async () => {
      try {
        const currentNote = await joplin.workspace.selectedNote();
        if (!currentNote) {
          await joplin.views.dialogs.showMessageBox('Please open a note first to insert the d6.');
          return;
        }

        await joplin.commands.execute('editor.focus');
        await joplin.commands.execute('replaceSelection', D6_DICE_TEXT);
      } catch (err) {
        console.error(`Error in ${commandName} command:`, err);
        await joplin.views.dialogs.showMessageBox('Could not insert d6. Ensure the Markdown editor is active.\nError: ' + err.message);
      }
    },
  });

  await joplin.views.menuItems.create('diceRoller.insertD6.menu', commandName, MenuItemLocation.Tools);
} 