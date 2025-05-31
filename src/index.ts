import joplin from 'api';
import { ContentScriptType } from 'api/types';
import { registerInsertSamplesCommand } from './commands/insertSamplesCommand';
import { registerInsertD20Command } from './commands/insertD20Command';
import { registerInsertD6Command } from './commands/insertD6Command';

joplin.plugins.register({
	onStart: async function() {
		console.log('Dice Roller Plugin started!');
		await registerInsertSamplesCommand();
		await registerInsertD20Command();
		await registerInsertD6Command();
		await joplin.contentScripts.register(
			ContentScriptType.MarkdownItPlugin,
			'dice-markdown-it',
			'./markdownIt.js'
		);
	},
});
