import joplin from 'api';
import { registerDiceRollCommand } from './commands/diceRollCommand';
import { ContentScriptType } from 'api/types';

joplin.plugins.register({
	onStart: async function() {
		console.log('Dice Roller Plugin started!');
		await registerDiceRollCommand();
		await joplin.contentScripts.register(
			ContentScriptType.MarkdownItPlugin,
			'dice-markdown-it',
			'./markdownIt.js'
		);
	},
});
