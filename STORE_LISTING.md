# Chrome Web Store Listing Information

This document contains all the information needed to submit X Keyboard Navigator to the Chrome Web Store.

## Basic Information

**Extension Name:** X Keyboard Navigator

**Short Description (132 characters max):**
Navigate X (Twitter) with keyboard shortcuts. Gmail-style navigation, vim shortcuts, and a command palette for power users.

**Category:** Productivity

**Language:** English

## Detailed Description

Navigate X (formerly Twitter) with lightning-fast keyboard shortcuts. Inspired by Gmail's keyboard navigation, this extension brings powerful vim-style shortcuts to your X experience.

### Key Features:

**Command Palette**
Press Ctrl+Shift+P (Windows/Linux) or Cmd+Shift+P (Mac) to open the command palette and discover all available commands with fuzzy search.

**Navigation Shortcuts**
Navigate anywhere on X with two-key combinations starting with 'g':
• g + h: Home timeline
• g + e: Explore
• g + n: Notifications
• g + m: Messages
• g + k: Grok AI
• g + p: Your Profile
• g + l: Lists
• g + b: Bookmarks
• g + c: Communities

**Tweet Interaction Shortcuts**
Browse and interact with tweets without touching your mouse:
• j: Focus next tweet
• k: Focus previous tweet
• r: Reply to focused tweet
• t: Retweet focused tweet
• l: Like focused tweet
• b: Bookmark focused tweet
• o: Open focused tweet in detail view
• Esc: Remove focus from current tweet

### Privacy First
• Does NOT collect any data
• Does NOT track your activity
• Only runs on X.com and Twitter.com
• All settings stored locally in your browser
• Never sends data to external servers

### Perfect For:
✓ Power users who prefer keyboard navigation
✓ Accessibility-conscious users
✓ Anyone who wants to browse X more efficiently
✓ Users familiar with vim or Gmail keyboard shortcuts

Start browsing X at the speed of thought!

## Screenshots Required

You'll need to create 1-5 screenshots showing:

### Screenshot Ideas:
1. **Hero Shot**: Command palette open on X timeline showing all commands
2. **Navigation in Action**: Focused tweet with visual outline showing j/k navigation
3. **Before/After**: Side-by-side showing traditional mouse navigation vs keyboard shortcuts
4. **Command Reference**: The command palette with search showing "nav" commands
5. **Tweet Interactions**: Visual showing r/t/l/b shortcuts for tweet actions

**Screenshot Specs:**
- Size: 1280x800 or 640x400 pixels
- Format: PNG or JPEG
- Max file size: 5MB each
- Show real usage on x.com

## Promotional Images (Optional but Recommended)

### Small Promo Tile
- Size: 440x280 pixels
- Shows: Extension icon + "X Keyboard Navigator" text + key feature

### Marquee Promo Tile (Featured placement)
- Size: 1400x560 pixels
- Shows: Hero image with command palette, keyboard shortcuts overlay

## Privacy Policy

**Privacy Policy URL:** You can either:
1. Host PRIVACY.md as a GitHub Pages site
2. Include the text inline in the submission form
3. Create a simple single-page website

Content: Use the PRIVACY.md file in this repository

## Support & Website Links

**Homepage URL:**
- https://github.com/[yourusername]/x-keyboard-navigator
- Or create a dedicated landing page

**Support URL:**
- https://github.com/[yourusername]/x-keyboard-navigator/issues

## Permissions Justification

When asked why each permission is needed, use these explanations:

**Host Permissions (twitter.com, x.com):**
Required to inject keyboard shortcuts functionality into X/Twitter pages. The extension only runs on these domains.

**Storage:**
Used to save user preferences and settings locally in the browser. No data is sent to external servers.

**Tabs:**
Required to navigate between different pages on X/Twitter when keyboard shortcuts are triggered (e.g., g+h to go to Home).

**Active Tab:**
Used to check if the current tab is X/Twitter before activating keyboard shortcuts.

**Side Panel:**
Provides an optional side panel interface for viewing shortcuts reference and settings.

## Distribution

**Visibility:** Public

**Regions:** All regions

**Pricing:** Free

## Version Information

**Version:** 1.0.0

**What's New in This Version:**
Initial release with full keyboard navigation support for X (Twitter).

## Submission Checklist

Before submitting:
- [ ] Build production version: `pnpm build`
- [ ] Create zip: `pnpm pack:zip`
- [ ] Upload `extension.zip` (currently 80KB)
- [ ] Prepare 1-5 screenshots (1280x800 or 640x400)
- [ ] Create promotional images (optional)
- [ ] Set up privacy policy URL
- [ ] Test extension in Chrome:
  - [ ] Load unpacked extension
  - [ ] Visit x.com
  - [ ] Test all keyboard shortcuts
  - [ ] Test command palette (Ctrl+Shift+P)
  - [ ] Check console for errors
  - [ ] Test on both x.com and twitter.com
- [ ] Create Chrome Web Store developer account ($5 one-time fee)
- [ ] Fill out store listing form with info from this document
- [ ] Submit for review (typically 1-3 business days)

## Post-Submission

After approval:
- Update README.md with Chrome Web Store link
- Create a GitHub release (v1.0.0)
- Share on social media
- Monitor reviews and user feedback
- Track issues on GitHub

## Future Updates

To update the extension:
1. Increment version in package.json
2. Build: `pnpm build`
3. Package: `pnpm pack:zip`
4. Upload new version to Chrome Web Store
5. Fill out "What's new" section
6. Submit for review

## Notes

- First-time reviews take 1-5 business days
- Updates typically review faster (1-2 days)
- Chrome Web Store requires Manifest V3 (✓ we're using it)
- Keep the extension focused on keyboard navigation
- Respond to user reviews professionally
- Monitor for any policy violations

## Asset Creation Tips

### For Screenshots:
1. Use a clean X/Twitter account (no sensitive content)
2. Show the extension in action with clear visual indicators
3. Add text overlays explaining what's happening
4. Use high contrast and clear fonts
5. Avoid dark mode screenshots (they don't show well in the store)

### For Promo Images:
1. Use your brand colors
2. Keep text minimal and readable
3. Show the keyboard shortcuts prominently
4. Use the extension icon
5. Include a clear value proposition

## Contact & Support

For submission questions:
- Chrome Web Store Developer Support: https://support.google.com/chrome_webstore
- Developer Program Policies: https://developer.chrome.com/docs/webstore/program-policies/

Good luck with your submission! 🚀
