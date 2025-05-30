import joplin from 'api';
import { diceDialogHtml } from './diceDialogHtml';

let dialogHandle: string | null = null;

export async function showDiceDialog(): Promise<string | null> {
  // Create the dialog only once and reuse it
  if (!dialogHandle) {
    dialogHandle = await joplin.views.dialogs.create('diceRollerDialog');
    await joplin.views.dialogs.setFitToContent(dialogHandle, false);
  }
  // Always set the HTML before opening (in case it changes)
  await joplin.views.dialogs.setHtml(dialogHandle, `<form name="main">${diceDialogHtml}</form>`);
  const result = await joplin.views.dialogs.open(dialogHandle);
  const expression = result.formData?.main?.expression;
  if (!expression) return null;
  return expression;
} 