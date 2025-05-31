import joplin from 'api';
import { MenuItemLocation } from 'api/types';

const D20_DICE_TEXT = '[[dice(D20):d20]]';

export async function registerInsertD20Command() {
  const commandName = 'diceRoller.insertD20';
  const commandLabel = 'Insert d20';

  await joplin.commands.register({
    name: commandName,
    label: commandLabel,
    execute: async () => {
      try {
        const currentNote = await joplin.workspace.selectedNote();
        if (!currentNote) {
          await joplin.views.dialogs.showMessageBox('Please open a note first to insert the d20.');
          return;
        }

        await joplin.commands.execute('editor.focus');
        await joplin.commands.execute('replaceSelection', D20_DICE_TEXT);
      } catch (err) {
        console.error(`Error in ${commandName} command:`, err);
        await joplin.views.dialogs.showMessageBox('Could not insert d20. Ensure the Markdown editor is active.\nError: ' + err.message);
      }
    },
  });

  await joplin.views.menuItems.create('diceRoller.insertD20.menu', commandName, MenuItemLocation.Tools);
} 