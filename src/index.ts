import joplin from 'api';
import { ContentScriptType } from 'api/types';

joplin.plugins.register({
	onStart: async function() {
		console.log('Dice Roller Plugin started!');
		await joplin.contentScripts.register(
			ContentScriptType.MarkdownItPlugin,
			'dice-markdown-it',
			'./markdownIt.js'
		);
	},
});
