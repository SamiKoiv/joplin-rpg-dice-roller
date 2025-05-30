# Task: Markdown Rendering

## Objective
Render the custom dice token as a clickable HTML button in the markdown viewer.

## Steps
- [x] Register a Markdown-It plugin using `joplin.contentScripts.register(ContentScriptType.MarkdownItPlugin)`.
- [x] Parse the custom dice token (e.g., `[[dice:2d20kh1]]`).
- [x] Render as a styled, clickable HTML button.
- [~] Ensure accessibility and usability. (Tooltip added, button is interactive)

## Considerations
- Support multiple dice tokens per note.
- Ensure rendering is robust against malformed tokens.

---
*Created: 2025-05-27* 