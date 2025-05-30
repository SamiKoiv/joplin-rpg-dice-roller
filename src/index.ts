import joplin from 'api';
import { registerDiceRollCommand } from './commands/diceRollCommand';

joplin.plugins.register({
	onStart: async function() {
		console.log('Hello world. Test plugin started!');
		await registerDiceRollCommand();
	},
});
