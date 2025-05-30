import joplin from 'api';

// Utility to wait for a given number of milliseconds
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Attempts to insert text at the cursor in the Markdown editor. Returns true if successful, false otherwise.
// Only works if the Markdown editor is active and focused.
export async function insertTextToNote(text: string): Promise<boolean> {
  try {
    await joplin.commands.execute('editor.focus');
    // Try the standard CodeMirror 6 command
    await joplin.commands.execute('editor.execCommand', {
      name: 'insertText',
      value: text,
    });
    return true;
  } catch (err) {
    console.error('Insert failed (execCommand):', err);
    // Fallback: Try the legacy insertText command (works in some Joplin versions)
    try {
      await joplin.commands.execute('editor.insertText', text);
      return true;
    } catch (fallbackErr) {
      console.error('Fallback insertText also failed:', fallbackErr);
      return false;
    }
  }
} 