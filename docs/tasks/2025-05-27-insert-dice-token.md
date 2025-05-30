# Task: Insert Dice Button/Token into Note

## Objective
Insert a custom markdown token or HTML element representing a dice roll trigger into the note.

## Steps
- [ ] Insert a custom markdown token (e.g., `[[dice:2d20kh1]]`) or HTML element at the cursor position.
- [ ] Ensure the token is easy to parse and render later.
- [ ] Validate the inserted expression.

## Considerations
- Make the token format extensible for future features.
- Ensure compatibility with both markdown and WYSIWYG editors.

---
*Created: 2025-05-27*

---

## Issue: Insertion Fails in Markdown Editor (CodeMirror 6)

### Symptoms
- Dice result insertion works in the Rich Text (WYSIWYG) editor.
- Insertion fails in the Markdown editor (CodeMirror 6), even when the note is focused and in edit mode.
- Error in console:
  - `TypeError: Cannot read properties of undefined (reading 'length')` (deep in CodeMirror state logic)
  - Fallback to `editor.insertText` also fails with "Command not found".

### What Was Tried
- Ensured the note is open and focused in Markdown mode.
- Added delays after focusing the editor.
- Tried both `editor.execCommand` and `editor.insertText`.
- Tested direct command execution in the Joplin developer console.
- Confirmed that insertion works in Rich Text but not in Markdown editor.

### Online Findings
- Other plugin developers have reported similar issues on the Joplin forum.
- Problems with text insertion in the Markdown editor are not uncommon, especially since the switch to CodeMirror 6.
- No universal fix is available; some suggest using the data API to update the note body directly, but this is a last resort.
- The issue appears to be a bug or limitation in Joplin's CodeMirror 6 integration.

### Current Workaround
- If insertion fails, the plugin shows the dice result in a message box and instructs the user to copy and paste it manually.
- Automatic insertion is only supported in the Rich Text editor for now.

### Next Steps
- Consider reporting this issue to the Joplin developers with detailed findings and error logs. 