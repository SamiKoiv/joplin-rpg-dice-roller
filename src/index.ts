import joplin from 'api';
import { DiceRoll } from 'rpg-dice-roller';
import { MenuItemLocation } from 'api/types';

function rollDice(expression: string): string {
	try {
		const roll = new DiceRoll(expression);
		return roll.output;
	} catch (error) {
		console.error('Dice roll error:', error);
		return `Invalid expression: ${expression}`;
	}
}

joplin.plugins.register({
	onStart: async function() {
		console.log('Hello world. Test plugin started!');

		// Create the dialog once and reuse it
		const dialog = await joplin.views.dialogs.create('diceRollerDialog');
		await joplin.views.dialogs.setHtml(dialog, `
			<form name="main" style="padding: 20px; min-width: 300px;">
				<p style="margin-bottom: 10px;">Enter dice expression (e.g., 2d6+3):</p>
				<input name="expression" type="text" style="width:100%; margin-bottom: 10px;" autofocus />
				<button type="submit">Roll</button>
			</form>
		`);
		await joplin.views.dialogs.setFitToContent(dialog, false);

		// Register the dice roller command
		await joplin.commands.register({
			name: 'diceRoller.roll',
			label: 'Roll Dice',
			execute: async () => {
				try {
					console.log('Opening dice roller dialog...');
					const result = await joplin.views.dialogs.open(dialog);
					console.log('Dialog closed, result:', result);
					const expression = result.formData?.main?.expression;
					console.log('Expression from dialog:', expression);
					if (!expression) {
						console.log('No expression entered. Exiting command.');
						return;
					}
					const rollResult = rollDice(expression);
					console.log('Roll result:', rollResult);

					// Check if a note is open
					const note = await joplin.workspace.selectedNote();
					if (!note) {
						console.warn('No note is open. Cannot insert result.');
						await joplin.views.dialogs.showMessageBox('Could not insert result: No note is open. Please open a note in Markdown mode and try again.');
						return;
					}

					let inserted = false;
					try {
						console.log('Focusing editor...');
						await joplin.commands.execute('editor.focus');
						console.log('Inserting into note...');
						await joplin.commands.execute('editor.execCommand', {
							name: 'insertText',
							value: rollResult,
						});
						console.log('Inserted into note successfully.');
						inserted = true;
					} catch (err) {
						console.error('Insert failed:', err);
						await joplin.views.dialogs.showMessageBox('Could not insert result. Make sure you are editing a note in Markdown mode.\n\nResult: ' + rollResult);
					}
					if (inserted) {
						await joplin.views.dialogs.showMessageBox(`Inserted into note: ${rollResult}`);
					}
				} catch (err) {
					console.error('Unexpected error in diceRoller.roll command:', err);
					await joplin.views.dialogs.showMessageBox('An error occurred: ' + err);
				}
			},
		});
		// Add the command to the Tools menu
		await joplin.views.menuItems.create('diceRoller.roll.menu', 'diceRoller.roll', MenuItemLocation.Tools);
	},
});
