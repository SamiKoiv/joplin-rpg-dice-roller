import joplin from 'api';
import { ContentScriptType } from 'api/types';
import { registerInsertSamplesCommand } from './commands/insertSamplesCommand';

joplin.plugins.register({
	onStart: async function() {
		console.log('Dice Roller Plugin started!');
		await registerInsertSamplesCommand();
		await joplin.contentScripts.register(
			ContentScriptType.MarkdownItPlugin,
			'dice-markdown-it',
			'./markdownIt.js'
		);
	},
});
