# Task: Investigate Mobile Compatibility

## Objective
Assess the feasibility and necessary steps to make the Dice Roller plugin compatible with Joplin's mobile applications (Android and iOS).

## Findings
- **General Compatibility:** Joplin for Android and iOS supports plugins, but with a more limited API than the desktop app.
- **API Support:**
    - **Supported:** The core APIs used by this plugin, like `ContentScriptType.MarkdownItPlugin` and `document.addEventListener` within the webview, are generally supported.
    - **Unsupported:** The plugin does not currently use APIs known to be unsupported on mobile (e.g., `joplin.window`, file system access).
- **Potential Issues & Improvements:**
    - **UI/UX:** The current `alert()` used to display dice results is functional but disruptive on mobile. A better approach would be to use a non-blocking notification or display the result directly in the button, as some other plugins do.
    - **Platform Detection:** The plugin can detect if it's running on a mobile client using `joplin.versionInfo().platform === 'mobile'`. This would allow for platform-specific logic.
    - **iOS Restrictions:** iOS requires plugins to be reviewed and may have stricter limitations on API usage. Initial focus should be on Android compatibility.

## Proposed Action Items
- [x] **Replace `alert()`:** Investigate and implement a less intrusive notification method for displaying dice roll results. This could involve creating a temporary, non-blocking overlay or updating the button text itself with the result.
- [ ] **Conditional Logic:** (Optional) Add platform detection to tailor behavior if specific mobile-only or desktop-only features are desired in the future.
- [ ] **Testing:**
    - [ ] Set up a development environment to test the plugin on an Android emulator or device.
    - [ ] Manually install the `.jpl` file on a mobile Joplin client.
    - [ ] Verify that the dice buttons render correctly.
    - [ ] Verify that clicking the buttons produces a result without errors.

---
*Created: 2025-06-14* 